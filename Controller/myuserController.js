const User = require('../Model/User'); 

function createUser(req, res) {
    const { name, age, email, hobby } = req.body; 
    const user = new User({
        name: name, 
        age: age, 
        email: email, 
        hobby: hobby
    }) 

    user.save()
        .then((data) => {
            res.json({
                message: 'User created successfully', 
                data
            }) 
        })
        .catch(err => {
            res.json({error: err})
        })
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find({}, {}); // filtering & projection
        res.json({
            users
        })
    } catch (error) {
        res.json({error})
    }
} 

async function getSingleUser(req, res) {
    const { id } = req.params;

    try {
        const user = await User.findById(id);; 
        res.json({
            user
        }) 
    } catch (error) {
        res.json({error})
    }
} 

async function updateUser(req, res) {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndUpdate({_id: id}, req.body, {new: true})
        res.json({
            user
        }) 
    } catch (error) {
        res.json({error})
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete({_id: id})
        res.json({
            user, 
            message: 'Deleted Successfully'
        }) 
    } catch (error) {
        res.json({error})
    }
}

module.exports = {
    createUser, 
    getAllUsers, 
    getSingleUser, 
    updateUser, 
    deleteUser 
} 