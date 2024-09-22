export async function uploadImage(img,prompt,name) {
  try {
    const response = await fetch(
      "https://ai-chat-2411.onrender.com/api/store/imageGeneration",
      {
        method: "POST",
        body: JSON.stringify({ imgUrl: img, prompt: prompt, name: name }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image data.");
    }

    const { imgUrl } = await response.json();
    return imgUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw the error so it can be handled by the caller if needed
  }
}


export async function showImage(id) {
  const encodedId = encodeURIComponent(id); // This ensures any special characters, including spaces, are encoded
  try {
    const response = await fetch(
      `https://ai-chat-2411.onrender.com/api/store/getImage/${encodedId}`
    );

    if (!response.ok) {
      const error = new Error("An error occurred while fetching the image");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    const imageData = await response.json();
    return imageData;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
}


