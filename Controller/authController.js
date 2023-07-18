const User = require('../Model/User'); 
const bcrypt = require('bcryptjs');

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



module.exports = {
    registration
} 