import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { showImage } from "../http";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isSignedIn, user, isLoaded } = useUser();

  // Fetching the images using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["images", user?.firstName],
    queryFn: () => showImage(user.firstName),
    enabled: isLoaded && isSignedIn, // Only fetch when user is loaded and signed in
  });

  console.log("Fetched data:", data); // Log the fetched data to check the structure

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const carouselItems = data || []; // Using fetched data

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const generateMoreImages = () => {
    // Your logic for generating more images
    console.log("Generating more images...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col justify-center items-center p-4">
      <div className="text-center mb-4">
        <h1 className="text-4xl text-white font-bold">
          Your Previous Generated Images
        </h1>
        <Link to="/image">
          <button
            onClick={generateMoreImages}
            className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition mt-2"
          >
            Generate More
          </button>
        </Link>
      </div>
      <div className="w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {carouselItems.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0 relative">
                <img
                  src={item.imgUrl || "https://via.placeholder.com/800x400"}
                  alt={item.name || "Image"}
                  className="w-full h-[400px] object-contain"
                />
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                  <p className="text-white text-3xl font-semibold text-center px-4">
                    {item.prompt || "Slide"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
          style={{ zIndex: 10 }}
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
          style={{ zIndex: 10 }}
        >
          &#10095;
        </button>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {carouselItems.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
