const Comment = require('../Model/Comment'); 
const Post = require('../Model/Post'); 

async function create(req, res) {
    req.body.userInfo = req.user._id; 
    const { userInfo, body, postId } = req.body; 

    const comment = new Comment({userInfo, body}); 

    await comment.save(); 

    const post = await Post.findById(postId); 
    post.comments.push(comment._id); 

    await Post.findByIdAndUpdate({_id: postId}, post, {new: true}); 

    res.json({
        message: 'comment created successfully'
    }); 
} 

async function findAll(req, res) {
    const comments = await Comment.find().populate('userInfo').populate('postInfo'); 
    res.json({
        comments
    }) 
} 

module.exports = {
    create, 
    findAll 
}