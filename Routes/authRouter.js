const express = require('express'); 
const { registration, login } = require('../Controller/authController'); 
const validate = require('../Middlewares/validation'); 

const route = express.Router(); 

route.post('/signup', validate, registration); 
route.post('/signin', login); 


// route.get('/', getAllUsers); 
// route.get('/:id', getSingleUser); 
// route.patch('/:id', updateUser);  
// route.delete('/:id', deleteUser); // /api/user/:id 

module.exports = route; 