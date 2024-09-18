import React, { useState } from "react";
import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";

const key = import.meta.env.VITE_AZURE_VISION_KEY;
const endpoint = import.meta.env.VITE_AZURE_VISION_ENDPOINT;

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
  endpoint
);

export default function AzureImageDescription() {
  const [imageFile, setImageFile] = useState(null);
  const [descriptionData, setDescriptionData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImageDescription = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!imageFile) {
      alert("Please upload an image file.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await computerVisionClient.analyzeImageInStream(
        imageFile,
        { visualFeatures: ["Description"] }
      );

      const descriptionText = response.description.captions[0].text;
      const confidence = response.description.captions[0].confidence;

      setDescriptionData((prevData) => [
        ...prevData,
        {
          user: "Uploaded Image",
          response: `${descriptionText} (Confidence: ${confidence})`,
        },
      ]);
    } catch (error) {
      console.error("Error fetching image description:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col justify-between items-center p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg flex flex-col justify-between h-[600px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {descriptionData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-start">
                <div className="bg-blue-500 text-white max-w-xs p-3 rounded-lg shadow-md">
                  {item.user}
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-gray-300 text-black max-w-xs p-3 rounded-lg shadow-md">
                  {item.response}
                </div>
              </div>
            </div>
          ))}
        </div>
        <label className="text-gray-700 font-semibold mb-2">
          Please Upload JPG/PNG file
        </label>
        <form
          onSubmit={getImageDescription}
          className="flex items-center p-4 bg-gray-200 rounded-b-lg"
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 ease-in-out"
          />
          <button
            disabled={loading}
            type="submit"
            className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
          >
            {loading ? <p>Loading...</p> : <p>Describe Image</p>}
          </button>
        </form>
      </div>
    </div>
  );
}
