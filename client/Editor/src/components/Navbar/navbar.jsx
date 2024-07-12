import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation, } from 'react-router-dom';

export default function Navbar({user}) {
  // const location= useLocation();
  // const {user}=location.state
  // console.log(user);
 
  useEffect(()=>{
    console.log("user in navbar:",user);
  },[])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Collaborative Editor
          </Typography>
          {!user ? (
            <>
              <Button color="inherit" component={Link} to="/signup">Signup</Button>
              <Button color="inherit" component={Link} to="/login">Login</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/logout">Logout</Button>
              <Button color="inherit" component={Link} to="/editor">Editor</Button>
              <Button color="inherit" component={Link} to="/gc">Group Chat</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}






