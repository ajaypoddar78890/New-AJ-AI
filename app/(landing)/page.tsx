import Header from "../../components/landingpage/header";
import Hero from "../../components/landingpage/Hero";
import HoverCard from "@/components/landingpage/hover-cards";
import Solution from "@/components/landingpage/solution";
import Aipowerd from "@/components/landingpage/aipowerd";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <HoverCard />
      <Solution />
      <Aipowerd />
    </div>
  );
}
