import { NextResponse } from "next/server";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import Busboy from "busboy";

export const config = {
  api: {
    bodyParser: false, // Disables the default body parser
  },
};

export async function POST(req: Request) {
  const busboy = new Busboy({ headers: req.headers });
  const uploadsDir = "E:/tmp"; // Change to your preferred directory

  // Create the uploads directory if it doesn't exist
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    let filePath;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      filePath = path.join(uploadsDir, filename); // Full path for the uploaded file
      const writeStream = fs.createWriteStream(filePath);
      file.pipe(writeStream);

      writeStream.on("finish", () => {
        console.log(`File [${fieldname}] finished uploading: ${filename}`);
      });

      writeStream.on("error", (error) => {
        console.error("Error writing file:", error);
        reject(
          NextResponse.json(
            { error: "Error processing the file" },
            { status: 500 }
          )
        );
      });
    });

    busboy.on("finish", async () => {
      try {
        const fileManager = new GoogleAIFileManager(process.env.API_KEY);

        // Upload image using the File API
        const uploadResult = await fileManager.uploadFile(filePath, {
          mimeType: "image/jpeg",
          displayName: path.basename(filePath),
        });

        console.log(
          `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`
        );

        // Analyze Image using Google Generative AI
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent([
          "Tell me about this image.",
          {
            fileData: {
              fileUri: uploadResult.file.uri,
              mimeType: "image/jpeg",
            },
          },
        ]);

        resolve(
          NextResponse.json({ result: result.response.text() }, { status: 200 })
        );
      } catch (error) {
        console.error("Error generating image info:", error);
        resolve(
          NextResponse.json({ error: "Internal server error" }, { status: 500 })
        );
      }
    });

    req.pipe(busboy);
  });
}
