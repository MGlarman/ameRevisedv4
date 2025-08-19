import React, { useState, useEffect } from "react";

// Import images
import philosophersStone from "../assets/images/digital-bookshelf/rowling-philosophers-stone.jpg";
import chamberOfSecrets from "../assets/images/digital-bookshelf/rowling-chamber-of-secrets.jpg";
import prisonerOfAzkaban from "../assets/images/digital-bookshelf/rowling-prisoner-of-azkaban.jpg";
import gobletOfFire from "../assets/images/digital-bookshelf/rowling-goblet-of-fire.jpg";
import orderOfPhoenix from "../assets/images/digital-bookshelf/rowling-order-of-phoenix.jpg";
import halfBloodPrince from "../assets/images/digital-bookshelf/rowling-half-blood-prince.jpg";
import deathlyHallows from "../assets/images/digital-bookshelf/rowling-deathly-hallows.jpg";

import gunslinger from "../assets/images/digital-bookshelf/king-gunslinger.jpg";
import drawingOfThree from "../assets/images/digital-bookshelf/king-drawing-of-three.jpg";
//import wasteLands from "../assets/images/digital-bookshelf/king-waste-lands.jpg";
import wizardAndGlass from "../assets/images/digital-bookshelf/king-wizard-glass.jpg";
import wolvesOfCalla from "../assets/images/digital-bookshelf/king-wolves-of-calla.jpg";
import songOfSusannah from "../assets/images/digital-bookshelf/king-song-of-susannah.jpg";
import darkTower from "../assets/images/digital-bookshelf/king-dark-tower.jpg";
import doctorSleep from "../assets/images/digital-bookshelf/king-doctor-sleep.jpg";

import doloresClaiborne from "../assets/images/digital-bookshelf/king-dolores-claiborne.jpg";
import everythingsEventual from "../assets/images/digital-bookshelf/king-everythings-eventual.jpg";
import fairytale from "../assets/images/digital-bookshelf/king-fairytale.jpg";

import goodOmens from "../assets/images/digital-bookshelf/gaiman-pratchett-good-omens.jpg";
import thisIsACall from "../assets/images/digital-bookshelf/grohl-this-is-a-call.jpg";
import sapiens from "../assets/images/digital-bookshelf/harari-sapiens.jpg";
import histories from "../assets/images/digital-bookshelf/herodotus-histories.jpg";



// Import more images here as needed

export default function Bookshelf() {
  const myBooks = [
        {
      title: "The Gunslinger",
      author: "Stephen King: The Dark Tower",
      cover: gunslinger,
    },
            {
      title: "The Drawing of Three",
      author: "Stephen King: The Dark Tower",
      cover: drawingOfThree,
    },
        {
      title: "Wizard & Glass",
      author: "Stephen King: The Dark Tower",
      cover: wizardAndGlass,
    },
            {
      title: "Wolves of the Calla",
      author: "Stephen King: The Dark Tower",
      cover: wolvesOfCalla,
    },
        {
      title: "Song of Susannah",
      author: "Stephen King: The Dark Tower",
      cover: songOfSusannah,
    },
        {
      title: "The Dark Tower",
      author: "Stephen King: The Dark Tower",
      cover: darkTower,
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      cover: philosophersStone,
    },
        {
      title: "Harry Potter and the Chamber of Secrets",
      author: "J.K. Rowling",
      cover: chamberOfSecrets,
    },
        {
      title: "Harry Potter and the Prisoner of Azkaban",
      author: "J.K. Rowling",
      cover: prisonerOfAzkaban,
    },
        {
      title: "Harry Potter and the Goblet of Fire",
      author: "J.K. Rowling",
      cover: gobletOfFire,
    },
        {
      title: "Harry Potter and the Order of the Phoenix",
      author: "J.K. Rowling",
      cover: orderOfPhoenix,
    },
            {
      title: "Harry Potter and the Half-Blood Prince",
      author: "J.K. Rowling",
      cover: halfBloodPrince,
    },
        {
      title: "Harry Potter and the Deathly Hallows",
      author: "J.K. Rowling",
      cover: deathlyHallows,
    },
    // ...add more books with imported covers
  ];

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) setItemsPerPage(2); // mobile
    else if (width < 1024) setItemsPerPage(3); // tablet
    else setItemsPerPage(5); // desktop
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(myBooks.length / itemsPerPage);

  const handlePrev = () =>
    setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  const handleNext = () =>
    setPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));

  const startIndex = page * itemsPerPage;
  const currentBooks = myBooks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-8">
      {/* Next button (mobile) */}
      <div className="flex w-full max-w-[1200px] mb-2 md:hidden">
        <button
          onClick={handleNext}
          className="w-full px-4 py-2 bg-[#8b5e3c] text-white rounded hover:bg-[#6a4529]"
        >
          Next
        </button>
      </div>

      <div className="flex justify-center w-full max-w-[1200px] gap-2 sm:gap-4">
        {/* Prev/Next buttons (desktop/tablet) */}
        <button
          onClick={handlePrev}
          className="hidden md:flex px-4 py-2 bg-[#8b5e3c] text-white rounded hover:bg-[#6a4529] flex-shrink-0"
        >
          Prev
        </button>

        {/* Grid with responsive cards */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {currentBooks.map((book, i) => (
            <div
              key={startIndex + i}
              className="bg-white rounded-md shadow-md flex flex-col justify-end p-2 border-l-8 border-[#8b5e3c] hover:scale-105 transition-transform cursor-pointer w-full"
              title={`${book.title} - ${book.author}`}
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-md mb-2"
              />
              <div className="text-center">
                <h2 className="text-sm font-bold break-words">{book.title}</h2>
                <p className="text-xs text-gray-600 break-words">{book.author}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="hidden md:flex px-4 py-2 bg-[#8b5e3c] text-white rounded hover:bg-[#6a4529] flex-shrink-0"
        >
          Next
        </button>
      </div>

      {/* Prev button (mobile) */}
      <div className="flex w-full max-w-[1200px] mt-2 md:hidden">
        <button
          onClick={handlePrev}
          className="w-full px-4 py-2 bg-[#8b5e3c] text-white rounded hover:bg-[#6a4529]"
        >
          Prev
        </button>
      </div>
    </div>
  );
}
