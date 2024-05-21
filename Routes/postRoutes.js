const express = require('express'); 
const { 
    create, 
    findAll, 
    findSingle, 
    findMyProfilePosts, 
    deleteSinglePost, 
    updateSinglePost
} = require('../Controller/postController'); 
const { authenticate } = require('../Middlewares/Authentication')

const route = express.Router(); 

route.get('/my-posts', authenticate, findMyProfilePosts); 

route.post('/', authenticate, create); 
route.get('/', findAll); 
route.get('/:id', findSingle); 
route.delete('/:id', deleteSinglePost); 
route.patch('/:id', updateSinglePost); 



module.exports = route; 