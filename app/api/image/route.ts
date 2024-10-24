import { NextResponse } from "next/server";
import vision from "@google-cloud/vision";

// Create a client instance for Google Cloud Vision
const client = new vision.ImageAnnotatorClient();

// Handle POST requests
export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json(); // Parse the JSON body
    const [result] = await client.objectLocalization({
      image: { content: imageBase64 },
    });

    const objects = result.localizedObjectAnnotations.map((obj) => ({
      name: obj.name,
      score: obj.score,
    }));

    return NextResponse.json({ objects });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
