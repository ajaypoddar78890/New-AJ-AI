import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Models } from "openai/resources/models.mjs";

// Initialize OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,  
});

const openai = new OpenAIApi(configuration);

// Define the POST request handler
export async function POST(req: Request) {
  try {
    
    const { userId } = auth();

    
    const body = await req.json();
    const {messages} = body;

    if(!userId){
        return new NextResponse("Unauthorisez ", {status:401})
    }

    if(!configuration.apiKey){
        return new NextResponse("OPENAI API Key is not configured", {status:401})
    }
    if(!messages){
        return new NextResponse("message are requred", {status:400})
    }
    
    const response = await  openai.creatChatCompletion({
        Model:"gpt-3.5-turbo",
        messages
    })
    
    console.log("Request body:", body);
    console.log("User ID:", userId);

    
    

    

  } catch (error) {
    console.error(`Conversational error: ${error}`);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
