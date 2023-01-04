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

  const readyCounters = new Map();

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
      if (!readyCounters.has(room)) {
        readyCounters.set(room, 0);
      }
      io.to(room).emit('ready_users', readyCounters.get(room)); // initialize readyCounter[room] as 0
    });
  
    socket.on('ready', (data) => {
      const { room } = data;
      console.log(data);
      if (!socket.ready) {
        readyCounters.set(room, readyCounters.get(room) + 1);;
        socket.ready = true;
        console.log("readyCounter: ", readyCounters.get(room));
        io.to(data.room).emit('ready_users', readyCounters.get(room));
      }
    });
  
    socket.on('disconnect', (data) => {
      console.log("this is the data: ", data);
      console.log(data.user, "has disconnected")
      // Subtract one from the readyCounter
      socket.ready = false;

      const disconnectedUser = allUsers.find((user) => user.id === socket.id);
       // Decrement the ready counter for the room if the user was in a room
  if (disconnectedUser && readyCounters.has(disconnectedUser.room)) {
    readyCounters.set(disconnectedUser.room, readyCounters.get(disconnectedUser.room) - 1);
      console.log("readyCounter: ", readyCounters.get(disconnectedUser.room))
    // Emit the updated ready counter for the room to all clients in the room
    io.to(disconnectedUser.room).emit('ready_users', readyCounters.get(disconnectedUser.room));
  }
    });
  });
server.listen(4000, () => 'Server is running on port 3000'); 
