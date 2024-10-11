import React from "react";
import Image from "next/image";

const AIPowerd = () => {
  return (
    <div className="aipowed-section px-10 py-10">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-10">
        
          <div className="left w-full relative" style={{ height: "500px" }}>
        
            <Image
              alt="ai-powered-image"
              src="/assets/images/aipowerdimg.webp"
              layout="fill"
              objectFit="cover"
              className="object-cover"
            />
          </div>

          {/* Right Side: Content */}
          <div className="right w-full flex flex-col justify-center">
            <div className="content p-6 bg-red-600 text-white">
              <h2 className="text-3xl font-bold mb-4">
                AI-powered to streamline tasks
              </h2>
              <p className="text-lg">
                As your business grows or your AI SaaS needs change, you can
                easily adjust your subscription level to match those needs. This
                flexibility ensures that AI remains an asset.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPowerd;
