import './App.css';
import { useState } from 'react';
import Home from './pages/home';
import Chat from './pages/chat';
import RoleRoom from './pages/roleRoom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

function App() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(newRole);
  const [room, setRoom] = useState('');


  function newRole() { 
    const role = "mafia";
    const selectedRole = role[Math.floor(Math.random() * role.length)];
    return role;
  }

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                username={username}
                setUsername={setUsername}
                room={room}
                role={role}
                setRole={setRole}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          {/* Add this */}
          <Route
            path='/chat'
            element={<Chat username={username} room={room} socket={socket} />}
          />
          <Route
            path='/roleRoom'
            element={<RoleRoom username={username} room={room} socket={socket}/>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;