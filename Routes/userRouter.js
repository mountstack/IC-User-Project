const express = require('express'); 
const { authenticate, accessTo } = require('../Middlewares/Authentication')
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
route.delete('/:id', authenticate, accessTo(['admin', 'moderator']), deleteUser); 

module.exports = route; 