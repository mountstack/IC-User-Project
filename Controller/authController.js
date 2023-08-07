const User = require('../Model/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

async function registration(req, res) {
    // 1. Receive data 
    const { email, password } = req.body; 

    // 2. duplicate email 
    const data = await User.findOne({email}); 
    if(data) {
        return res.json({
            message: 'Duplicate email. Enter a new email. '
        })
    } 

    // 3. Password ENCRYPT --> Bcrypt.js NPM package
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Save data & Response 
    const user = new User({
        email: email, 
        password: hashedPassword
    }) 

    user.save()
        .then((data) => {
            res.json({
                message: 'Registration successful', 
                data
            }) 
        }) 
        .catch(err => {
            res.json({error: err})
        }) 
} 

async function login(req, res) {
    // 1. Get data 
    const { email, password } = req.body; 
    if(!email || !password) { 
        return res.json({ 
            message: 'Wrong email or password'
        }) 
    } 

    // 2. User exist 
    const user = await User.findOne({email}).select('+password'); 
    if(!user) {
        return res.json({ 
            message: 'Wrong email'
        }) 
    } 
    const { _id, role } = user; 

    // 3. Password matching 
    const result = await user.comparePassword(password, user.password); 
    if(!result) {
        return res.json({ 
            message: 'Wrong password'
        }) 
    } 


    // 4. Send Token 
    const token = jwt.sign({_id, email, role}, 'This_Is_My_Secret_Key', {expiresIn: '1d'}); 

    res.json({
        message: 'Login Successful', 
        token: `Bearer ${token}`
    })
} 


module.exports = {
    registration, 
    login
} 