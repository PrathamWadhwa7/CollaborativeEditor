
import React, { useRef } from 'react'
import "./login.css"
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
export default function Login({setUser}) {
  const [email,setEmail] = useState("");
  const [password,setPassword] =useState('');
  const emailRef= useRef();
  const passRef = useRef();
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false);
  const handleEmail =()=>{
    setEmail(emailRef.current.value);
  }
  const handlePass = ()=>{
    setPassword(passRef.current.value);
  }
  const handleSubmit=async(e)=>
  {
    e.preventDefault();  
    try{
    const url = "http://localhost:3000/auth/login";
    setLoading(true);
        const response = await axios.post(url, {email, password });
        console.log(response.data);
        setLoading(false);
        const user = response.data.result;
        const token= response.data.token;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token',JSON.stringify(token));
        setUser(user);
      setEmail('');
      setPassword('');
      emailRef.current.value = '';
    passRef.current.value = '';
    navigate('/gc', { state: { user } });
    }
    catch(e){
      console.log("error",e);
    }
    

  }
  return (
    <div className='login'>
        <div className="top">
            
        </div>
        <div className="container">
           <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <input type="email" placeholder='Email' value={email} onChange={handleEmail}  ref={emailRef} />
            <input type="password" placeholder='Password' value={password} onChange={handlePass} ref={passRef} />
            <button className="loginButton">{loading?<CircularProgress/>:"Sign in"}</button>
            <span>New to Collabrative Edittor ? <b> Sign up now</b></span>
            <small>This page is projected by Google form reCAPTCHA to ensure you are not a bot  
              
            </small>
           
           </form>
           
        
        </div>
    </div>
  )
}
