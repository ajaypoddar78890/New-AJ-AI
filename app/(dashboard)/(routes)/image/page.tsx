"use client"

import { useState } from 'react';

export default function ImageUploadPage() {
    const [imageBase64, setImageBase64] = useState<string | null>(null);

    const handleImageUpload = async (base64Image: string) => {
        try {
            const response = await fetch('/api/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageBase64: base64Image }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data); // Handle the data as needed
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result?.toString().split(',')[1]; // Get base64 string without header
                if (base64) {
                    setImageBase64(base64);
                    handleImageUpload(base64);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <h1>Upload an Image</h1>
            <input type="file" onChange={handleFileChange} />
        </div>
    );
}
