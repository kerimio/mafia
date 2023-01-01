require('dotenv').config();
const express = require('express');
const app = express();
http = require('http');
const cors = require('cors');
const { Server } = require('socket.io')
const harperSaveMessage = require('./services/harper-save-message');
const harperGetMessages = require('./services/harper-get-messages'); 




app.use(cors()); // Add cors middleware
const server = http.createServer(app); 

const io = new Server(server, { 
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });


server.listen(4000, () => 'Server is running on port 3000'); 