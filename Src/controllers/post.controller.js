import { Post } from "../models/post.models.js";
import { User } from "../models/user.models.js";

import uploadOnCloudinary from "../Utils/Cloudinary.js"

const getallPost = async(req, res) => {
    res.status(200).json({
        message: "All posts fetched successfully",
        posts: await Post.find().populate("user", 'username avatar')
    })
}

const getUserPost = async(req, res) => {
    const user = await User.findOne({ username: req.params.username });
    res.status(202).json({
        posts: await Post.find({user: user.id}).populate("user", 'username avatar')
    })
}

const createPost = async(req, res) => {
    try {
        const user = await User.findById(req.body.id);

        if(!req.body.title || !user) {
            return res.status(404).json({ message: 'Invalid UserId' });
        }
        console.log("req.file?.path", req.file?.path);

        const postImageURL = req.file?.path ? await uploadOnCloudinary(req.file.path): null;

        const post = await Post.create({
            title: req.body.title.trim(),
            image: postImageURL || "",
            user: user._id,
        });

        user.posts.push(post._id);
        await user.save();

        return res.status(201).json({
            message: 'Post created successfully',
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Error occurred while creating the post',
            error: error.message
        });
    }
};

const setLike = async(req, res) => {
    const { action, userid, postid } = req.body;

    if (!userid || !postid) {
        return res.status(400).json({
            message: "User ID and post ID are required"
        });
    }
    if (action !== "add" && action !== "remove") {
        return res.status(400).json({
            message: "Action must be 'add' or 'remove'"
        });
    }

    const user = await User.findById(userid);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    try {
        const post = await Post.findById(postid);
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (action === "add") {
            if (!post.like.some(id => id.toString() === userid.toString())) {
                post.like.push(user._id);
            }
            if (!user.likedPosts.some((id) => id.toString() === post._id.toString())) {
                user.likedPosts.push(post._id);
            }
        } 
        else {
            if (post.like.some(id => id.toString() === userid.toString())) {
                post.like.pull(user._id);
                user.likedPosts.pull(post._id);
            }
        }

        await post.save();
        await user.save();
        
        return res.status(200).json({
            message: action === "add"
                ? "Post liked successfully"
                : "Post like removed successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while updating the post like",
            error: error.message
        });
    }
}

export { createPost, getallPost, setLike, getUserPost };