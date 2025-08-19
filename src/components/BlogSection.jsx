// components/BlogSection.js
import React from "react";

function BlogSection() {
  const post = {
    id: 1,
    title: "Velkommen til min blog",
    content: `Hi, welcome to my blog. I made this blog as part of my AmeRevised platform to put myself out there and discuss one of my all-time favorite subjects: literature. Now, literature is a vast term that expands across all sorts of media and genres, which is why, for a start, I'm choosing to stick to the three grand genres of horror, fantasy, and science fiction. Occasionally, I may come in from the left field with a piece that does not quite fit, like a song or an album, but these three genres will ultimately be the focal point of this blog. Furthermore, genre is a term used loosely to generalize and sort through the ocean of narrative instruments we, as humans, use to proclaim our existence. For instance, we may find that the horror brand is widely applied to cinema and novels, but not to pieces of music (although it can be). Thus, we must dig deeper into the shape of a literary piece to find the core themes and the way they connect with the broader literary map, that I will be trying to paint. I hope you will enjoy your time here, and I look forward to bringing you more content. Signing off for the moment, Matty\n\nAf Matty`,
    author: "Matty",
  };

  const formattedContent = post.content
    .split("\n")
    .map((line, idx) => (
      <React.Fragment key={idx}>
        {line}
        <br />
      </React.Fragment>
    ));

  return (
    <section className="my-10 w-full max-w-4xl px-4 mx-auto">
      <h2 className="text-3xl font-bold text-[#8b5e3c] mb-6">📖 Blog</h2>
      <article className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white">
        <h3 className="text-2xl font-semibold mb-4 text-[#7a4f2b]">{post.title}</h3>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">{formattedContent}</p>
        <p className="text-sm text-gray-400 italic">Af {post.author}</p>
      </article>
    </section>
  );
}

export default BlogSection;
