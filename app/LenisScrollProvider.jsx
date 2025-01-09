// "use client";
// import { useEffect } from "react";
// import Lenis from "@studio-freight/lenis";

// export default function LenisScrollProvider() {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.8,
//       easing: (t) => 1 - Math.pow(1 - t, 3),
//       smoothWheel: true,
//       smooth: true,
//       smoothTouch: true,
//       direction: "vertical",
//       lerp: 0.1,
//     });

//     console.log("Lenis initialized:", lenis);

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);
//     lenis.start();

//     // Confirm that the RAF function is running
//     console.log("Lenis smooth scroll active");

//     return () => {
//       lenis.stop();
//       lenis.destroy();
//     };
//   }, []);

//   return null;
// }
