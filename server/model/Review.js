const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
  username: String,
  review: String,
  courseId: String
});

module.exports = mongoose.model("Review", reviewSchema);