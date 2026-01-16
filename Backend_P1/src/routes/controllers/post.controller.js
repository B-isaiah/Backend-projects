import {Post} from "../../models/post.user.js";

// Create a new post   
export const createPost = async (req, res) => {
    try {
        const {name, description, age, location} = req.body;
        const newPost = new Post({name, description, age, location});
        if (!name || !description || !age || !location) {
            return res.status(400).json({message: "All fields are required"});
        }

        const post = await Post.create({name, description, age, location});
        res.status(201).json({message: "Post created successfully", post});

    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};
// Get all posts
export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};
   
//update post
export const updatePost = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({message: "No data provided to update"});
        }   
        const {id} = req.params;
        const {name, description, age, location} = req.body;
        const updatedPost = await Post.findByIdAndUpdate(id, {name, description, age, location}, {new: true});
        if (!updatedPost) {
            return res.status(404).json({message: "Post not found"});
        }
        res.status(200).json({message: "Post updated successfully", updatedPost});
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};

export const deletePost = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({message: "Post not found"});
        }
        res.status(200).json({message: "Post deleted successfully", deletedPost});
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};