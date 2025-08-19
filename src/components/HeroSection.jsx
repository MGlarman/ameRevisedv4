import React, { useState, useEffect } from "react";
import udgave1 from "../assets/images/udgave1.JPG";
import udgave2 from "../assets/images/udgave2.JPG";
import udgave3 from "../assets/images/udgave3.JPG";
import herosectimage from "../assets/images/herosectimage.JPG";

export default function HeroSection() {
  const [latestIssue, setLatestIssue] = useState(null);

  const issues = [
    { id: 1, file: "/magazines/1.pdf" },
    { id: 2, file: "/magazines/2.pdf" },
    { id: 3, file: "/magazines/3.pdf" },
  ];

  useEffect(() => {
    async function findLatestIssue() {
      // Tjek udgaver fra laveste til højeste
      for (let i = 0; i < issues.length; i++) {
        try {
          const res = await fetch(issues[i].file, { method: "HEAD" });
          if (res.ok) {
            setLatestIssue(issues[i].id);
            break; // Stop ved første eksisterende PDF
          }
        } catch (err) {
          // PDF findes ikke
        }
      }
    }
    findLatestIssue();
  }, []);

  return (
    <section
      className="relative w-full min-h-[320px] sm:min-h-[400px] md:min-h-[500px] flex items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: `url(${herosectimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      aria-label="Hero Section med nyeste magasiner og navigationsknapper"
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-10"></div>

      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl w-full px-4 sm:px-6 py-6 sm:py-10 text-center md:text-left bg-black bg-opacity-30 rounded-xl shadow-xl backdrop-blur-md border border-white/10">
        
        <div className="relative flex items-center justify-center">
          <a href="/reader/1" className="relative block transform -rotate-12 -translate-y-2 -mr-12">
            <img src={udgave1} alt="Magasin Udgave 1" className="w-36 sm:w-48 md:w-56 rounded-lg shadow-2xl ring-2 ring-white/20 transition-transform duration-300 hover:scale-110 hover:z-20" />
          </a>
          <a href="/reader/2" className="relative z-10 block transform rotate-2 translate-y-3">
            <img src={udgave2} alt="Magasin Udgave 2" className="w-40 sm:w-52 md:w-60 rounded-lg shadow-2xl ring-2 ring-white/30 transition-transform duration-300 hover:scale-110 hover:z-20" />
          </a>
          <a href="/reader/3" className="relative block transform rotate-10 -translate-y-4 -ml-12">
            <img src={udgave3} alt="Magasin Udgave 3" className="w-36 sm:w-48 md:w-56 rounded-lg shadow-2xl ring-2 ring-white/20 transition-transform duration-300 hover:scale-110 hover:z-20" />
          </a>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 w-full max-w-xs md:max-w-none justify-center md:justify-start">
          <a
            href="/magazine-archive"
            className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 shadow-md hover:shadow-lg backdrop-blur-sm w-full md:w-auto text-center"
          >
            Arkiv
          </a>

          {latestIssue && (
            <a
              href={`/reader/${latestIssue}`} // Dynamisk link til reader
              className="bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-6 py-3 rounded-lg font-semibold tracking-wide text-white shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300/50 w-full md:w-auto text-center"
            >
              Se Nyeste Udgave
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
