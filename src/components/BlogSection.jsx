import React, { useEffect, useState } from "react";

function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5224/api/blog");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading blog posts...</p>;

  return (
    <section className="my-10 w-full max-w-7xl px-4 flex-shrink-0">
      <h2 className="text-3xl font-bold text-[#8b5e3c] mb-4">📖 Blog</h2>
      {posts.length === 0 ? (
        <p className="text-[#555] text-lg">Ingen blogindlæg endnu.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => {
            const postId = post.id ?? post.Id;

            // Convert newlines to <br />
            const formattedContent = post.content
              .replace(/\\n/g, "\n") // replace escaped \n
              .split("\n")
              .map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ));

            return (
              <article
                key={postId}
                className="p-4 border rounded hover:shadow-lg transition bg-white"
              >
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600">{formattedContent}</p>
                <p className="text-sm text-gray-400 mt-2">Af {post.author}</p>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default BlogSection;
