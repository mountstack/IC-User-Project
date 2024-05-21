const express = require('express'); 
const { registration, login } = require('../Controller/authController'); 
const validate = require('../Middlewares/validation'); 

const route = express.Router(); 

route.post('/signup', validate, registration); 
route.post('/signin', login); 

module.exports = route; 