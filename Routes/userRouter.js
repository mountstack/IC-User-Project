const express = require('express'); 
const authenticate = require('../Middlewares/Authentication')
const { 
    // createUser, 
    getAllUsers, 
    getSingleUser, 
    updateUser, 
    deleteUser 
} = require('../Controller/myuserController')

const route = express.Router(); 

// route.post('/', createUser); 
route.get('/', getAllUsers); 
route.get('/:id', getSingleUser); 
route.patch('/:id', updateUser);  
route.delete('/:id', authenticate, deleteUser); // /api/user/:id 

module.exports = route; 