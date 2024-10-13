import { GoogleGenerativeAI } from "@google/generative-ai"; // Correct import for Google Generative AI
import { NextResponse } from "next/server";

// Ensure GEMINIKEY is defined
if (!process.env.GEMINIKEY) {
  throw new Error("GEMINIKEY is not defined");
}

// Pass the API key directly as a string
const genAI = new GoogleGenerativeAI(process.env.GEMINIKEY); // Use your Google Gemini API key

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt: string = body.prompt; // Get the prompt from the request body

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    // Using the `getGenerativeModel` method to generate the image
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Ensure you're using the right model

    // Prepare the request for image generation
    const result = await model.generateImage(prompt);

    // Log the result for debugging
    console.log("API Result:", JSON.stringify(result, null, 2)); // Log the entire result

    // Check if the result contains the image URL
    if (result.response && result.response.image_url) {
      return new NextResponse(
        JSON.stringify({ imageUrl: result.response.image_url }),
        {
          status: 200,
        }
      );
    } else {
      return new NextResponse("No image generated", { status: 500 });
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
