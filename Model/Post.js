const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

const PostSchema = new Schema({
    title: { type: String, required: [true, 'Title is required'] }, 
    content: { type: String, required: [true, 'Content is required'] }, 
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }], 
    userInfo: { type: Schema.Types.ObjectId, ref: 'User' }, 
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], 
    featureImageUrl: { type: String, required: [true, 'Image is required']}, 
    publish: { type: Boolean, default: true }
}, { 
    timestamps: true
}); 



const Post = mongoose.model('Post', PostSchema); 
module.exports = Post; 