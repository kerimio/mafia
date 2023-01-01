
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client';


const myBool = true;
const Room = ({user, room, socket}) => {
  const [chatRoomUsers, setChatRoomUsers] = useState([]);
  const [readyUsers, setReadyUsers] = useState([]);
  console.log("hello in room: ", room, " user: ", user);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('chatroom_users', (data) => {
      setChatRoomUsers(data);
    });
    socket.on('ready_users', (data) => {
      console.log("ready: ", data);
      setReadyUsers(data);
    });
  }, [socket]);

  let isReady = false;
  const ready = () => {
  if (isReady === false){
    socket.emit('ready', {user, room});
  }
  isReady = true;
  }


  if(myBool == false){
    return (
        <div>hi</div>
    )
  }
  {
  return (
    <div>
      <h2>Users in this room:</h2>
      <ul>
        {chatRoomUsers.map((user) => (
          <li key={user.id}>{user.user}</li>
        ))}
        <button onClick={ready}> I'm ready! </button>
        <p> Ready Users {readyUsers} </p>
      </ul>
    </div>
  );
}
}

export default Room;
