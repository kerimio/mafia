import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';



const WelcomeScreen = ({user, setUser, room, setRoom, socket})  =>{
  const navigate = useNavigate();

const joinRoom  = () => {
  if (room !== '' && user !== '') {
  console.log("joining the room");
  socket.emit('join_room', {user, room});
  navigate('/Room', {replace: true});
  }
}


  return (
    <div>
      <h1>Welcome to Mafia Game</h1>
     <label>
  Enter your user:
  <input
    placeholder="user..."
    onChange={(e) => setUser(e.target.value)}
  />
</label>
<br />
<label>
  Select a room:
  <select onChange={(e) => setRoom(e.target.value)}>
    <option value="traubeMinze">Traube Minze</option>
    <option value="okkolom">Okkolom</option>
    <option value="milano">Milano</option>
    <option value="hannover">Hannover</option>  
  </select>
</label>
      <br />
      <button onClick={joinRoom}>Enter room</button>
    </div>
  );
}


export default WelcomeScreen;
