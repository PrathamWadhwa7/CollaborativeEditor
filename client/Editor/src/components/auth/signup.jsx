
import React, { useRef } from 'react'
import "./login.css"
import { useState } from 'react'
import axios from "axios"
export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] =useState('');
  const [userName,setUserName] = useState("");
  const emailRef= useRef();
  const passRef = useRef();
  const nameRef = useRef();
  const handleEmail =()=>{
    setEmail(emailRef.current.value);
  }
  const handlePass = ()=>{
    setPassword(passRef.current.value);
  }
  const handleuserName =()=>{
    setUserName(nameRef.current.value);
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
        const url = "http://localhost:3000/auth/signup";
        const response = await axios.post(url, {userName, email, password });
        console.log(response);
      setEmail('');
      setPassword('');
      setUserName('');
      emailRef.current.value = '';
    passRef.current.value = '';
    nameRef.current.value = '';
  };
  return (
    <div className='login'>
        <div className="top">
            
        </div>
        <div className="container">
           <form onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <input type="text" placeholder='User Name' value={userName} ref={nameRef}
            onChange={handleuserName}/>
            <input type="email" placeholder='Email' value={email}  ref={emailRef}
            onChange={handleEmail}/>
            <input type="password" placeholder='Password' value={password}  ref={passRef}
            onChange={handlePass} />
            <button type='submit' className="signupButton">Sign up</button>
            
            <small>This page is projected by Google form reCAPTCHA to ensure you are not a bot  
              
            </small>
           </form>
        </div>
    </div>
  )
}
