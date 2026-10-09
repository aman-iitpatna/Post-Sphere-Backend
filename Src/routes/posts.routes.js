import { Router } from "express";
import fs from "fs";
import path from "path";

import { createPost, getallPost, setLike, getUserPost } from "../controllers/post.controller.js";

import multer from "multer";

const postRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/temp"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

postRouter.route("/createpost").post(upload.single("postImage"), createPost);
postRouter.route("/getallposts").get(getallPost);
postRouter.route("/user/:username").get(getUserPost);
postRouter.route("/setlike").post(setLike);


export default postRouter;