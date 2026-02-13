import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiSun, FiMoon, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import api from "../../../utils/axios";

const Navbar = ({ currentUser, onMenuClick }) => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Outside click close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
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
    <header className="sticky top-0 z-50 mx-2 sm:mx-4 lg:mx-6 mb-4">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-orange-100/20 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
          {/* LEFT SECTION */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-200 hover:from-amber-100 hover:to-orange-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Toggle menu"
            >
              <FiMenu className="text-xl sm:text-2xl" />
            </button>

            {/* Logo/Title */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm sm:text-lg">A</span>
              </div>
              <h2 className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent hidden xs:block">
                Admin Panel
              </h2>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 text-amber-600 dark:text-orange-400 hover:from-amber-100 hover:to-orange-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <FiSun className="text-lg sm:text-xl" />
              ) : (
                <FiMoon className="text-lg sm:text-xl" />
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 sm:gap-3 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 hover:from-amber-100 hover:to-orange-100 dark:hover:from-gray-700 dark:hover:to-gray-600 px-2 sm:px-3 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md border border-orange-100/50 dark:border-gray-700"
              >
                {/* Avatar */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center font-bold text-sm sm:text-base shadow-md">
                  {currentUser?.name?.[0]?.toUpperCase() || "A"}
                </div>

                {/* Name - Hidden on small screens */}
                <span className="hidden sm:block text-sm font-semibold text-gray-700 dark:text-gray-200 max-w-[120px] truncate">
                  {currentUser?.name || "Admin"}
                </span>

                {/* Chevron */}
                <svg
                  className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 hidden xs:block ${
                    open ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] border border-orange-100/50 dark:border-gray-700 overflow-hidden z-50 animate-slideDown">
                  {/* User Info */}
                  <div className="px-4 py-3 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 border-b border-orange-100 dark:border-gray-600">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                      {currentUser?.name || "Admin"}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                      {currentUser?.email || "admin@example.com"}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={() => {
                        navigate("/admin/profile");
                        setOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-colors flex items-center gap-3"
                    >
                      <FiUser className="text-base text-amber-600 dark:text-orange-400" />
                      Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate("/admin/settings");
                        setOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-colors flex items-center gap-3"
                    >
                      <FiSettings className="text-base text-amber-600 dark:text-orange-400" />
                      Settings
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-orange-100 dark:border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-3"
                    >
                      <FiLogOut className="text-base" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Navbar;