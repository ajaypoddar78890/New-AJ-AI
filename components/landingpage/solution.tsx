import React, { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Solution = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animation for the left divs (slide from left)
    gsap.from(".left", {
      x: -200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".left",
        start: "top 80%", // Start the animation when 80% of the div is in view
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    // Animation for the right divs (slide from right)
    gsap.from(".right", {
      x: 200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".right",
        start: "top 80%", // Start the animation when 80% of the div is in view
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div className="solution-section py-20 ">
      <div className="container mx-auto px-10">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="left w-full h-auto">
            <Image
              alt="left image"
              src="/assets/images/content-image-1.webp"
              layout="responsive"
              width={700}
              height={600}
              className="object-cover"
            />
          </div>
          <div className="right w-full h-auto flex flex-col pt-10 px-6 md:px-12">
            <h2 className="text-2xl md:text-6xl font-bold mb-8">
              Accessible to a wider audience
            </h2>
            <p className="text-lg font-medium mb-4">
              Advanced AI capabilities accessible to a broader audience,
              including small & medium-sized businesses and individuals who may
              not have the resources or expertise to develop.
            </p>
            <p className="text-lg">
              Our platform enables users to leverage cutting-edge AI technology
              to solve complex problems without requiring technical expertise.
            </p>
          </div>
          <div className="right w-full h-auto flex flex-col pt-10 px-6 md:px-12">
            <h2 className="text-2xl md:text-6xl font-bold mb-8">
              Accessible to a wider audience
            </h2>
            <p className="text-lg font-medium mb-4">
              Advanced AI capabilities accessible to a broader audience,
              including small & medium-sized businesses and individuals who may
              not have the resources or expertise to develop.
            </p>
            <p className="text-lg">
              Our platform enables users to leverage cutting-edge AI technology
              to solve complex problems without requiring technical expertise.
            </p>
          </div>
          <div className="left w-full h-auto">
            <Image
              alt="left image"
              src="/assets/images/content-image-1.webp"
              layout="responsive"
              width={700}
              height={600}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solution;
