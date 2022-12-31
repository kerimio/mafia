import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleRoom = ({ socket, username, room, role }) => {
const [roomUsers, setRoomUsers] = useState([]);
const [userRole, setUserRole] = useState([]);

const navigate = useNavigate();
useEffect (() => {
// Emit the 'get_users' event when the component mounts
socket.emit('get_users', { username, room, role });
}, [socket, username, room, role]); // Make sure to include all dependencies

useEffect (() => {
// Set the role for the user
const userRole = setRole();
// Send a message to the backend setting the role for the user
socket.emit('set_users', { username, room, role: userRole });
}, [socket, username, room]); // Don't include 'role' in the dependencies

useEffect(() => {
// Listen for the 'rolesSent' event
socket.on('rolesSent', (data) => {
console.log("newest Data with roles", data);
});
}, [socket]); // Don't include any dependencies here

function setRole() { 
  const role = ["mafia", "volk"];
  const selectedRole = role[Math.floor(Math.random() * role.length)];
  return selectedRole;
}

  return (
    <div>
   <div>test</div>

   </div>
  );
};

export default RoleRoom;
