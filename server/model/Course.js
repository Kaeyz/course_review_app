const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const courseSchema = new Schema({
  title: String,
  category: String,
  description: String,
  authorId: String,
});

module.exports = mongoose.model("Course", courseSchema)