import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ArchivePage from "./pages/ArchivePage";
import MagazineReader from "./pages/MagazineReader"; // 👈 ny import
import Nav from "./components/Nav";

import DeveloperGuide from "./pages/DeveloperGuide";

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userRes = await fetch("http://localhost:5224/api/user/data", {
          method: "GET",
          credentials: "include",
        });
        if (userRes.ok) {
          const data = await userRes.json();
          setIsUserLoggedIn(true);
          setCurrentUser(data.username || "");
        }

        const adminRes = await fetch("http://localhost:5224/api/admin/data", {
          method: "GET",
          credentials: "include",
        });
        if (adminRes.ok) setIsAdminLoggedIn(true);
      } catch (err) {
        console.error(err);
        setIsUserLoggedIn(false);
        setIsAdminLoggedIn(false);
        setCurrentUser("");
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleUserLogout = async () => {
    try {
      await fetch("http://localhost:5224/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsUserLoggedIn(false);
      setCurrentUser("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdminLogout = async () => {
    try {
      await fetch("http://localhost:5224/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsAdminLoggedIn(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <BrowserRouter>
      <Nav
        isUserLoggedIn={isUserLoggedIn}
        isAdminLoggedIn={isAdminLoggedIn}
        onUserLogout={handleUserLogout}
        onAdminLogout={handleAdminLogout}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isUserLoggedIn={isUserLoggedIn}
              currentUser={currentUser}
            />
          }
        />

        {/* Arkiv side */}
        <Route path="/magazine-archive" element={<ArchivePage />} />

        {/* Magazine Reader */}
        <Route path="/reader/:id" element={<MagazineReader />} />

        {/* User Login */}
        <Route
          path="/user/login"
          element={
            isUserLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <UserLogin onLogin={() => setIsUserLoggedIn(true)} />
            )
          }
        />

        {/* User Registration */}
        <Route
          path="/user/register"
          element={isUserLoggedIn ? <Navigate to="/" /> : <UserRegister />}
        />

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={
            isAdminLoggedIn ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />
            )
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin/login" />
          }
        />

        <Route path="/developer-guide" element={<DeveloperGuide />} />


        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
