import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Home from './components/Home/Home.jsx';
import CodeEditor from './components/editor/codeEditor.jsx';
import Chat from './components/editor/chat';
import Navbar from "./components/Navbar/navbar.jsx";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Logout from './components/auth/logout.jsx';
import { useState,useEffect } from 'react';

function App() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) {
          setUser(loggedInUser);
        }
      }, []);

    return (
        <Router>
            <Navbar user={user} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={user ? <Navigate to="/logout" /> :<Signup />} />
                <Route path='/login' element={user ? <Navigate to="/logout" /> :<Login setUser={setUser}/>} />
                <Route path='/logout' element={<Logout setUser={setUser}/>}/>
                <Route path='/gc' element={<ProtectedRoute><Chat user={user} /></ProtectedRoute>}/>
                <Route path='/editor' element={<ProtectedRoute><CodeEditor/></ProtectedRoute>}/>
               
                

            </Routes>
        </Router>
    );
}

export default App;

