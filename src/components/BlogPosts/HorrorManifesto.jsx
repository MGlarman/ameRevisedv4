// components/BlogPosts/HorrorManifesto.js
import React from 'react';

export default function HorrorManifesto({ isExpanded, toggleExpand }) {
  const content = `On Horror: A Manifesto for Horror Reviews on This blog
The horror genre is as old as storytelling itself. Before we had Stephen King, we had Shirley Jackson. Before Jackson, we had H.P. Lovecraft. Before Lovecraft, we had Edgar Allan Poe. Before Poe, we had Mary Shelley. And the list goes on and on. Horror has always been with us, and it continues to evolve with each generation.

People often ask: What is horror? and Why do we like it? The answers have been written, rewritten, and theorized endlessly. So I won’t try to offer a final word here. Instead, I’ll point to a few key thinkers and then provide my own approach—one that will guide how I write about horror films on this blog.

The Framework I’ll Be Using
1. The Genre Equation
When I analyze horror films, I will return to recurring frameworks. One that stands out comes from Horror Film, edited by Murray Leeder. The book raises a question that has lingered in genre studies for decades: Can a genre be reduced to a formula?
Leeder warns that if we try to distill horror into an equation, we risk creating a single “perfect” specimen that supposedly represents the genre as a whole. From there, every other film becomes nothing more than a facsimile, a hollow imitation of the original. Genre, in that sense, would be static and dead, rather than the flexible, evolving thing it truly is.
And yet, formulas can be tempting. For instance, the following equation:
Horror = suspense + monster + spectacle + fear
Is a useful way of describing the mechanics—suspense generates dread, the monster disrupts order, and spectacle delivers the visceral payoff. But if we treat this equation as the definition of horror, then the genre collapses into repetition. It would no longer be a living, mutating field of storytelling, but a loop of self-imitation.
This is why I don’t judge a film strictly “as horror.” Instead, I see horror as a shifting interplay of suspense, monstrosity, and spectacle—elements that never add up to a fixed equation but instead combine and recombine to keep the genre alive.

2. My Take: Horror as a Social Contract
Horror is the chaos that unfolds when the natural entropy of the world collides with the fragile, socially constructed human world. It’s not merely the plan that falls apart, but the unsalvageable remnants of a broken social contract.
Take Randy Meeks’ famous rules of horror from Scream (1996):
1. You can never have sex.
Sex = death. Virginity = purity → survival.
2. You cannot drink or do drugs.
The “sin factor”: morality is enforced.
3. Never say “I’ll be right back.”
Anyone who says this won’t return.
These rules are not timeless truths. They are products of their cultural moment. They show us how horror films act as morality tales, punishing or rewarding characters according to the anxieties of the society that produces them.

3. Archetypes
Drew Goddard’s and Joss Whedon’s, The Cabin in the Woods (2011) makes this explicit. It lays bare the horror archetypes that often structure the genre:
• The Whore (usually the first victim, branded and punished).
• The Athlete.
• The Scholar.
• The Fool.
• The Virgin (often the “final girl,” the one who survives).
These archetypes can be read as social classes, each carrying cultural baggage. The “whore,” for example, is shunned, punished, and destroyed. The “virgin,” in contrast, represents purity, control, and survival.
And yet, archetypes are never fixed. They shift with the times, reflecting the anxieties of the culture that consumes them, as proposed by The Cabin in the Woods (2011).

4. The Spectacle Factor
Slow-burn scenes—where the villain stalks or lingers just out of sight—play on our dread.
Spectacle scenes—jump scares, gore, and action—deliver the shock.
Directors can lean heavily on one or the other, or use both to create a rhythm of fear and release. Either way, spectacle has become a defining feature of modern horror, particularly in an age of franchise blockbusters and viral scare clips.

5. Rules, Genre, and Subjectivity
Of course, rules can always be broken. A clever director will exploit audience expectations, twisting them to surprise or unsettle. That is why horror remains so endlessly adaptable: it thrives on breaking its own boundaries.
And this brings me back to genre. Genre is not a fixed box, but a subjective lens. Horror is what we agree to call horror, shaped as much by culture and criticism as by the filmmakers themselves.

6. A Final Note
To ask why I like horror is like asking whether the hen came before the egg. Did I like Stephen King first, or did I like the horror genre? The truth is, the genre and I have always been entangled.
Which is why this blog will approach horror movies as social critique—through the lens of rules, archetypes, and spectacle. By examining how films use, break, or reinvent these conventions, I hope to uncover not just what scares us, but what those scares say about us.`;

  const previewContent = isExpanded ? content : content.split('\n').slice(0, 8).join('\n');

  return (
    <article className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white mb-8 font-serif">
      <h3 className="text-2xl font-semibold mb-3 text-[#7a4f2b] font-serif">
        On Horror: A Manifesto for Horror Reviews on This blog
      </h3>
      <p className="text-sm text-gray-500 mb-6">📅 August 22, 2025</p>

      {previewContent.split('\n\n').map((section, idx) => {
        const lines = section.split('\n');
        const header = lines[0].trim();
        const body = lines.slice(1).join(' ');

        return (
          <div key={idx} className="mb-6">
            <h4 className="text-xl font-semibold mb-2 text-[#8b5e3c] font-serif">{header}</h4>
            <p className="text-gray-800 text-lg leading-relaxed">{body}</p>
          </div>
        );
      })}

      <button
        onClick={() => toggleExpand(2)}
        className="mt-4 px-4 py-2 bg-[#7a4f2b] text-white rounded-lg shadow-sm hover:bg-[#6b4327] transition-colors duration-200"
      >
        {isExpanded ? 'Show Less' : 'Read More'}
      </button>

      <p className="text-sm text-gray-400 italic mt-4">Af Matty</p>
    </article>
  );
}
