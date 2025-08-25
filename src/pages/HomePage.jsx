// pages/HomePage.js
import React from "react";
import WelcomeSection from "../components/WelcomeSection";
import HeroSection from "../components/HeroSection";
import DonateSection from "../components/DonateSection";
import SectionDivider from "../components/SectionDivider";
import SectionDivider2 from "../components/SectionDivider2";
import NovelBanner from "../components/NovelBanner";
import Bookshelf from "../components/BookShelf";
import Footer from "../components/Footer";
import BlogSection from "../components/BlogSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f5ec]">
      {/* Øverste indhold */}
      <div className="flex flex-1">
        {/* Sidebjælke: næsten usynlig på mobil */}
        <div className="w-1 sm:w-4 md:w-6 lg:w-10 bg-[#8b5e3c] shadow-inner" />
        <div className="flex-1 px-2 sm:px-4 md:px-6 flex flex-col items-center py-2">
          <WelcomeSection />
          <HeroSection />
          <DonateSection />
          <SectionDivider />
          <BlogSection />
          <SectionDivider2 />
          <NovelBanner />

          <h1 className="text-4xl font-bold text-[#8b5e3c] mt-10">📚 My Bookshelf</h1>
          <Bookshelf />
        </div>
        <div className="w-1 sm:w-4 md:w-6 lg:w-10 bg-[#8b5e3c] shadow-inner" />
      </div>

      {/* Footer */}
      <div className="flex">
        <div className="w-1 sm:w-4 md:w-6 lg:w-10 bg-[#8b5e3c] shadow-inner" />
        <div className="flex-1 px-2 sm:px-4 md:px-6">
          <Footer />
        </div>
        <div className="w-1 sm:w-4 md:w-6 lg:w-10 bg-[#8b5e3c] shadow-inner" />
      </div>
    </div>
  );
}
