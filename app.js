//App.js
const express = require('express');
const app = express();
const server = require('http').Server(app);

//Socket.io
const io = require('socket.io')(server);
  //We'll store our online users here
  let onlineUsers = {};
  //Save the channels in this object.
  let channels = {"General" : []};

  io.on("connection", (socket) => {
  // This file will be read on new socket connections
  // Make sure to send the users and the channels to our chat file
  require('./sockets/chat.js')(io, socket, onlineUsers, channels);
});

//Express View Engine for Handlebars
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.render('index.handlebars');
})

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
})