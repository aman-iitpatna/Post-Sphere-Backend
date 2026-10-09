import mongoose, {Schema} from "mongoose";

const postScheme = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: ""
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        like: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
    },{timestamps: true}
)

export const Post = mongoose.model("Post", postScheme)