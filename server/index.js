require('dotenv').config();
const express = require('express');
const app = express();
http = require('http');
const cors = require('cors');
const { Server } = require('socket.io')
const harperSaveMessage = require('./services/harper-save-message');
const harperGetMessages = require('./services/harper-get-messages'); 



let allUsers = [];
let readyCounter = 0;
app.use(cors()); // Add cors middleware
const server = http.createServer(app); 

const io = new Server(server, { 
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {

    console.log("user with the userId: ", socket.id, " connected");
    socket.on('join_room', (data) => {
      const { user, room } = data; // Data sent from client when join_room event emitted
      socket.join(room); // Join the user to a socket room
      allUsers.push({ id: socket.id, user, room });
      chatRoom = room;
      chatRoomUsers = allUsers.filter((user) => user.room === room);
      io.to(room).emit('chatroom_users', chatRoomUsers);
      socket.emit('chatroom_users', chatRoomUsers);
    });

    socket.on('ready', (data) => {
      console.log(data);
      readyCounter += 1;
      console.log("readyCounter: ", readyCounter);
      io.to(data.room).emit('ready_users', readyCounter);
    });

 
  });
server.listen(4000, () => 'Server is running on port 3000'); 