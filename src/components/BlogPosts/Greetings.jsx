// components/BlogPosts/Greetings.js
import React from 'react';

export default function Greetings() {
  const content = `Hi, welcome to my blog. I made this blog as part of my AmeRevised platform to put myself out there and discuss one of my all-time favorite subjects: literature. Now, literature is a vast term that expands across all sorts of media and genres, which is why, for a start, I'm choosing to stick to the three grand genres of horror, fantasy, and science fiction.

Occasionally, I may come in from the left field with a piece that does not quite fit, like a song or an album, but these three genres will ultimately be the focal point of this blog. Furthermore, genre is a term used loosely to generalize and sort through the ocean of narrative instruments we, as humans, use to proclaim our existence.

For instance, we may find that the horror brand is widely applied to cinema and novels, but not to pieces of music (although it can be). Thus, we must dig deeper into the shape of a literary piece to find the core themes and the way they connect with the broader literary map, that I will be trying to paint.

I hope you will enjoy your time here, and I look forward to bringing you more content. Signing off for the moment, Matty`;

  return (
    <article className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white mb-6 font-serif">
      <h3 className="text-2xl font-semibold mb-3 text-[#7a4f2b] font-serif">Greetings</h3>
      <p className="text-sm text-gray-500 mb-6">📅 August 13, 2025</p>

      {content.split('\n\n').map((section, idx) => (
        <p key={idx} className="text-gray-800 text-lg leading-relaxed mb-4">{section}</p>
      ))}

      <p className="text-sm text-gray-400 italic mt-4">Af Matty</p>
    </article>
  );
}
