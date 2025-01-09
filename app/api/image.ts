// import type { NextApiRequest, NextApiResponse } from "next";
// import vision from "@google-cloud/vision";

// const client = new vision.ImageAnnotatorClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     try {
//       const { imageBase64 } = req.body;

//       // Check if imageBase64 is provided
//       if (!imageBase64) {
//         return res.status(400).json({ error: "Image base64 string is required." });
//       }

//       const [result] = await client.objectLocalization({
//         image: { content: imageBase64 },
//       });

//       // Check if result is valid
//       if (!result || !result.localizedObjectAnnotations) {
//         return res.status(500).json({ error: "Failed to process image." });
//       }

//       const objects = result.localizedObjectAnnotations.map((obj) => ({
//         name: obj.name,
//         score: obj.score,
//       }));

//       res.status(200).json({ objects });
//     } catch (error) {
//       console.error("Error processing image:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }
