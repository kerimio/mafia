import React from 'react';
import { useNavigate } from 'react-router-dom'


const WelcomeScreen = ({username, setUsername, room, setRoom, socket})  =>{
    console.log("hi")
    console.log("username: " + username);
    console.log("room: " + room);

  const navigate = useNavigate();

const joinRoom  = () => {
  if (room !== '' && username !== '') {
  console.log("joining the room");
  navigate('/Room', {replace: true});
  }
}


  return (
    <div>
      <h1>Welcome to Mafia Game</h1>
     <label>
  Enter your username:
  <input
    placeholder="Username..."
    onChange={(e) => setUsername(e.target.value)}
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
