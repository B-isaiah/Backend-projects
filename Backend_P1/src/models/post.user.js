import mongoose, {Schema} from "mongoose";

const postSchema = new Schema(
{
    name: {
        type: String,
        required: true, 
        trim: true
    },
     description: {
        type: String,
        required: true,
        trim: true
    },

    age: {
        type: Number,
        required: true,
        min: 1,
        max: 150
    },

    location: {
        type: String,
        required: true,
        trim: true
    
}

},
    {
        timestamps: true,
    }
)


const Post = mongoose.models.Post || mongoose.model("Post", postSchema);    
export { Post };
