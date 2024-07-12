
import React, { useRef } from 'react'
import "./logout.css"
import { useState,useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

export default function Logout({setUser}) {
    const navigate=useNavigate();
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        // Remove the user from localStorage
        localStorage.removeItem('user');
        setUser(null);
        // Redirect to the login page
        navigate('/login');
      }, [navigate]);
  
  return (
    <div className='logout'>
           <h2>
            Loading...
           </h2>
    </div>
  )
}
