const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

const UserSchema = new Schema({
    name: {
        type: String, 
        // required: [true, 'Name is required'], 
        trim: true, 
    }, 
    age: {
        type: Number, 
        // required: [true, 'Age is required'], 
        min: [18, 'Minimum age is 18'], 
        max: [40, 'Maximum allowed age is 40']
    }, 
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        trim: true, 
        unique: true, 
        validate: [
            function(email) {
                return email.includes('@'); 
            }, 
            'Incorrect Email'
        ] 
    }, 
    password: {
        type: String, 
        required: [true, 'Password is required'] 
    }, 
    hobby: [String]
}, { 
    timestamps: true
}); 

const User = mongoose.model('User', UserSchema, 'myusers'); 
module.exports = User; 