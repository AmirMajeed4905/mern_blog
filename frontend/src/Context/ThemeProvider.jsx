import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "../Context/ThemeContextCreate";

const Navbar = ({ currentUser, onMenuClick }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("Logout"); // replace with API call
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 m-2 md:m-4 px-4 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-lg rounded-2xl flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden text-2xl">
          <FiMenu />
        </button>
        <h2 className="text-lg md:text-xl font-bold">Admin Panel</h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-gray-200 dark:bg-gray-800 hover:scale-105 transition"
        >
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl shadow-inner"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold shadow">
              {currentUser?.name?.[0] || "A"}
            </div>
            <span className="hidden sm:block text-sm font-medium">{currentUser?.name || "Admin"}</span>
            <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
              <button onClick={() => navigate("/admin/profile")} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Profile</button>
              <button onClick={() => navigate("/admin/settings")} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Settings</button>
              <div className="h-px bg-gray-200 dark:bg-gray-700" />
              <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
