import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    blogContent: {
        type: String,
        required: true,
        trim: true
    },

    views: {
        type: Number,
        default: 200
    },
    likes: {
        type: Number,
        default: 89
    },
    comments: {
        type: Number,
        default: 10
    },
     

    // comments: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Comment'
    //     }

    // ],


   featuredImage: {
  url: String,
  public_id: String,
}
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema, 'blogs');
export default Blog;
