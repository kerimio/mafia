import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/Welcome/WelcomeScreen';
import Room from './components/Room/Room';


import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

const App= () => {

  const [user, setUser] = useState('');
  const [room, setRoom] = useState(''); 

  return (
    <Router>
      <Routes>
      <Route
            path='/'
            element={
              <WelcomeScreen
              user={user}
              setUser={setUser}
              room={room}
              setRoom={setRoom}
              socket={socket}
              />
            }
          />
     {<Route path='/Room' element={<Room user={user} room={room} socket={socket} />}></Route>}   

      </Routes>
    </Router>
  );
}

export default App;