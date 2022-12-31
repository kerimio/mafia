import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomAndUsers = ({ socket, username, room }) => {
const [roomUsers, setRoomUsers] = useState([]);
const navigate = useNavigate();
const [usersInRoomCount, setUsersInRoomCount] = useState(0);
const [readyCount, setReadyCount] = useState(0);
const [isReady, setIsReady] = useState(false);

useEffect(() => {
socket.on('chatroom_users', (data) => {
setRoomUsers(data);
setUsersInRoomCount(data.length);
});
return () => socket.off('chatroom_users');
}, [socket]);

useEffect(() => {
  // Add this event listener for the 'ready_count' event
  socket.on('ready_count', (data) => {
  setReadyCount(data.count);
  });
  return () => socket.off('ready_count');
}, [socket]);

const ready = () => {

  socket.emit('ready', { room });
  setIsReady(true);
  console.log("readyCount", readyCount);

  if (readyCount / usersInRoomCount >= 0.5) {
    navigate('/roleRoom', { replace: true });
  }
};




const leaveRoom = () => {
const createdtime = Date.now();
socket.emit('leave_room', { username, room, createdtime });
// Redirect to home page
navigate('/', { replace: true });
};



  return (
    <div className={styles.roomAndUsersColumn}>
      <h2 className={styles.roomTitle}>{room}</h2>
    <div>
        {roomUsers.length > 0 && <h5 className={styles.usersTitle}>Users:</h5>}
        Users in Room : {usersInRoomCount} <br></br>
        Ready Users: {readyCount}
        <ul className={styles.usersList}>
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <button className='btn btn-outline' onClick={ready}>
        Ready
      </button>
    </div>
  );
};

export default RoomAndUsers;