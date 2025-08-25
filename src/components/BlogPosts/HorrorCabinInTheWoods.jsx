// components/BlogPosts/HorrorInTheCabin.jsx
import React from "react";
import cabinImage1 from "../../assets/images/posts/cabinimage1.png";
import cabinImage2 from "../../assets/images/posts/cabinimage2.png";
import cabinImage3 from "../../assets/images/posts/cabinimage3.png";

export default function HorrorInTheCabin({ isExpanded, toggleExpand }) {
  const content = [
    {
      type: "text",
      value: `Introduction
‘Everything in our stable is remnant of the old world.’

Cabin in the Woods breaks down the social contract, revealing the larger machine behind the Horror that seeks to sort individuals into those archetypes deemed necessary for the social contract to be upheld.
Cabin in the Woods is a meta-horror movie from 2011, written by Drew Goddard and Joss Whedon (both known for Buffy the Vampire Slayer (1997-2003) and Angel (1999-2004)).
As a commentary on slasher movies, which draws influences through the classic cabin setting from Evil Dead (1981), this places Cabin in the Woods, somewhere between John Carpenter’s phenomenal slasher Scream (1996) and postmodern, genre-bending horror satires like Tucker and Dale vs. Evil (2010).`,
      image: {
        src: cabinImage1,
        alt: "The Cabin in the Woods poster, Lionsgate 2012",
        align: "right"
      }
    },
    {
      type: "text",
      value: `Summary
In Cabin in the Woods, we follow an ‘ordinary’ and unsuspecting group of college students, who are invited to a remote cabin for school break. This classic horror formula is deliberately familiar, echoing earlier installations of the genre. Furthermore, the characters are slotted into excessive caricatures, with the two girlfriends - the scholar and the matchmaker, the jock boyfriend and his ‘cute’ friend, and finally, the stoner / comic relief. Through this setup, the film signals the intent to participate in the horror genre.`
    },
    {
      type: "image",
      src: cabinImage2,
      alt: "Film still from Cabin in the Woods, Lionsgate 2012",
      align: "right"
    },
    {
      type: "text",
      value: `Analysis
Right from the intro credits, blood-soaked mythological imagery reminds us that the social contract is built on violence. This bleeds into the clip of two office workers (white shirt and tie), discussing their personal lives mid-break (the mis-en-scène consisting of the classic vending machine and watercooler).
This turns into a discussion of what is presumably a commercial competition between Sweden, Japan and the US. In the end, we find that these are the people in charge of a bloody ritual. Consequently, We find our expectations subverted by having the Horror be dictated by the ‘rational society’.
What appears as free choice is instead a scripted performance, imposed by authority, to entertain the masses. Marty’s description of society crystallizes this: 
‘Society is binding. It’s filling in the cracks with concrete. Everything is filed, recorded, or blocked. Chips in our kids’ heads so they won’t get lost. Society needs to crumble.’
The five archetypes (the virgin, the athlete, the whore, the scholar, and the fool) are thus archaic, as the name suggests, adhering to a cosmo-natural law, and the characters themselves are being boxed into archetypes, to benefit the narrative, rather than as predetermined individuals, with character flaws of their own.`
    },
    {
      type: "image",
      src: cabinImage3,
      alt: "Film still from Cabin in the Woods, Lionsgate 2012",
      align: "left"
    },
    {
      type: "text",
      value: `Discussion
Cabin in the Woods (2011) suggests that society, as much as the individual, dictates the role of the individual. This is similar to Stephen Covey’s concept of interdependence (described in The Seven Habits of Highly Effective People) which he frames as a more viable state, than either dependence or radical independence. The movie thus describes a social contract which shies away from determinism and pure free will, shaping society as a state of tension between the two. This is explicitly stated in the conversation about gambling on the outcome.
‘How can you wager on this when you control the outcome?’
‘We just get them in the cellar; they take it from there.’
‘[...] They have to make the choice of their own free will. Otherwise, the system doesn’t work.’
‘Yeah, we rig the game, but in the end, they don’t transgress...
‘... they can’t be punished.’

Conclusion
In conclusion, the movie switches between horror imagery (a secluded cabin, a nearby lake, a creepy cellar), and subverts expectations by allowing the characters free will. By breaking this typical convent of the horror genre, the characters break out of society, thereby breaking society itself, which, to the chagrin of the horror technicians, leads to the end of society, and thus the world.

References:
The Cabin in the Woods. Directed by Drew Goddard, performances by Kristen Connolly, Chris Hemsworth, Anna Hutchison, Fran Kranz, and Jesse Williams, Lionsgate, 2012.
Covey, Stephen R. The 7 Habits of Highly Effective People: Powerful Lessons in Personal Change. Free Press, 1989.`
    }
  ];

  const previewContent = isExpanded ? content : content.slice(0, 3);

  return (
    <article className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white mb-8 font-serif">
      <h3 className="text-2xl font-semibold mb-3 text-[#7a4f2c] font-serif">
        Cabin in the Woods (2011)
      </h3>
      <p className="text-sm text-gray-500 mb-6">📅 August 23, 2025</p>

      {previewContent.map((block, idx) => {
        if (block.type === "text") {
          const lines = block.value.split("\n\n");
          return lines.map((section, i) => {
            const sectionLines = section.split("\n");
            const header = sectionLines[0];
            const body = sectionLines.slice(1).join(" ");

            return (
              <div key={`${idx}-${i}`} className="mb-6">
                <h4 className="text-xl font-semibold mb-2 text-[#8b5e3c] font-serif">
                  {header}
                </h4>

                {/* Poster as inline right-floated image */}
                {block.image && i === 0 && (
                  <div className="float-right ml-4 mb-2 w-1/3">
                    <img
                      src={block.image.src}
                      alt={block.image.alt}
                      className="rounded-lg w-full object-cover"
                    />
                    <p className="text-sm text-gray-500 italic mt-1">{block.image.alt}</p>
                  </div>
                )}

                <p className="text-gray-800 text-lg leading-relaxed">{body}</p>
              </div>
            );
          });
        } else if (block.type === "image") {
          const alignment =
            block.align === "right"
              ? "float-right ml-4 mb-2 w-1/2"
              : block.align === "left"
              ? "float-left mr-4 mb-2 w-1/2"
              : "w-full mb-6";
          return (
            <div key={idx} className={alignment}>
              <img
                src={block.src}
                alt={block.alt}
                className="rounded-lg w-full"
              />
              <p className="text-sm text-gray-500 italic mt-1">{block.alt}</p>
            </div>
          );
        }
        return null;
      })}

      <div className="clear-both"></div>

      <button
        onClick={() => toggleExpand(3)}
        className="mt-4 px-4 py-2 bg-[#7a4f2b] text-white rounded-lg shadow-sm hover:bg-[#6b4327] transition-colors duration-200"
      >
        {isExpanded ? "Show Less" : "Read More"}
      </button>

      <p className="text-sm text-gray-400 italic mt-4">By Matty</p>
    </article>
  );
}
