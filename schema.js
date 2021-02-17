const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.ObjectId;

const schema = mongoose.Schema({
  author: ObjectId,
  title: String,
  body: String,
  imgURL: String,
  tags: [String],
  date: Date
});

const buildBlogPostObject = (args) => {
  return new BlogPost({
    title: args.title,
    body: args.body,
    imgURL: args.imgURL,
    tags: args.tags,
    date: Date.now()
  })
}

const BlogPost = mongoose.model("archives", schema)

exports.BlogPost = BlogPost
exports.buildBlogPostObject = buildBlogPostObject