import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useMemo } from 'react';
import './chat.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
 


export default function Chat() {
  const location = useLocation();
  const [socketID, setSocketId] = useState('');
  const [message, setMessage] = useState('');
  const [sender,setSender] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const socketRef = useRef(null);
  const [user, setUser] = useState(null);
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) {
          setUser(loggedInUser);
        }
      }, []);
  
  useEffect(() => {
    const socket = io('http://localhost:3000');
    socketRef.current = socket;

    socket.on('connect', () => {
      setSocketId(socket.id);
      console.log(`Connected with ID: ${socket.id}`);
    });
    socket.on('welcome',(s)=>{
        console.log(s);
    })
    socket.on('message', (message) => {
        setChatMessages((prevMessages) => [...prevMessages, message]);
       

      });

    
      

  
    return () => {
        socket.off('connect');
        socket.off('welcome');
        socket.off('message');
        socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
  
    const newMessage = { message, sender: user._id };
    socketRef.current.emit('message', newMessage);
    setMessage('');
  };

  return (
    <div className='chat-container'>
      <header className='chat-header'>
      <h1> Group Chat</h1>
      {/* <p>Connected with ID: {socketID}</p> */}
      </header>
      <div className='chat-box'>
        {chatMessages.map((msg, index) => (
          <div className='message' key={index}><b>{`${msg.sender.userName}`}</b>{`: ${msg.message}`}</div>
        ))}
      </div>
      <div className="chat-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      
      <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
