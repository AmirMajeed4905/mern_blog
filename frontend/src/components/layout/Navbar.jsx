import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import api from "../../utils/axios";
import Logo from "./Logo";

const Navbar = ({ onMenuClick }) => {
  const [open, setOpen] = useState(false); // profile dropdown
//   const [menuOpen, setMenuOpen] = useState(false); // mobile menu
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Could not fetch profile:", err);
      }
    };
    fetchUser();
  }, []);

  // Outside click close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="sticky top-0 z-50 px-4 py-3 m-2 md:m-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-2xl flex items-center justify-between">
      
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger */}
        <button onClick={onMenuClick} className="md:hidden text-2xl">
          <FiMenu />
        </button>

        <Logo />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:scale-105 transition shadow-inner"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-xl transition shadow-inner"
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold shadow">
              {user?.name?.[0] || "A"}
            </div>

            {/* Name */}
            <span className="hidden sm:block text-sm font-medium">
              {user?.name || "Profile"}
            </span>

            {/* Arrow */}
            <svg
              className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-900 rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.25)] border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
              <button
                onClick={() => navigate("/profile")}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Profile
              </button>

              <button
                onClick={() => navigate("/admin/settings")}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Settings
              </button>

              <div className="h-px bg-gray-200 dark:bg-gray-700" />

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
