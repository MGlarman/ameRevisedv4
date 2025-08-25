// WelcomeSection.jsx
export default function WelcomeSection() {
  return (
    <section className="bg-yellow-100 text-yellow-900 py-6 px-6 rounded-t-lg w-full max-w-[calc(100vw-4rem)] sm:max-w-[calc(100vw-8rem)] mx-auto text-center sm:text-left font-semibold shadow-md flex flex-col sm:flex-row items-center gap-4">
      {/* SVG Icon */}
      <div className="flex-shrink-0">
        <svg
          className="w-10 h-10 text-yellow-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 2H9C7.897 2 7 2.897 7 4v16c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM9 4h10v16H9V4zm-4 2h2v14H5V6z"/>
        </svg>
      </div>

      {/* Text */}
      <p className="text-lg sm:text-xl">
        Welcome to AmeRevised! This is the home of my magazine, the Strange Encounters Magazine. Here, you will also find exciting books, reviews, and inspiration.
        <br />
        <br />
        Let’s embark on a journey through the world of literature together.
      </p>
    </section>
  );
}
