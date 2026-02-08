// Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiFileText, FiMenu } from "react-icons/fi";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/admin" },
    { name: "Users", icon: <FiUsers />, path: "/admin/users" },
    { name: "Blogs", icon: <FiFileText />, path: "/admin/blogs" },
  ];

  return (
    <div
      className={`
        h-screen bg-white shadow-lg flex flex-col
        transition-all duration-300
        ${isExpanded ? "w-64" : "w-20"}
      `}
    >
      {/* Hamburger / toggle */}
      <div className="flex items-center justify-between p-4 border-b">
        {isExpanded && <span className="text-xl font-bold">Admin Panel</span>}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-2xl focus:outline-none"
        >
          <FiMenu />
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-blue-100 transition-all duration-200 ${
                isActive ? "bg-blue-200 font-semibold" : ""
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {isExpanded && <span className="text-sm">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
