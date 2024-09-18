import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Gemini() {
  const [promptData, setPrompt] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  async function userPromt(event) {
    event.preventDefault();
    setLoading(true);
    const fd = new FormData(event.target);
    const promt1 = fd.get("prompt");

    const response = await testGeminiAPI(promt1);
    setPrompt((prevData) => [...prevData, { user: promt1, response }]);

    event.target.reset();
    setLoading(false);
  }

  const testGeminiAPI = async (prompt) => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const result = await model.generateContent(prompt);

    const responseText = await result.response.text();
    console.log(responseText);

    return responseText;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col justify-between items-center p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg flex flex-col justify-between h-[600px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {promptData.map((item, index) => (
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
        <form
          onSubmit={userPromt}
          className="flex items-center p-4 bg-gray-200 rounded-b-lg"
        >
          <input
            type="text"
            id="prompt"
            name="prompt"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 ease-in-out"
          />
          <button
            disabled={loading}
            type="submit"
            className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
          >
            {loading ? <p>Sending...</p> : <p>Send</p>}
          </button>
        </form>
      </div>
    </div>
  );
}
