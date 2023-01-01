import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/Welcome/WelcomeScreen';
import Room from './components/Room';


import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

const App= () => {

  const [username, setUsername] = useState('');
  const [room, setRoom] = useState(''); 


  return (
    <Router>
      <Routes>
      <Route
            path='/'
            element={
              <WelcomeScreen
              username = {username}
              setUsername = {setUsername}
              room = {room}
              setRoom = {setRoom}
              />
            }
          />
     {<Route path='Room' element={<Room/>}></Route>}   

      </Routes>
    </Router>
  );
}

export default App;