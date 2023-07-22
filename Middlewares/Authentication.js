const jwt = require('jsonwebtoken'); 

const authenticate = (req, res, next) => {  
    try { 
        const token = req.headers.authorization.split(' ')[1]; 
        console.log({token});
        const decode = jwt.verify(token, 'This_Is_My_Secret_Key'); 
        req.user = decode; 
        next(); 
    } 
    catch (error) { 
        res.json({ 
            message: 'Authentication failed.' 
        }) 
    } 
} 

module.exports = authenticate; 