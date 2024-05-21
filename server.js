const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const userRoute = require('./Routes/userRouter'); 
const authRoute = require('./Routes/authRouter'); 
const postRoute = require('./Routes/postRoutes'); 
const commentRoute = require('./Routes/commentRoute'); 
const categoryRoute = require('./Routes/categoryRoute'); 


const app = express(); 
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({extended: false})); 


app.get('/', async (req, res) => { 
    res.json({
        message: 'App is running in port 5000'
    })
}) 

app.use('/api/user', userRoute); 
app.use('/api/auth', authRoute); 
app.use('/api/post', postRoute); 
app.use('/api/comment', commentRoute); 
app.use('/api/category', categoryRoute); 

const PORT = 5000; 
app.listen(PORT, async () => { 
    console.log('App is running on PORT 5000');
    try {
        await mongoose.connect('mongodb://localhost:27017/blog_db'); 
        console.log('Database Connected'); 
    } 
    catch (error) {
        console.log('Error occures');
        console.log(error);
    }
}) 