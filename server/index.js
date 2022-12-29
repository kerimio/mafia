require('dotenv').config();
const express = require('express');
const app = express();
http = require('http');
const cors = require('cors');
const { Server } = require('socket.io')
const harperSaveMessage = require('./services/harper-save-message');
const harperGetMessages = require('./services/harper-get-messages'); 
const leaveRoom = require('./utills/leave-room'); // Add this

app.use(cors()); // Add cors middleware
const server = http.createServer(app); 

const io = new Server(server, { 
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  const CHAT_BOT = 'ChatBot'; 
  // Add this
  let chatRoom = ''; // E.g. javascript, node,...
  let allUsers = []; // All users in current chat room 
  let allRoles = []; // All roles in current chat room
  

  // Listen for when the client connects via socket.io-client
  io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
  
    // Add a user to a room
    socket.on('join_room', (data) => {

      
      let { username, room, role } = data; // Data sent from client when join_room event emitted
      console.log("data:, ", data);
      console.log("role: ", role);
      if (allRoles.length==0) {
        allRoles.push(role);
      }
      else if (allRoles.includes("mafia")){
        role = "mafia";
        allRoles.push(role);
      }
      socket.join(room); // Join the user to a socket room
      

      console.log(data);
      // Add this
      let __createdtime__ = Date.now(); // Current timestamp
      // Send message to all users currently in the room, apart from the user that just joined
      socket.to(room).emit('receive_message', {
        message: `${username} has joined the chat room`,
        username: CHAT_BOT,
        __createdtime__,
      });

      socket.to(room).emit('receive_message', {
        message: `Herzlich Willkommen im Raum ${room}`,
        username: CHAT_BOT,
        __createdtime__,
      });

      chatRoom = room;
      allUsers.push({ id: socket.id, username, role, room });
      chatRoomUsers = allUsers.filter((user) => user.room === room);
      socket.to(room).emit('chatroom_users', chatRoomUsers);
      socket.emit('chatroom_users', chatRoomUsers);
        });

        socket.on('send_message', (data) => {
            const { message, username, room, __createdtime__ } = data;
            io.in(room).emit('receive_message', data); // Send to all users in room, including sender
            harperSaveMessage(message, username, room, __createdtime__) // Save message in db
              .then((response) => console.log(response))
              .catch((err) => console.log(err));
          });


 
      
      socket.on('leave_room', (data) => {
        const { username, room } = data;
        socket.leave(room);
        const __createdtime__ = Date.now();
        // Remove user from memory
        allUsers = leaveRoom(socket.id, allUsers);
        socket.to(room).emit('chatroom_users', allUsers);
        socket.to(room).emit('receive_message', {
          username: CHAT_BOT,
          message: `${username} has left the chat`,
          __createdtime__,
        });
        console.log(`${username} has left the chat`);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected from the chat');
        const user = allUsers.find((user) => user.id == socket.id);
        if (user?.username) {
          allUsers = leaveRoom(socket.id, allUsers);
          socket.to(chatRoom).emit('chatroom_users', allUsers);
          socket.to(chatRoom).emit('receive_message', {
            message: `${user.username} has disconnected from the chat.`,
          });
        }
        console.log("all users in room:", allUsers)
      });

      harperGetMessages()
      .then((last100Messages) => {
        // console.log('latest messages', last100Messages);
        socket.emit('last_100_messages', last100Messages);
      })
      .catch((err) => console.log(err));   
  });


server.listen(4000, () => 'Server is running on port 3000');