const { Server, Socket } = require("socket.io");
const axios =require('axios');
const ChatMessages= require('./models/chatMessage');
const Users = require('./models/users'); 

module.exports = (io) => {
    io.on("connection",(socket)=>{
       console.log(`new user connected with user id : ${socket.id}`);
        socket.emit('welcome',`Welcome to the server!, ${socket.id}`);
        socket.broadcast.emit('welcome',`${socket.id} Joined Server!`);
        socket.on('message',async(data)=>{
            const {message,sender} = data;
            if(message && message.trim() !== ''){
            const response = await axios.post('http://localhost:3000/chat', { message, sender });
            const savedMessage = response.data.data;
           

            console.log(`Message saved and broadcasted: ${savedMessage.message} by ${savedMessage.sender.userName}`);
            io.emit('message', savedMessage);}

        })
        socket.on('edited-data', async(data) => {
            const{code, owner } = data;
            console.log(`Editor data received: ${code} by ${owner.userName}`);

            try {
                
                await axios.delete('http://localhost:3000/code/clear');
                await axios.post('http://localhost:3000/code/save',{code:code,ownerId:owner._id});
                
                socket.broadcast.emit('edited-data', {code:code,owner:owner});
            } catch (error) {
                console.log("error occured : ",error);
            }
            
            

        });

    
        
    })
};