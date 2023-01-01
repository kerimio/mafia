
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client';


const myBool = true;
const Room = ({user, room, socket}) => {
  const [chatRoomUsers, setChatRoomUsers] = useState([]);
  console.log("hello in room: ", room, " user: ", user);
  const navigate = useNavigate();

useEffect(() => {
  socket.on('chatroom_users', (data) => {
    console.log("hi", data)
    console.log("users in room: ", data);
    setChatRoomUsers(data);
  });
}, [socket]);

  console.log(chatRoomUsers)


  if(myBool == false){
    return (
        <div>hi</div>
    )
  }
  {
  return (
    <div>
      <h1>Welcome to the ROOM room, user!</h1>
      <h2>Users in this room:</h2>
      <ul>
        {chatRoomUsers.map((user) => (
          <li key={user.id}>{user.user}</li>
        ))}
      </ul>
    </div>
  );
}
}

export default Room;
