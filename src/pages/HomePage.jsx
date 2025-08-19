import React, { useEffect, useState } from "react";
import Bookshelf from "../components/BookShelf";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import WelcomeSection from "../components/WelcomeSection";
import DonateSection from "../components/DonateSection";
import NovelBanner from "../components/NovelBanner";
import SectionDivider from "../components/SectionDivider";
import SectionDivider2 from "../components/SectionDivider2";

// Define backend URL
const API_URL = "https://ame-server-lcrm.onrender.com";

// BlogSection med kommentarer
function BlogSection({ isUserLoggedIn, currentUser }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blog`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);

        data.forEach(post => fetchComments(post.id ?? post.Id));
      } catch (err) {
        console.error(err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async (postId) => {
      try {
        const res = await fetch(`${API_URL}/api/blog/${postId}/comments`);
        if (!res.ok) throw new Error("Failed to fetch comments");
        const data = await res.json();
        setComments(prev => ({ ...prev, [postId]: data }));
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  const handleCommentChange = (postId, value) => {
    setNewComments(prev => ({ ...prev, [postId]: value }));
  };

  const handleCommentSubmit = async (postId) => {
    const content = newComments[postId];
    if (!content) return;

    try {
      await fetch(`${API_URL}/api/blog/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content, author: currentUser }),
      });

      setNewComments(prev => ({ ...prev, [postId]: "" }));

      const res = await fetch(`${API_URL}/api/blog/${postId}/comments`);
      const data = await res.json();
      setComments(prev => ({ ...prev, [postId]: data }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await fetch(`${API_URL}/api/blog/${postId}/comments/${commentId}`, {
        method: "DELETE",
        credentials: "include",
      });
      setComments(prev => ({
        ...prev,
        [postId]: prev[postId].filter(c => (c.id ?? c.Id) !== commentId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading blog posts...</p>;

  return (
    <section className="my-10 w-full max-w-7xl px-4 flex-shrink-0">
      <h2 className="text-3xl font-bold text-[#8b5e3c] mb-4">📖 Blog</h2>
      {posts.length === 0 ? (
        <p className="text-[#555] text-lg">Ingen blogindlæg endnu.</p>
      ) : (
        <div className="space-y-6">
          {posts.map(post => {
            const postId = post.id ?? post.Id;
            return (
              <article
                key={postId}
                className="p-4 border rounded hover:shadow-lg transition bg-white"
              >
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.content}</p>
                <p className="text-sm text-gray-400 mt-2">Af {post.author}</p>

                <div className="mt-4">
                  <h4 className="font-semibold text-sm mb-1">Kommentarer:</h4>
                  <ul className="space-y-2">
                    {(comments[postId] || []).map(c => (
                      <li
                        key={c.id ?? c.Id}
                        className="text-gray-500 text-sm flex justify-between items-center"
                      >
                        <span><strong>{c.author}:</strong> {c.content}</span>
                        {isUserLoggedIn && currentUser === c.author && (
                          <button
                            onClick={() => handleDeleteComment(postId, c.id ?? c.Id)}
                            className="text-red-500 text-xs ml-2"
                          >
                            Slet
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>

                  {isUserLoggedIn && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={newComments[postId] || ""}
                        onChange={e => handleCommentChange(postId, e.target.value)}
                        className="flex-1 border rounded px-2 py-1"
                        placeholder="Skriv en kommentar..."
                      />
                      <button
                        onClick={() => handleCommentSubmit(postId)}
                        className="bg-[#8b5e3c] text-white px-3 py-1 rounded"
                      >
                        Send
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default function HomePage({ isUserLoggedIn, currentUser }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f5ec]">
      {/* Side-wrapper */}
      <div className="flex flex-1">
        <div className="w-6 sm:w-10 bg-[#8b5e3c] shadow-inner" />

        <div className="flex-1 px-6 sm:px-2 flex flex-col items-center py-2">
          <WelcomeSection />
          <HeroSection />
          <DonateSection />
          <SectionDivider />
          <BlogSection
            isUserLoggedIn={!!isUserLoggedIn}
            currentUser={currentUser || "Guest"}
          />
          <SectionDivider2 />
          <NovelBanner />

          <h1 className="text-4xl font-bold text-[#8b5e3c] mt-10">📚 My Bookshelf</h1>
          <Bookshelf />
        </div>

        <div className="w-6 sm:w-10 bg-[#8b5e3c] shadow-inner" />
      </div>

      {/* Footer */}
      <div className="flex">
        <div className="w-6 sm:w-10 bg-[#8b5e3c] shadow-inner" />
        <div className="flex-1 px-6 sm:px-0">
          <Footer />
        </div>
        <div className="w-6 sm:w-10 bg-[#8b5e3c] shadow-inner" />
      </div>
    </div>
  );
}
