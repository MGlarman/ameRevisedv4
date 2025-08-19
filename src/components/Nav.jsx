import { Link } from "react-router-dom";
import { useState } from "react";
import headerBg from "../assets/images/header_bg.JPG";

export default function Navigation({ cartCount = 0, isLoggedIn = false, onLogout }) {
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
        {/* Logo + tagline */}
        <Link to="/" className="flex flex-col text-left">
          <h1
            className="text-3xl sm:text-5xl font-heading uppercase tracking-wider transition-colors duration-300"
            style={{
              color: "#c99800",
              textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
            }}
          >
            AmeRevised
          </h1>
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
        <nav className="hidden sm:flex gap-8 items-center text-xl">
          <NavLinks
            cartCount={cartCount}
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
            isMobile={false}
          />
        </nav>
      </div>

      {/* Mobil-menu */}
      {isOpen && (
        <div className="sm:hidden bg-secondary border-t border-border px-6 py-4 w-full max-w-screen-xl mx-auto">
          <nav className="flex flex-col gap-2 text-lg">
            <NavLinks
              cartCount={cartCount}
              isLoggedIn={isLoggedIn}
              onLogout={onLogout}
              isMobile={true}
            />
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLinks({ cartCount, isLoggedIn, onLogout, isMobile }) {
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
      <Link to="/" className={linkClasses} style={linkStyle}>Home</Link>
      <Link to="/magazine-archive" className={linkClasses} style={linkStyle}>Arkiv</Link>

      {!isLoggedIn && (
        <>
          <Link to="/login" className={linkClasses} style={linkStyle}>Login</Link>
          <Link to="/register" className={linkClasses} style={linkStyle}>Opret</Link>
        </>
      )}

      <Link
        to="/cart"
        className={`relative ${
          isMobile
            ? "block px-4 py-3 hover:bg-hover/10 hover:text-hover"
            : "text-2xl hover:text-hover"
        } transition-colors duration-300`}
        style={linkStyle}
        aria-label="Kurv"
      >
        🛒
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-1 font-bold">
            {cartCount}
          </span>
        )}
      </Link>

      {isLoggedIn && (
        <button
          onClick={onLogout}
          className={`border border-border px-3 py-2 text-base transition-colors duration-300 font-semibold ${
            isMobile ? "hover:bg-hover/10" : "hover:bg-hover/20"
          }`}
          style={linkStyle}
        >
          Log ud
        </button>
      )}
    </>
  );
}
