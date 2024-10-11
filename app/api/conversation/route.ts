// import { Configuration, OpenAIApi } from "openai";
// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { Models } from "openai/resources/models.mjs";

// // Initialize OpenAI configuration
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_KEY,
// });

// const openai = new OpenAIApi(configuration);

// // Define the POST request handler
// export async function POST(req: Request) {
//   try {
//     const { userId } = auth();

//     const body = await req.json();
//     const { messages } = body;

//     if (!userId) {
//       return new NextResponse("Unauthorisez ", { status: 401 });
//     }

//     if (!configuration.apiKey) {
//       return new NextResponse("OPENAI API Key is not configured", {
//         status: 401,
//       });
//     }
//     if (!messages) {
//       return new NextResponse("message are requred", { status: 400 });
//     }

//     const response = await openai.creatChatCompletion({
//       Model: "gpt-3.5-turbo",
//       messages,
//     });

//     console.log("Request body:", body);
//     console.log("User ID:", userId);
//   } catch (error) {
//     console.error(`Conversational error: ${error}`);
//     return new NextResponse("Internal server error", { status: 500 });
//   }
// }
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth(); // Clerk authentication, can be skipped if not needed

    const body = await req.json();
    const { messages } = body;

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!openai.apiKey) {
      return new NextResponse("OPENAI API Key is not configured", {
        status: 401,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // Using the `openai.chat.completions.create` method
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Make sure you're using the right model
      messages,
    });

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error(`Error: ${error}`);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
