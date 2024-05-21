const Post = require('../Model/Post'); 

async function create(req, res) { 
    req.body.userInfo = req.user._id; 
    
    const { 
        userInfo, title, content, 
        category = [], publish, 
        featureImageUrl 
    } = req.body; 

    if(!title || !content || !featureImageUrl) { 
        return res.status(400).json({
            message: 'Title, Content & Image are required'
        }) 
    } 

    const post = new Post({
        userInfo, title, content, 
        category, publish, featureImageUrl
    }); 
    
    try { 
        await post.save(); 
        res.status(201).json({ 
            message: 'Post created successfully' 
        }); 
    } 
    catch (error) { 
        res.status(400).json({ 
            message: error.message
        })
    }
} 

async function findAll(req, res) { 
    const posts = await Post.find().populate([ 
        {path: 'userInfo'}, 
        {path: 'category'}, 
        {path: 'comments', populate: { path: 'userInfo' }}, 
    ]); 
    res.json({ 
        message: 'All Posts...', 
        posts 
    }) 
} 

async function findSingle(req, res) {
    // /api/post/:id
    const { id } = req.params; 
    const post = await Post.findById(id).populate([
        {path: 'userInfo'}, 
        {path: 'comments', populate: { path: 'userInfo' }}, 
        {path: 'category'}
    ]); 
    res.json({
        post
    }) 
} 

async function findMyProfilePosts(req, res) { 
    try {
        const userId = req.user._id; 
        const posts = await Post.find({ userInfo: userId }).populate([ 
            {path: 'userInfo'}, 
            {path: 'category'}, 
            {path: 'comments', populate: { path: 'userInfo' }}, 
        ]); 

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found for the user" });
        }

        return res.status(200).json({posts}); 
    } 
    catch (error) { 
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function deleteSinglePost(req, res) {
    try {
        const { id } = req.params; 
        await Post.findByIdAndDelete(id); 
        return res.status(200).json({
            message: 'Deleted Successfully...'
        }); 
    } 
    catch(err) {
        return res.status(400).json({
            message: err.message
        }) 
    }
} 

async function updateSinglePost(req, res) {
    try {
        const { id } = req.params; 
        await Post.findByIdAndUpdate(id, {$set: req.body}); 
        return res.status(200).json({
            message: 'Updated Successfully...'
        }); 
    } 
    catch(err) {
        return res.status(400).json({
            message: err.message
        }) 
    }
}


module.exports = {
    create, 
    findAll, 
    findSingle, 
    findMyProfilePosts, 
    deleteSinglePost, 
    updateSinglePost
} 