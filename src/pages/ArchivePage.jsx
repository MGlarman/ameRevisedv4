import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import udgave1 from "../assets/images/udgave1.JPG";
import udgave2 from "../assets/images/udgave2.JPG";
import udgave3 from "../assets/images/udgave3.JPG";

export default function ArchivePage() {
  const magazines = [
    { id: 1, title: "Strange Encounters – Udgave 1", date: "Januar 2023", cover: udgave1, hasPdf: true },
    { id: 2, title: "Strange Encounters – Udgave 2", date: "April 2023", cover: udgave2, hasPdf: false },
    { id: 3, title: "Strange Encounters – Udgave 3", date: "August 2023", cover: udgave3, hasPdf: false },
  ];

  return (
    <>
      <main className="w-full max-w-screen-xl mx-auto px-6 py-12" style={{ backgroundColor: "#8b5e3c" }}>
        <h1 className="text-4xl md:text-5xl font-heading text-center text-[#ffdf91] drop-shadow-lg mb-16 uppercase">
          Magasin-Arkiv
        </h1>

        <div className="flex flex-col gap-12">
          {magazines.map((mag) => (
            <article
              key={mag.id}
              className="relative flex flex-col md:flex-row items-center bg-[#1e1e1e]/80 border-2 border-white/60 hover:border-white transition duration-300 overflow-hidden max-w-4xl w-full mx-auto"
            >
              {/* Cover billede */}
              <div className="relative w-full md:w-48 h-72">
                <img
                  src={mag.cover}
                  alt={mag.title}
                  className="w-full h-full object-cover shadow-md"
                />

                {!mag.hasPdf && (
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-red-600 text-white font-bold text-2xl md:text-3xl px-6 py-3 shadow-lg whitespace-nowrap">
                    Coming Soon
                  </span>
                )}
              </div>

              {/* Tekstindhold */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left p-6 md:p-10 flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-[#ffdf91] mb-3">
                  {mag.title}
                </h2>
                <p className="text-base text-gray-300 mb-6 italic">{mag.date}</p>
                
                {mag.hasPdf && (
                  <Link
                    to={`/reader/${mag.id}`}
                    className="inline-block px-6 py-3 text-lg font-semibold bg-[#ff0055] text-white shadow-md hover:bg-[#ff3366] transition"
                  >
                    Læs mere
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Hvid kant mellem magasiner og footer */}
        <div className="border-t border-white mt-12"></div>
      </main>

      <Footer />
    </>
  );
}
