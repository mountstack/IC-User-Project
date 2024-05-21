const express = require('express'); 
const { 
    create, 
    getAllCategory, 
    getSingleCategory, 
    updateCategory, 
    deleteCategory
} = require('../Controller/categoryController'); 
const { authenticate } = require('../Middlewares/Authentication')

const route = express.Router(); 


route.post('/', authenticate, create); 
route.get('/', getAllCategory); 
route.get('/:id', getSingleCategory); 
route.patch('/:id', updateCategory); 
route.delete('/:id', deleteCategory); 


module.exports = route; 