const express = require('express'); 
const { create, findAll } = require('../Controller/commentController'); 
const { authenticate, accessTo } = require('../Middlewares/Authentication')

const route = express.Router(); 


route.post('/', authenticate, create); 
route.get('/', findAll); 

module.exports = route; 