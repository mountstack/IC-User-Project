const express = require('express'); 
const mongoose = require('mongoose'); 
const userRoute = require('./Routes/userRouter'); 
const authRoute = require('./Routes/authRouter'); 
const postRoute = require('./Routes/postRoutes'); 
const commentRoute = require('./Routes/commentRoute'); 

const app = express(); 
app.use(express.json()); 

// Routing  --> USER 

app.use('/api/user', userRoute); 
app.use('/api/auth', authRoute); 
app.use('/api/post', postRoute); 
app.use('/api/comment', commentRoute); 


// app.use('/api/product', productRoute); 
// app.use('/api/order', orderRoute); 



app.listen(8080, () => {
    console.log('App is running');
    mongoose.connect('mongodb://localhost:27017/icusersdb', {  useNewUrlParser: true })
        .then(() => {
            console.log('Database Connected');
        })
        .catch(err => {
            console.log('Error occures');
            console.log(err);
        })
}) 