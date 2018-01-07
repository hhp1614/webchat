const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')
const fs = require('fs')
const port = 8081

/**
 * 监听端口
 */
server.listen(port)
console.log('server started on ' + port)

var json = fs.readFileSync('./user.json', 'utf8')
if (json) json = [...JSON.parse(json)]
else json = []
console.log(json)

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
app.post('/register', function(req, res) {
    // console.log(req.body.user, req.body.passwd)
    if (hasUser(req.body.user)) {
        let obj = {
            status: false,
            msg: '该用户名已注册'
        }
        res.send(obj)
    } else {
        let newUser = {
            user: req.body.user,
            passwd: req.body.passwd
        }
        let obj = {
            status: true,
            msg: '注册成功',
            data: newUser.user
        }
        json.push(newUser)
        fs.writeFile('./user.json', JSON.stringify(json), function(err) {
            if (err) throw err
            console.log('文件写入成功')
            res.send(obj)
        })
    }
})

/**
 * 登陆接口
 */
app.post('/login', function(req, res) {
    // console.log(req.body.user, req.body.passwd);
    if (login(req.body.user, req.body.passwd)) {
        let obj = {
            status: true,
            data: req.body.user,
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
    res.end()
})

/**
 * 校验用户名是否已存在
 */
function hasUser(user) {
    let hasUser = false
    json.forEach(item => {
        if (item.user === user) {
            hasUser = true
        }
    })
    return hasUser
}

/**
 * 校验登陆
 */
function login(user, passwd) {
    let logined = false
    json.forEach(item => {
        if (item.user === user && item.passwd === passwd) {
            logined = true
        }
    })
    return logined
}

/**
 * socket
 */
io.on('connection', (socket) => {
    socket.user = ''
    socket.on('enter', (data) => {
        console.log(data)
        socket.user = data.user
        io.emit('enter', data.user + ' was come in!')
    })
    socket.on('message', (data) => {
        console.log(data)
        io.emit('message', data)
    })
    socket.on('disconnect', () => {
        console.log(socket.user)
        io.emit('leave', socket.user + ' was left')
    })
})