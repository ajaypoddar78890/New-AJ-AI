"use client";

import { useState } from "react";
import axios from "axios";
import { z } from "zod";

// Your Zod schema for validating the form
export const formSchema = z.object({
  prompt: z
    .string()
    .min(1, { message: "Prompt must be at least 1 character long." })
    .max(500, { message: "Prompt must not exceed 500 characters." })
    .transform((val) => val.trim())
    .refine((val) => val.length > 0, {
      message: "Prompt cannot be empty after trimming.",
    }),
});

const Image = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setValidationError("");

    // Validate the input using Zod schema
    const validationResult = formSchema.safeParse({ prompt });

    if (!validationResult.success) {
      setValidationError(validationResult.error.format().prompt?._errors[0]);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/image", {
        prompt,
      });
      setImageUrl(response.data.imageUrl); // Assuming the API returns the image URL
    } catch (err) {
      setError("Error generating image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter image description"
          className="border p-2 w-full"
        />
        {validationError && <p className="text-red-500">{validationError}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          Generate Image
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Generated Image" className="w-full" />
        </div>
      )}
    </div>
  );
};

export default Image;
