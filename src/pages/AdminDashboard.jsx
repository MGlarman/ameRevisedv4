import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", content: "", author: "" });
  const [editingId, setEditingId] = useState(null);

  // Use environment variable or fallback to Render URL
  const API_URL = import.meta.env.VITE_API_URL || "https://ame-server-lcrm.onrender.com";

  // Fetch all blog posts
  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blog`, { credentials: "include" });
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update post
        await fetch(`${API_URL}/api/blog/${editingId}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        // Create post
        await fetch(`${API_URL}/api/blog`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setForm({ title: "", content: "", author: "" });
      setEditingId(null);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (post) => {
    setForm({ title: post.title, content: post.content, author: post.author });
    setEditingId(post.id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/api/blog/${id}`, { method: "DELETE", credentials: "include" });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4 mb-8">Welcome, Admin! 🎉</p>

      {/* Create / Edit Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">{editingId ? "Edit Post" : "Create New Post"}</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border mb-2 rounded"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full p-2 border mb-2 rounded"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          className="w-full p-2 border mb-2 rounded"
          rows={4}
          required
        />
        <button
          type="submit"
          className="bg-[#8b5e3c] text-white px-4 py-2 rounded hover:bg-[#6a4529]"
        >
          {editingId ? "Update Post" : "Create Post"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => { setEditingId(null); setForm({ title: "", content: "", author: "" }); }}
            className="ml-2 px-4 py-2 rounded border hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p className="text-sm text-gray-600">by {post.author}</p>
              <p className="mt-2 whitespace-pre-line">{post.content}</p>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <button
                onClick={() => handleEdit(post)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
