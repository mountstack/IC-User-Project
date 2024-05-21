const Category = require('../Model/Category');

async function create(req, res) {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json({
            message: 'Created Successfully'
        });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function getAllCategory(req, res) {
    try {
        const categories = await Category.find();
        res.json({
            status: 'success',
            categories
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getSingleCategory(req, res) {
    try {
        const category = await Category.findById(req?.params?.id);
        res.json({
            status: 'success',
            category
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function updateCategory(req, res) {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        
        res.json({
            status: 'success',
            category, 
            message: 'Updated Successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 

async function deleteCategory(req, res) {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        
        res.json({
            status:'success', 
            message: 'Deleted Successfully'
        });
        
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    } 
}

module.exports = {
    create,
    getAllCategory,
    getSingleCategory, 
    updateCategory, 
    deleteCategory
} 