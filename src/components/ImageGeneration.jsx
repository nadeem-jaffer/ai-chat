import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { uploadImage } from "../http";
import { useUser } from "@clerk/clerk-react";

export default function ImageGeneration() {
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usePropmt,setPrompt] = useState("");
  const [urlImg,setUrl] = useState("");
  const { isSignedIn, user, isLoaded } = useUser();
  const API_KEY = import.meta.env.VITE_GETIMG_API_KEY;
  

const { data, isPending, isError, error } = useQuery({
  queryKey: ["events",usePropmt],
  queryFn: () => uploadImage(urlImg,usePropmt,user.firstName),
  enabled: !!urlImg,
});


  async function handleImagePrompt(event) {
    event.preventDefault();
    setLoading(true);
    const fd = new FormData(event.target);
    const promptText = fd.get("prompt");

    const imageUrl = await fetchImageFromGetImgAI(promptText);
    
    setImageData((prevData) => [...prevData, { prompt: promptText, imageUrl }]);

    event.target.reset();
    setLoading(false);
    setPrompt(promptText);
    setUrl(imageUrl);
  }

  const fetchImageFromGetImgAI = async (prompt) => {
    const url = "https://api.getimg.ai/v1/stable-diffusion-xl/text-to-image";
    const body = JSON.stringify({
      prompt,
      width: 1024,
      height: 1024,
      output_format: "png",
      response_format: "url",
      model: "stable-diffusion-xl-v1-0",
    });

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col justify-between items-center p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg flex flex-col justify-between h-[600px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {imageData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-start">
                <div className="bg-blue-500 text-white max-w-xs p-3 rounded-lg shadow-md">
                  {item.prompt}
                </div>
              </div>
              <div className="flex justify-end">
                <img
                  src={item.imageUrl}
                  alt={`Generated from prompt: ${item.prompt}`}
                  className="max-w-xs p-3 rounded-lg shadow-md"
                />
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleImagePrompt}
          className="flex items-center p-4 bg-gray-200 rounded-b-lg"
        >
          <input
            type="text"
            id="prompt"
            name="prompt"
            placeholder="Describe your image..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 ease-in-out"
          />
          <button
            disabled={loading}
            type="submit"
            className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
          >
            {loading ? <p>Generating...</p> : <p>Generate</p>}
          </button>
        </form>
      </div>
    </div>
  );
}
