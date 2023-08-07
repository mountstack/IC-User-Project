const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

const CommentSchema = new Schema({
    body: {
        type: String, 
        required: [true, 'Body is required']
    }, 
    userInfo: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }, 
}, { 
    timestamps: true
}); 

const Comment = mongoose.model('Comment', CommentSchema); 
module.exports = Comment; 
