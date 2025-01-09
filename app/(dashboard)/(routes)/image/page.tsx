// "use client";
// import { useState } from "react";
// import Image from "next/image";

// // Define types
// interface Concept {
//   name: string;
//   score: number;
// }

// interface Results {
//   concepts: Concept[];
// }

// export default function ImageUpload() {
//   const [image, setImage] = useState<File | null>(null);
//   const [results, setResults] = useState<Results | null>(null);

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const file = e.target.files[0];
//       const reader = new FileReader();

//       reader.onloadend = async () => {
//         const base64data = reader.result?.toString().split(",")[1]; // Extract base64 string
//         if (base64data) {
//           const res = await fetch("/api/image", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ imageBase64: base64data }),
//           });

//           const data: Results = await res.json();
//           setResults(data);
//         }
//       };

//       reader.readAsDataURL(file);
//       setImage(file);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-5">
//       <h1 className="text-2xl font-bold mb-4">
//         Image Upload for Tree Identification
//       </h1>
//       <p className="mb-6 text-gray-700">
//         Transforming Images into Insights with AI. With Clarifai, you can
//         leverage advanced artificial intelligence to analyze and understand
//         images effortlessly. This powerful tool not only identifies objects and
//         concepts within images but also provides descriptive insights that can
//         enhance your projects and decision-making processes.
//       </p>
//       <input
//         type="file"
//         onChange={handleImageUpload}
//         className="mb-4 border-2 border-gray-300 p-2 rounded"
//       />
//       {image && (
//         <Image
//           width={500}
//           height={500}
//           src={URL.createObjectURL(image)}
//           alt="Uploaded"
//           className="mb-4 w-64 h-64 object-cover border rounded"
//         />
//       )}
//       {results && (
//         <div className="bg-gray-100 p-4 rounded shadow-md w-full max-w-lg">
//           <h3 className="text-xl font-semibold mb-2">Results:</h3>
//           <ul className="list-disc list-inside">
//             {results.concepts.map((concept, index) => (
//               <li key={index} className="mb-1">
//                 <strong>{concept.name}</strong> (Confidence:{" "}
//                 {(concept.score * 100).toFixed(2)}%)
//               </li>
//             ))}
//           </ul>
//           <div className="mt-4">
//             <h4 className="text-lg font-semibold">Additional Details:</h4>
//             <p>
//               {/* Replace with actual data from your results or an API call */}
//               Description about the identified tree will go here.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
