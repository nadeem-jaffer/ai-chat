# Paint Night Inspiration Bot

by Alec Malenfant
and Nadeem Mahommed

# User Experience

For this application, users will either upload an existing image file and/or upload a picture taken from the device’s camera. These images can be uploaded into two categories : reference and inspiration. As long as one image is uploaded, the program can run. Next, the user will have the option to add any inspiration keywords to a text input box.

After hitting the “generate” button, the program will return a description or the uploaded image along with a confidence score. A new image will then be generated from the reference image, inspiration image(s), and any inspiration keywords. The image generation model will be encouraged to be similar to the reference image. This makes it more likely that the output image will be something useful that the artist can actually add to their canvas. However, the model will also be encouraged to add unexpected elements to bring something different that the amateur artist can enjoy. Paint-Night-Inspiration-Bot is designed to make wacky and bold images that bring something new to the canvas with every image generated.

# Current State of Development

Both Google's Gemini API and Microsoft's image description API have been implemented. When the development server is run, the user sees a mostly default react + vite start screen. However, there are two buttons in the middle of the screen that test the previously mentioned APIs.

Microsoft's image description API describes an image of a child and an adult skating at a skate park. When the test button is pressed, the API outputs the AI description and the confidence score into the console.

Google's Gemini API is currently prompted to "Write a story about a magic backpack." The output will be printed to the console

The third and final API to implement is the getimg.ai image generation API

# Quick Start

## Dependencies

Install the needed dependencies by running these commands in the terminal :

```
  npm install
  npm install @google/generative-ai
  npm install @azure/cognitiveservices-computervision
  npm install async
```

## API Key Environment Variables

The API keys are stored as environment variables in a ".env.local" file in the root directory.
If no such file exist, create that file and create value-key pairs with the following values :

```
VITE_GEMINI_API_KEY="YOUR-KEY"
VITE_AZURE_VISION_KEY="YOUR-KEY"
VITE_AZURE_VISION_ENDPOINT="YOUR-ENDPOINT"
```

## Start Development Server

```
 npm run dev
```
