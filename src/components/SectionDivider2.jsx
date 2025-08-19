import React from "react";
import dividerBooks from "../assets/images/dividerBooks2.JPG";

export default function SectionDivider() {
  return (
    <section className="relative w-full h-32 overflow-hidden mt-12">
      {/* Baggrundsbillede, gentaget horisontalt */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${dividerBooks})`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
          backgroundSize: "auto 100%",
        }}
      ></div>

      {/* Valgfri overlay/gradient for effekt */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
    </section>
  );
}
