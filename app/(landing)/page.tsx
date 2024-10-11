import Header from "../../components/landingpage/header";
import Hero from "../../components/landingpage/Hero";
import HoverCard from "@/components/landingpage/hover-cards";
import Solution from "@/components/landingpage/solution";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <HoverCard />
      <Solution />
    </div>
  );
}
