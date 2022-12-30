import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();
  const joinRoom = () => {
    if (room !== '' && username !== '') {
      const role = setRole();
      console.log(username + " " + "role is: " + role);
      socket.emit('join_room', { username, room, role });
      localStorage.setItem("username", username);
      localStorage.setItem("room", room);
      localStorage.setItem("role", role);
    }
    navigate('../chat', { replace: true });
  };

 
  function setRole() { 
    const role = ["mafia", "volk"];
    const selectedRole = role[Math.floor(Math.random() * role.length)];
    return selectedRole;
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>DevRooms</>`}</h1>
        <input 
        className={styles.input} 
        placeholder='Username...'
        onChange={(e) => setUsername(e.target.value)}
         />

        <select className={styles.input}
         onChange={(e) => setRoom(e.target.value)}>
          <option>-- Select Room --</option>
          <option value='javascript'>JavaScript</option>
          <option value='node'>Node</option>
          <option value='express'>Express</option>
          <option value='react'>React</option>
        </select>

        <button className='btn btn-secondary' onClick={() => {joinRoom(); setRole();}} style={{ width: '100%' }}>Join Room</button>
      </div>
    </div>
  );
};

export default Home;