const express = require('express');
const mongoose = require('mongoose');
const socketIo = require("socket.io");
const http = require("http");
const authRoutes = require('./routes/auth');
const chatRoutes=require('./routes/chat');
const codeRoutes=require('./routes/code');
const cors = require('cors')

const app = express();
const server =http.createServer(app);
const io = socketIo(server,{
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://prathamwadhwa7:YQXxwOEPWro9gIDn@cluster0.7gmpaw5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
    
//     await client.connect();
   
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
   
    
//   }
// }
// run().catch(console.dir);
// const uri = "mongodb+srv://prathamwadhwa7:YQXxwOEPWro9gIDn@cluster0.7gmpaw5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB using Mongoose with increased timeout settings
mongoose.connect(uri, {
  connectTimeoutMS: 30000,  // Increase connection timeout to 30 seconds
  socketTimeoutMS: 45000,   // Increase socket timeout to 45 seconds
})
.then(() => {
  console.log("Successfully connected to MongoDB");
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/code', codeRoutes);
app.use('/chat', chatRoutes);
require('./socket')(io);

app.get('/',(req,res)=>{
  res.json('Welcome to Collaborative editor!')
})


server.listen(3000,()=>{
    console.log("Listening at port : 3000")
})