const express = require("express");
const router = express.Router();
const Image = require("../models/Image");

router.use(express.json());
router.post("/imageGeneration", async (req, res) => {
  try {
    const { name, prompt, imgData, contentType } = req.body;

    console.log("Received data:", req.body); // Log incoming data

    if (!imgData || !contentType) {
      return res
        .status(400)
        .json({ error: "imgData and contentType are required" });
    }

    const imageBuffer = Buffer.from(imgData, "base64");

    const newImage = new Image({
      name,
      prompt,
      imgData: imageBuffer,
      contentType,
    });

    const image = await newImage.save();
    res.status(201).json(image);
  } catch (error) {
    console.error("Error in image generation:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/getImage/:username", async (req, res) => {
  const { username } = req.params; // Get username from request parameters
  try {
    const images = await Image.find({ name: username }); // Fetch images for specific user
    if (images.length === 0) {
      return res.status(404).json({ message: "No images found" });
    }
    res.status(200).json(images); // Return an array of image objects
  } catch (error) {
    console.error("Error fetching images:", error); // Log any error
    res
      .status(500)
      .json({ error: "Error fetching images", details: error.message });
  }
});

module.exports = router;
