import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

const App = () => {
  const [showContent, setShowContent] = useState(false);
  const mainRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setShowContent(true),
    });

    tl.to(".vi-mask-group", {
      rotate: 15,
      duration: 2,
      ease: "power4.inOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 12,
      opacity: 0,
      duration: 2,
      ease: "expo.inOut",
      transformOrigin: "50% 50%",
    });
  }, []);

  useGSAP(
    () => {
      if (!showContent || !mainRef.current) return;

      gsap.to(".main", {
        scale: 1,
        rotate: 0,
        duration: 2,
        ease: "expo.inOut",
      });

      gsap.to([".sky", ".bg", ".text", ".character"], {
        scale: 1,
        rotate: 0,
        duration: 2,
        delay: -1.1,
        ease: "expo.inOut",
      });

      gsap.to(".character", {
        bottom: "-12%",
        scale: 1.25,
        delay: -1.5,
      });

      const handler = (e) => {
        const moveX = (e.clientX / window.innerWidth - 0.5) * 20;

        gsap.to(".text", { x: moveX * 0.6, duration: 0.4, ease: "power3.out" });
        gsap.to(".character", { x: moveX * 0.4, duration: 0.4, ease: "power3.out" });
        gsap.to(".bg", { x: moveX * 0.25, duration: 0.4, ease: "power3.out" });
        gsap.to(".sky", { x: moveX * 0.15, duration: 0.4, ease: "power3.out" });
      };

      const el = mainRef.current;
      el.addEventListener("mousemove", handler);
      return () => el.removeEventListener("mousemove", handler);
    },
    { dependencies: [showContent] }
  );

  return (
    <>
      {!showContent && (
        <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            <defs>
              <mask id="viMask">
                <rect width="100%" height="100%" fill="black" />
                <g className="vi-mask-group">
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="240"
                    fontFamily="Arial Black"
                  >
                    VI
                  </text>
                </g>
              </mask>
            </defs>
            <image href="/bg.jpg" width="100%" height="100%" mask="url(#viMask)" />
          </svg>
        </div>
      )}

      {showContent && (
        <div
          ref={mainRef}
          className="main w-full scale-[1.4] rotate-[-10deg] origin-center overflow-hidden"
        >
          <div className="relative w-full h-screen bg-black overflow-hidden">

            <div className="absolute top-0 left-0 w-full px-8 py-6 z-20">
              <div className="flex items-center gap-4 text-white">
                <div className="flex flex-col gap-1">
                  <span className="w-8 h-1 bg-white"></span>
                  <span className="w-6 h-1 bg-white"></span>
                  <span className="w-4 h-1 bg-white"></span>
                </div>
                <h3 className="text-2xl tracking-wide">Rockstar</h3>
              </div>
            </div>

            <img
              src="/sky.png"
              className="sky absolute inset-0 w-full h-full object-cover scale-[1.5] rotate-[-20deg]"
            />
            <img
              src="/bg.jpg"
              className="bg absolute inset-0 w-full h-full object-cover scale-[1.8] rotate-[-5deg]"
            />

            <div className="text absolute top-24 left-1/2 -translate-x-1/2 text-white scale-[1.4] rotate-[-20deg] text-center z-10">
              <h1 className="text-[10vw] leading-none">grand</h1>
              <h1 className="text-[8vw] leading-none">theft</h1>
              <h1 className="text-[10vw] leading-none">auto</h1>
            </div>

            <img
              src="/boybg.png"
              className="character absolute left-1/2 -translate-x-1/2 -bottom-[120%] scale-[3] rotate-[-20deg]"
            />

            <div className="absolute bottom-0 w-full px-6 py-8 text-white bg-gradient-to-t from-black z-20">
              <div className="flex items-center gap-2">
                <i className="ri-arrow-down-line text-3xl"></i>
                <span>Scroll Down</span>
              </div>
              <img src="/ps5.png" className="h-10 mx-auto mt-4" />
            </div>
          </div>

          <div className="w-full min-h-screen bg-black flex items-center justify-center px-6">
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 text-white">
              <img src="/imag.png" className="w-full object-contain" />
              <div className="py-10">
                <h1 className="text-5xl mb-4">Still Chasing</h1>
                <h1 className="text-4xl mb-6">Not Getting</h1>
                <p className="text-lg opacity-80 font-[Helvetica_Now_Display]">
                  A city built on ambition, crime, and desire. Every street hides
                  a secret, every corner tells a story. In a world where power
                  decides everything, your choices define who you become.
                  Welcome to a place where legends are not born — they are taken.
                </p>
                <p className="text-lg opacity-80 font-[Helvetica_Now_Display] mt-3">
                  Step into a city driven by crime, power, and ambition.
                </p>
                <button className="mt-8 bg-amber-400 text-black px-8 py-4 text-xl transition-all duration-300 hover:bg-black hover:text-amber-400 hover:scale-105">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
