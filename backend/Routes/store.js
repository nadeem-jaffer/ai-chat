const express = require("express");
const router = express.Router();
const Image = require("../models/Image");
router.use(express.json());

router.post("/imageGeneration", async (req, res) => {
  try {
    if (!req.body.imgUrl) {
      return res.status(400).json({ error: "imgUrl is required" });
    }

    const newImage = new Image({
      name:req.body.name,
      prompt:req.body.prompt,
      imgUrl: req.body.imgUrl,
    });

    const image = await newImage.save();
    res.status(201).json(image);
  } catch (error) {
    console.error("Error in image generation:", error); // Log any error
    res.status(500).json({ error: error.message });
  }
});

router.get("/getImage/:id", async (req, res) => {
  try {
    const imageId = decodeURIComponent(req.params.id);
    const getUser = await Image.find({ name: imageId });
    if (!getUser) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json(getUser);
  } catch (err) {
    res.status(400).json({ error: "Error fetching image", details: err });
  }
});




module.exports = router;
