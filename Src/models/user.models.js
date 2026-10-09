import mongoose, {Schema} from "mongoose";

const userScheme = new Schema(
    {
        fullname: {
            type: String,
            default: "",
        },
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            default: ""
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post"
            }
        ],
        likedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post"
            }
        ],
        accessToken: {
            type: String,
            default: "",
            unique: true,
        }
    }, {timestamps: true}
)

export const User = mongoose.model("User", userScheme)