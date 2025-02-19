const BlogModel = require('../models/crudModel');
const fs = require('fs');

// Add blog page (render form)
const AddBlog = (req, res) => {
    return res.render('Addblog');
};

// Insert a new blog
const insertBlog = async (req, res) => {
    try {
        const { title, description, author } = req.body;
        const newBlog = new BlogModel({
            title: title,
            description: description,
            author: author,
            image: req.file ? req.file.path : ''
        });

        await newBlog.save();  
        console.log("New blog post published successfully");
        return res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        return false;
    }
};

// Delete blog
const deleteBlog = async (req, res) => {
    try {
        const deid = req.query.deletId;
        let single = await BlogModel.findById(deid);
        fs.unlinkSync(single.image);
        await BlogModel.findByIdAndDelete(deid);
        console.log("The blog post has been removed successfully.");
        return res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Edit blog (render form for editing)
const editBlog = async (req, res) => {
    try {
        const eid = req.query.editId;
        const single = await BlogModel.findById(eid);
        return res.render('Editblog', { single });
    } catch (error) {
        console.log(error);
        return false;
    }
};

// Update blog details
const UpdateBlog = async (req, res) => {
    try {
        const { editid, title, description, author } = req.body;
        if (req.file) {
            const single = await BlogModel.findById(editid);
            fs.unlinkSync(single.image);
            await BlogModel.findByIdAndUpdate(editid, {
                title: title,
                description: description,
                author: author,
                image: req.file.path
            });
            console.log("Blog updated! Your revisions are now live.");
            return res.redirect('/dashboard');
        } else {
            const single = await BlogModel.findById(editid);
            await BlogModel.findByIdAndUpdate(editid, {
                title: title,
                description: description,
                author: author,
                image: single.image
            });
            console.log("Blog updated! Your revisions are now live.");
            return res.redirect('/dashboard');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

const readmore = async (req, res) => {
    try {
        const id = req.query.readmoreId; 
        if (!id) {
            console.log("No ID provided in query");
            return res.status(400).send("Invalid request: ID is required");
        }

        const single = await BlogModel.findById(id); 
        if (!single) {
            console.log(`No record found for ID: ${id}`);
            return res.status(404).send("Blog not found");
        }

        res.render('readmore', { single }); 
    } catch (err) {
        console.error("Error in readmore function:", err);
        res.status(500).send("Internal Server Error");
    }
};



module.exports = {
    AddBlog,
    insertBlog,
    deleteBlog,
    editBlog,
    UpdateBlog,
    readmore
};
