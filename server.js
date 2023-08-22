const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const multer = require('multer'); 

const userRoute = require('./Routes/userRouter'); 
const authRoute = require('./Routes/authRouter'); 
const postRoute = require('./Routes/postRoutes'); 
const commentRoute = require('./Routes/commentRoute'); 

const User = require('./Model/User'); 

const socketWorld = require('./socket/socket'); 
const emailSend = require('./Controller/emailSend')


const app = express(); 
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({extended: false})); 

// set the view engine to ejs 
app.set('view engine', 'ejs'); 
app.set('views', './views'); 

// Routing  --> USER 

app.get('/', async (req, res) => { 
    const users = await User.find(); 
    res.render('index', {users}); 
}) 

app.use('/api/user', userRoute); 
app.use('/api/auth', authRoute); 
app.use('/api/post', postRoute); 
app.use('/api/comment', commentRoute); 
app.get('/api/sendEmail', emailSend); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        return cb(null, './upload'); 
    }, 
    filename: (req, file, cb) => { 
        return cb(null, `${Date.now()}-${file.originalname}`); 
    }
}) 

const upload = multer({ storage: storage }); 

app.post('/api/upload', upload.single('avatar'), (req, res) => {
    console.log(req.file.path);
    return res.redirect('/'); 
}) 


// app.use('/api/product', productRoute); 
// app.use('/api/order', orderRoute); 


const server = app.listen(5000, () => { 
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


socketWorld(server); 