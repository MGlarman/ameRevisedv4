// DonateSection.jsx
export default function DonateSection() {
  return (
    <section className="bg-[#8b5e3c] text-white py-6 px-6 text-center rounded-b-lg shadow-md mx-auto w-full max-w-[calc(100vw-4rem)] sm:max-w-[calc(100vw-8rem)] flex flex-col items-center gap-3">
      {/* SVG-ikon */}
      <div className="flex-shrink-0">
        <svg
          className="w-8 h-8 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      <h3 className="text-xl font-semibold mb-1">
        Støt mit arbejde
      </h3>
      <p className="mb-4 max-w-xl">
        Hvis du synes om siden, kan du støtte mig økonomisk, så jeg kan fortsætte med at dele gode bøger og inspiration.
      </p>
      <button className="bg-yellow-400 hover:bg-yellow-300 text-[#8b5e3c] font-bold py-2 px-5 rounded-md transition">
        Donate
      </button>
    </section>
  );
}
