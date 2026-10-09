import { User } from "../models/user.models.js";
import { v4 as uuidv4 } from 'uuid';

const registerUser = async (req, res) => {
    
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            message: "Username and password are required"
        })
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(300).json({
            message: "Username already exists"
        })
    }
    
    await User.create({
        username: req.body.username,
        password: req.body.password,
    })
    .then((User) => {
        res.status(200).json({
            message: "User registered successfully",
            user: User.id,
        })
    })
    .catch((error) => {
        res.status(500).json({
            message: "Error registering user",
            error: error
        })
    })
}

const loginUser = async (req, res) => {
    
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            message: "Username and password are required"
        })
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).json({
            message: "Invalid username"
        })
    }

    if (req.body.password != user.password) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    return res.status(200)
        .json({ message: "User logged in successfully",
                user: user._id});

}

const updateFullName = async(req, res) => {
    const user = await User.findOne({_id: req.body.id})

    await user.updateOne({fullname: req.body.fullname})
    await user.save()
    .then((user) => {
        res.status(200).json({
            message: "Full name updated successfully",
            user: user
        })
    })
    .catch((error) => {
        res.status(500).json({
            message: "Error updating full name",
            error: error
        })
    })
}

const userdata = async(req, res) => {
    // const user = await User.findById(req.params.id);

    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            "fullname": user.fullname,
            "username": user.username,
            "avatar": user.avatar,
            "posts": user.posts.length,
        })
    }
    catch  {
    }
    try {
        const user = await User.findOne({ username: req.params.id });
        res.status(200).json({
            "fullname": user.fullname,
            "username": user.username,
            "avatar": user.avatar,
            "posts": user.posts.length,
        })
    }
    catch  {
    }
    // if (!user) {
    //     return res.status(404).json({
    //         message: "User not found"
    //     });
    // }
    // res.status(200).json({
    //     "fullname": user.fullname,
    //     "username": user.username,
    //     "avatar": user.avatar,
    //     "posts": user.posts.length,
    // })
}
export { registerUser, loginUser, updateFullName, userdata };