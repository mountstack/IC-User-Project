const bcrypt = require('bcryptjs');
const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

const UserSchema = new Schema({
    name: {
        type: String, 
        trim: true, 
    }, 
    age: {
        type: Number, 
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
        select: false, 
        required: [true, 'Password is required'] 
    }, 
    hobby: [String], 
    role: {
        type: String, 
        required: true, 
        default: 'user'
    } 
}, { 
    timestamps: true
}); 

UserSchema.methods.comparePassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword); 
} 

const User = mongoose.model('User', UserSchema, 'myusers'); 
module.exports = User; 