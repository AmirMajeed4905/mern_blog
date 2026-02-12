import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiFileText, FiMenu } from "react-icons/fi";

const Sidebar = ({ isMobile }) => {
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const menuItems = [
    { name: "Dashboard", icon: FiHome, path: "/admin" },
    { name: "Users", icon: FiUsers, path: "/admin/users" },
    { name: "Blogs", icon: FiFileText, path: "/admin/blogs" },
  ];

  return (
    <div
      className={` 
        h-full bg-white
        shadow-[4px_0_20px_rgba(0,0,0,0.08)]
        transition-all duration-300
        ${isExpanded ? "w-64" : "w-20"}
        rounded-r-2xl
        flex flex-col
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {isExpanded && (
          <span className="font-bold text-lg tracking-wide">
            Admin Panel
          </span>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-2xl hidden md:block"
        >
          <FiMenu strokeWidth={2.5} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-2 space-y-2">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `group relative flex items-center justify-center md:justify-start gap-3
               p-3 rounded-xl transition-all
               ${
                 isActive
                   ? "bg-blue-500 text-white shadow-md"
                   : "text-gray-700 hover:bg-blue-50"
               }`
            }
          >
            <Icon size={22} strokeWidth={2.5} />

            {isExpanded && (
              <span className="hidden md:inline text-sm font-medium">
                {name}
              </span>
            )}

            {!isExpanded && (
              <span
                className="
                  absolute left-20 top-1/2 -translate-y-1/2
                  bg-gray-900 text-white text-xs
                  px-2 py-1 rounded-md
                  opacity-0 group-hover:opacity-100
                  pointer-events-none
                  transition
                "
              >
                {name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
