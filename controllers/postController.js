const Post = require('../models/Post');
const cloudinary = require('cloudinary').v2


const getAllPosts = async (req, res) => {
    const posts = await Post.find()
    .populate("author", "name")
    try {
        if (posts.length === 0) {
            return res.status(400).json({message: "No posts found"})
        }
        return res.status(200).json(posts)
    }   catch (error) {
        return res.status(500).json({message: "Couldn't get any posts"})
    }
};

const getSinglePost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id)
    .populate("author", "name")
    try {
        return res.status(200).json(post)
    }   catch (error) {
        return res.status(500).json({message: "Could not get the post"})
    }
};

const createPost = async (req, res) => {
    const postToCreate = await Post.create(req.body); 
    try {
        return res.status(201).json(postToCreate);
    }   catch (error) {
        return res.status(500).json({message: "Could not create the post"})
    }
};

// POST - image
const imagePost = async (req, res) => {
    const { id } = req.params;
    const imageToUpdate = await Post.findById(id);

    //checks for pre-existing images
    if (imageToUpdate.image) {
        let array = imageToUpdate.image.split('/');
        let fileName = array[array.length-1];
        const [public_id] = fileName.split('.');
        await cloudinary.uploader.destroy(public_id);
    } 

    const { tempFilePath } = req.files.image;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    imageToUpdate.image = secure_url;
    await imageToUpdate.save();
    try {
        return res.status(201).json(imageToUpdate)
    }   catch (error) {
        return res.status(500).json({message: "There was an error uploading the image."})
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const postToUpdate = await Post.findByIdAndUpdate(id, req.body, {new: true})
    try {
        return res.status(202).json(postToUpdate);
    }   catch (error) {
        return res.status(500).json({message: "Could not update the post"})
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id)
    try{
        return res.status(203).json({message: "Post successfully deleted"})
    }   catch (error) {
        return res.status(500).json({message: "Could not delete the post"})
    }
};

module.exports = {
    getAllPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost,
    imagePost
}