const express = require('express'); 
const { create, findAll, findSingle } = require('../Controller/postController'); 
const { authenticate, accessTo } = require('../Middlewares/Authentication')

const route = express.Router(); 


route.post('/', authenticate, create); 
route.get('/', findAll); 
route.get('/:id', findSingle); 

// Update 
// Delete 



module.exports = route; 