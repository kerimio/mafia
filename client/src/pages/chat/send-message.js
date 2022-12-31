import styles from './styles.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit('send_message', { username, room, message, __createdtime__ });
      setMessage('');
    }
  };

  const joinRoom = () => {    
    navigate('../roleRoom', { replace: true });
  };

  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className='btn btn-primary' onClick={sendMessage}>
        Send Message
      </button>

      <button className='btn btn-outline' onClick={joinRoom}>Go</button>
    </div>
  );
};

export default SendMessage;