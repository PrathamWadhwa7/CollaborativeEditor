import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Button from '@mui/material/Button';
import Prism from "prismjs";
import "prismjs/themes/prism.css"; 
import "prismjs/components/prism-core";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp"; 
import "./codeEditor.css";
import axios from 'axios';

export default function CodeEditor() {
    const [socketID, setSocketId] = useState('');
    const [text, setText] = useState('');
    const [lastEditor, setLastEditor] = useState('');
    const [language, setLanguage] = useState('javascript');
    const socketRef = useRef(null);
    const [user, setUser] = useState(null);
    
    useEffect(()=>{

        const oldEdiitedData = async()=>{
            try {
          const token = JSON.parse(localStorage.getItem('token'));
          const oed = await axios.get('http://localhost:3000/code',{headers:{
            Authorization:`Bearer ${token}`
        }});
    
        setText(oed.data[0].code);
        const leditor=await axios.get(`http://localhost:3000/auth/${oed.data[0].owner}`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        console.log(leditor);
        setLastEditor(leditor.data.userName);
            }
            catch (error) {
               console.log("error occured:",error);
           }
    
        }
        oldEdiitedData();
    },[]);
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) {
          setUser(loggedInUser);
        }
        
            
       
      }, []);

    useEffect(() => {
       
            const socket = io('http://localhost:3000');
            socketRef.current = socket;
            socketRef.current.on('connect', () => {
                setSocketId(socketRef.current.id);
                console.log(`Connected with ID: ${socketRef.current.id}`);
            });

            socketRef.current.on('welcome', (message) => {
                console.log(message);
            });

            socketRef.current.on('edited-data', (data) => {
                const {code,owner}  =  data;
                setText(code);
                console.log(`editor of code : ${owner.userName}`);
                setLastEditor(owner.userName);
               
            });

            // Cleanup function to remove the event listener
            return () => {
                socketRef.current.off('connect');
                socketRef.current.off('welcome');
                socketRef.current.off('edited-data');
                socketRef.current.disconnect();
            };
        
    }, []);
    const handleChange=(e)=>{
        const newTextData = e.target.value;
        setText(newTextData);
        
    }
    const handleClick = (e) => {
        const codeData={code:text,owner:user};
        setLastEditor(user.userName);
        console.log("sender leditor updated:",user.userName);
        
        
       
       
        socketRef.current.emit('edited-data', codeData);
    };
    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        
    };
    useEffect(() => {
        Prism.highlightAll();
        console.log(language)
    }, [text,language]);

    return (
        <div className="container">
            <div className="editor-container">
            <h1>Real Time Text Editor</h1>
            <select value={language} onChange={handleLanguageChange}>
            <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
            </select>
            <textarea className="input"
                value={text}
                onChange={handleChange}
                id="code"
                cols={100}
                rows={20}
                placeholder="Type your code here..."
                title={lastEditor ? `Last edited by ${lastEditor}` : "Type your code here..."}
            />
            <Button  className="save" onClick={handleClick} variant="outlined">Save</Button>
            </div>
            <div className="highlight-container">
                <pre className={`language-${language}` }>
                    <code className={`language-${language}` } >
                        {text}
                    </code>
                </pre>
            </div>
        </div>
    );
}
