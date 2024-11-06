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
  const { username } = req.params;
  try {
    const images = await Image.find({ name: username }); // Find images by username
    if (images.length === 0) {
      return res.status(404).json({ message: "No images found" });
    }

    // Format the response to ensure imgData is in base64 format and not undefined
    const imagesWithBase64 = images.map((image) => ({
      name: image.name,
      contentType: image.contentType,
      imgData: image.imgData.toString("base64"), // Convert buffer to base64 string
    }));

    res.status(200).json(imagesWithBase64);
  } catch (error) {
    console.error("Error fetching images:", error);
    res
      .status(500)
      .json({ error: "Error fetching images", details: error.message });
  }
});



module.exports = router;

