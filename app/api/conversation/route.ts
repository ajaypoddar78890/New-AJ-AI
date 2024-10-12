import { GoogleGenerativeAI } from "@google/generative-ai"; // Correct import for Google Generative AI
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// Ensure GEMINIKEY is defined
if (!process.env.GEMINIKEY) {
  throw new Error("GEMINIKEY is not defined");
}

// Pass the API key directly as a string
const genAI = new GoogleGenerativeAI(process.env.GEMINIKEY); // Use your Google Gemini API key

export async function POST(req: Request) {
  try {
    const { userId } = auth(); // Clerk authentication, can be skipped if not needed

    const body = await req.json();
    const { messages } = body;

    // Uncomment if user authentication is needed
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!genAI.apiKey) {
      return new NextResponse("GEMINI API Key is not configured", {
        status: 401,
      });
    }

    if (!messages || messages.length === 0) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // Using the `getGenerativeModel` method to generate content
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Ensure you're using the right model

    // Prepare the prompt
    const prompt = messages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n"); // Format messages into a single prompt

    const result = await model.generateContent(prompt);

    return new NextResponse(
      JSON.stringify({ response: result.response.text() }),
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error: ${error}`);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
