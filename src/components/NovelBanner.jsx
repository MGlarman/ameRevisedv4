import React from 'react';
import dustjacket from '../assets/images/dustjacket.JPG';

export default function NovelBanner() {
  return (
    <section className="mt-10 w-full max-w-7xl mx-auto px-6">
      <div
        className="relative overflow-hidden border-t-4 border-b-4 border-double border-white shadow-2xl min-h-[250px] sm:min-h-[300px] md:min-h-[350px]"
        style={{
          backgroundImage: `url(${dustjacket})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-start justify-center gap-4 px-6 py-6 md:px-10 md:py-10 max-w-lg">
          <h2 className="text-2xl md:text-3xl font-[Fredericka_the_Great] text-[#ffdf91] drop-shadow-lg mb-2 uppercase">
            The Latest Novel
          </h2>
          <p className="mb-2 text-[#ddd] leading-relaxed text-sm md:text-base">
            A dark, thrilling journey into the unknown. Courage, madness, and mysteries await...
          </p>
          <button className="mt-1 px-6 py-2 text-base font-bold uppercase rounded-md bg-[#ff0055] text-white hover:bg-[#ff3366] shadow-md transition">
            Donate Now
          </button>
        </div>
      </div>
    </section>
  );
}
