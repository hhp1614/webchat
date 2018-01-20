const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')
const fs = require('fs')
const mysql = require('mysql')
const port = 8081

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'webchat'
})

// db.query('INSERT INTO user_table (username, password) VALUES ("superAdmin", "1614");')
// db.query('INSERT INTO user_table VALUES (0, "Flandre", "1614");')

// db.query('SELECT * FROM user_table WHERE username="admin";')


/**
 * 监听端口
 */
server.listen(port)
console.log('server started on ' + port)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * 配置 header，允许跨域
 */
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    if (req.method == 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
})

/**
 * 注册接口
 */
app.post('/register', function (req, res) {
    let username = req.body.user
    let password = req.body.passwd
    let userInfo = {}
    db.query('SELECT * FROM user_table WHERE username="' + req.body.user + '";', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            userInfo = data[0]
            if (userInfo) {
                let obj = {
                    status: false,
                    msg: '该用户名已注册'
                }
                res.send(obj)
            } else {
                db.query('INSERT INTO user_table VALUES (0, "' + username + '", "' + password + '");', (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let obj = {
                            status: true,
                            msg: '注册成功',
                            data: username
                        }
                        res.send(obj)
                    }
                })
            }
        }
    })
})

/**
 * 登陆接口
 */
app.post('/login', function (req, res) {
    let username = req.body.user
    let password = req.body.passwd
    let userInfo = {}
    db.query('SELECT * FROM user_table WHERE username="' + req.body.user + '";', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            userInfo = data[0]
            if (userInfo && userInfo.password === password) {
                let obj = {
                    status: true,
                    data: username,
                    msg: '登陆成功'
                }
                res.send(obj)
            } else {
                let obj = {
                    status: false,
                    msg: '用户名或密码错误'
                }
                res.send(obj)
            }
        }
    })
})

/**
 * socket
 */
io.on('connection', (socket) => {
    socket.user = ''
    socket.on('enter', (data) => {
        console.log(data)
        socket.user = data.user
        io.emit('enter', data.user + ' 进入房间')
    })
    socket.on('message', (data) => {
        console.log(data)
        io.emit('message', data)
    })
    socket.on('disconnect', () => {
        console.log(socket.user)
        if (socket.user) {
            io.emit('leave', socket.user + ' 离开房间')
        }
    })
})