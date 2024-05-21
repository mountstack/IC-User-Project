const jwt = require('jsonwebtoken'); 

const authenticate = (req, res, next) => {  
    try { 
        const token = req.headers.authorization.split(' ')[1]; 
        const decode = jwt.verify(token, 'This_Is_My_Secret_Key'); 
        req.user = decode; 
        next(); 
    } 
    catch (error) { 
        res.status(400).json({ 
            message: 'Authentication failed.' 
        }) 
    } 
} 


const accessTo = (arr) => { 
    return function middleware(req, res, next) { 
        if(!arr.includes(req.user.role)) { 
            return res.json({
                message: "You don't have permission"
            })
        }
        
        next(); 
    } 
} 

module.exports = {
    authenticate, 
    accessTo
}; 