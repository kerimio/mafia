require('dotenv').config();
const express = require('express');
const app = express();
http = require('http');
const cors = require('cors');
const { Server } = require('socket.io')
const harperSaveMessage = require('./services/harper-save-message');
const harperGetMessages = require('./services/harper-get-messages'); 



let allUsers = [];
let readyCounter = {};
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
      readyCounter[room] = readyCounter[room] || 0;
      io.to(room).emit('ready_users', readyCounter[room]) // initialize readyCounter[room] as 0
    });
  
    socket.on('ready', (data) => {
      const { room } = data;
      console.log(data);
      if (!socket.ready) {
        readyCounter[room] += 1;
        socket.ready = true;
        console.log("readyCounter: ", readyCounter[room]);
        io.to(data.room).emit('ready_users', readyCounter[room]);
      }
    });
  
    socket.on('disconnect', (data) => {
      console.log("this is the data: ", data);
      console.log(data.user, "has disconnected")
      // Subtract one from the readyCounter
      socket.ready = false;
      readyCounter[data.room] = readyCounter[data.room] - 1;
      if (readyCounter[data.room] < 0) {
        readyCounter[data.room] = 0;
      }
      console.log("readyCounter: ", readyCounter[data.room]);
      // Emit the updated readyCounter to all clients in the same room
      io.to(data.room).emit('ready_users', readyCounter[data.room]);
    });
  });
server.listen(4000, () => 'Server is running on port 3000'); 
