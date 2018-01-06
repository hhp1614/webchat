const express = require('express')
const app = express()
const port = 8081
app.use('/', function(req, res) {
    res.send('hello world')
})
app.listen(port)
console.log('server started on ' + port)