const express = require('express')
const app = express()
const PORT = 3000
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

io.on('connection', function (socket) {
  socket.on('nextSlide', pict => {
    io.emit('changeSlide', pict)
  })

  socket.on('prevSlide', pict => {
    io.emit('changeSlide', pict)
  })
})

server.listen(PORT, () => {
  console.log('listening to ', PORT)
})