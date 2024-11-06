const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  imgData: { type: Buffer, required: true }, // Store image as Buffer
  contentType: { type: String, required: true }, // Store content type of the image
});

module.exports = mongoose.model("Image", ImageSchema);
