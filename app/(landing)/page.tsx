import Header from "../../components/landingpage/header";
import Hero from "../../components/landingpage/Hero";
import HoverCard from "@/components/landingpage/hover-cards";
import Solution from "@/components/landingpage/solution";
import Aipowerd from "@/components/landingpage/aipowerd";
import Price from "@/components/landingpage/price";
import FAQSection from "@/components/landingpage/faq";
import { GoogleGeminiEffectDemo } from "@/components/landingpage/google";
import { TimelineDemo } from "@/components/landingpage/timeline";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <HoverCard />
      <Solution />
      <Price />
      <Aipowerd />
      <FAQSection />
      <GoogleGeminiEffectDemo />
      <TimelineDemo />
    </div>
  );
}
