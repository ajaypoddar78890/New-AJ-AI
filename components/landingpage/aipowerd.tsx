import React from "react";
import Image from "next/image";

const AIPowerd = () => {
  return (
    <div className="aipowed-section px-10 py-10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-[40%,60%] rounded-[5rem] overflow-hidden">
          {" "}
          {/* Added overflow-hidden */}
          {/* Left Side: Image */}
          <div className="left relative" style={{ height: "500px" }}>
            <Image
              alt="ai-powered-image"
              src="/assets/images/aipowerdimg.webp"
              layout="fill"
              objectFit="cover"
              className="object-cover"
            />
          </div>
          {/* Right Side: Content */}
          <div className="right w-full flex flex-col">
            <div
              className="content p-6 bg-black text-white h-full rounded-xl md:rounded-l-none py-10 border-b border-white"
              style={{ minHeight: "200px" }}
            >
              <h2 className="text-6xl font-bold my-4">
                AI-powered to streamline tasks
              </h2>
              <p className="text-md">
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
