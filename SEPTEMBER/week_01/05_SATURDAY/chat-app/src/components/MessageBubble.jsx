import React from 'react';
import styles from './MessageBubble.module.css'; 

const MessageBubble = ({ role, text, timestamp }) => {
  return (
    <div className={`${styles.bubble} ${role === 'user' ? styles.user : styles.assistant}`}>
      <p>{text}</p>
      <small>{new Date(timestamp).toLocaleTimeString()}</small>
    </div>
  );
};

export default MessageBubble;
