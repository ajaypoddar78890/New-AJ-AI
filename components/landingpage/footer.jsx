"use client";
import Image from "next/image"; // Import Image for optimized image loading
import { useEffect, useState } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const year = new Date().getFullYear();
    setCurrentYear(year);
  }, []);

  return (
    <footer className="bg-gray-300 text-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 lg:px-10">
        <div className="flex items-center">
          <Image
          src="/assets/images/logo2.webp"
            alt="Left Logo"
            width={100}
            height={50}
          />
        </div>
        <div className="text-center">
          <p>© {currentYear} All Rights Reserved @AJ-AI</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
