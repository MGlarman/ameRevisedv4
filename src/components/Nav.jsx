import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import headerBg from "../assets/images/header_bg.JPG";

// Typewriter-komponent
function TypewriterText({ text = "A M E R E V I S E D", className, style }) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [text]);

  return (
    <h1 className={className} style={style}>
      {displayedText}
      <span className="inline-block">{showCursor ? "|" : " "}</span>
    </h1>
  );
}

// Navigation-komponent
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="border-b-4 border-border shadow-md shadow-black font-body w-full"
      style={{
        backgroundImage: `url(${headerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-8 py-6 flex justify-between items-center relative">
        {/* Logo + tagline med typewriter */}
        <Link to="/" className="flex flex-col text-left">
          <TypewriterText
            text="A MEREVISED"
            className="text-3xl sm:text-5xl font-heading tracking-wider transition-colors duration-300"
            style={{
              color: "#c99800",
              textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
            }}
          />
          <p
            className="text-base sm:text-lg italic tracking-wide"
            style={{
              color: "#cfa640",
              textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
            }}
          >
            Home of the Strange Encounters Magazine
          </p>
        </Link>

        {/* Hamburger-menu (kun mobil) */}
        <button
          className="sm:hidden text-3xl w-12 h-12 flex items-center justify-center absolute right-8 top-1/2 transform -translate-y-1/2 bg-transparent border-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          style={{
            color: "#c99800",
            textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
          }}
        >
          ☰
        </button>

        {/* Desktop-menu */}
        <nav className="hidden sm:flex gap-8 items-center text-xl relative -top-1">
          <NavLinks isMobile={false} />
        </nav>
      </div>

      {/* Mobil-menu */}
      {isOpen && (
        <div className="sm:hidden bg-secondary border-t border-border px-6 py-4 w-full max-w-screen-xl mx-auto">
          <nav className="flex flex-col gap-2 text-lg">
            <NavLinks isMobile={true} />
          </nav>
        </div>
      )}
    </header>
  );
}

// NavLinks komponent
function NavLinks({ isMobile }) {
  const linkColor = "#cfa640";
  const shadow = "1px 1px 2px rgba(0,0,0,0.5)";
  const fontSize = isMobile ? "1.125rem" : "1.25rem";

  const linkStyle = {
    color: linkColor,
    textShadow: shadow,
    fontSize,
  };

  const linkClasses = `transition-colors duration-300 font-semibold ${
    isMobile
      ? "block px-4 py-3 hover:bg-hover/10 hover:text-hover"
      : "hover:underline hover:text-hover"
  }`;

  return (
    <>
      <Link to="/" className={linkClasses} style={linkStyle}>
        Home
      </Link>
      <Link to="/magazine-archive" className={linkClasses} style={linkStyle}>
        Arkiv
      </Link>
      <Link to="/about" className={linkClasses} style={linkStyle}>
        Om
      </Link>
    </>
  );
}
