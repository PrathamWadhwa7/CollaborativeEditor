const jwt = require('jsonwebtoken');
const authenticate = (req,res,next)=>{
    const authHeader= req.headers.authorization;
    if(authHeader){
       const token = authHeader.split(" ")[1];
       if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
      }
    try {
        const decoded = jwt.verify(token,'secret');
        req.user=decoded;
        next();
    } catch (e) {
        res.status(400).json({ message: 'Invalid token' });
    }
    }
    else
    {
        return res.status(500).json('not authenticated!');
    }
}
module.exports=authenticate;