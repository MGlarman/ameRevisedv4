// components/BlogSection.js
import React, { useState } from "react";
import Greetings from "./BlogPosts/Greetings";
import HorrorManifesto from "./BlogPosts/HorrorManifesto";
import HorrorInTheCabin from "./BlogPosts/HorrorCabinInTheWoods";

function BlogSection() {
  const [expandedPosts, setExpandedPosts] = useState([]);

  const toggleExpand = (id) => {
    setExpandedPosts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <section className="my-10 w-full max-w-4xl px-4 mx-auto">
      <h2 className="text-3xl font-bold text-[#8b5e3c] mb-6">📖 Blog</h2>

      {/* Greetings Post */}
      <Greetings
        isExpanded={expandedPosts.includes(1)}
        toggleExpand={toggleExpand}
      />

      {/* Horror Manifesto Post */}
      <HorrorManifesto
        isExpanded={expandedPosts.includes(2)}
        toggleExpand={toggleExpand}
      />

      {/* Cabin in the Woods Post */}
      <HorrorInTheCabin
        isExpanded={expandedPosts.includes(3)}
        toggleExpand={toggleExpand}
      />
    </section>
  );
}

export default BlogSection;
