import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Use environment variable or fallback to Render URL
  const API_URL = import.meta.env.VITE_API_URL || "https://ame-server-lcrm.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        onLogin();
        navigate("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f9f5ec]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#8b5e3c] text-white py-2 rounded hover:bg-[#6a4529]"
        >
          Login
        </button>
      </form>
    </div>
  );
}
