import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#8b5e3c] text-white py-4 mt-auto w-full">
      {/* Baggrund og skygge går til kanten, men indholdet er centreret med max-width og padding */}
      <div className="max-w-7xl mx-auto px-2 sm:px-2 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© {new Date().getFullYear()} My Bookshelf. All rights reserved.</p>
        <ul className="flex space-x-6 mt-2 md:mt-0">
          <li>
            <a href="#" className="hover:text-yellow-200">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-200">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-200">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
