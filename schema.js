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

const BlogPost = mongoose.model("archives", schema)

exports.BlogPost = BlogPost