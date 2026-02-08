// Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/axios";

const Navbar = ({ currentUser }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h2 className="text-xl font-bold">Admin Panel</h2>

      {/* Profile dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition"
        >
          <span>{currentUser?.name}</span>
          <svg
            className={`w-4 h-4 transform transition-transform ${
              open ? "rotate-180" : "rotate-0"
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

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
            <button
              onClick={() => navigate("/admin/profile")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
            >
              Profile
            </button>
            <button
              onClick={() => navigate("/settings")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-500 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
