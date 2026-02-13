import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiFileText, FiMenu, FiChevronDown, FiTag } from "react-icons/fi";

const SideBar = ({ isMobile }) => {
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  const menuItems = [
    { name: "Dashboard", icon: FiHome, path: "/admin" },
    { name: "Users", icon: FiUsers, path: "/admin/users" },
    {
      name: "Blogs",
      icon: FiFileText,
      dropdown: [
        { name: "All Blogs", path: "/admin/blogs" },
        { name: "Add Blog", path: "/admin/blogs/add" },
      ],
    },
    {
      name: "Categories",
      icon: FiTag,
      dropdown: [
        { name: "All Categories", path: "/admin/categories" },
        { name: "Add Category", path: "/admin/categories/add" },
      ],
    },
  ];

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div
      className={`
        fixed top-0 left-0 h-full bg-white
        shadow-[4px_0_20px_rgba(0,0,0,0.08)]
        transition-all duration-300
        ${isExpanded ? "w-64" : "w-20"}
        rounded-r-2xl flex flex-col
        z-50
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {isExpanded && <span className="font-bold text-lg tracking-wide">Admin Panel</span>}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-2xl hidden md:block"
        >
          <FiMenu strokeWidth={2.5} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-2 space-y-2">
        {menuItems.map(({ name, icon: Icon, path, dropdown }) => (
          <div key={name}>
            {!dropdown ? (
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `group relative flex items-center justify-center md:justify-start gap-3
                   p-3 rounded-xl transition-all
                   ${isActive ? "bg-blue-500 text-white shadow-md" : "text-gray-700 hover:bg-blue-50"}`
                }
              >
                <Icon size={22} strokeWidth={2.5} />
                {isExpanded && <span className="hidden md:inline text-sm font-medium">{name}</span>}
              </NavLink>
            ) : (
              <>
                {/* Dropdown toggle */}
                <button
                  onClick={() => toggleDropdown(name)}
                  className={`group relative flex items-center justify-center md:justify-start gap-3
                    w-full p-3 rounded-xl transition-all
                    text-gray-700 hover:bg-blue-50
                  `}
                >
                  <Icon size={22} strokeWidth={2.5} />
                  {isExpanded && <span className="text-sm font-medium">{name}</span>}
                  {isExpanded && (
                    <FiChevronDown
                      className={`ml-auto transition-transform duration-200 ${
                        openDropdown === name ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  )}
                </button>

                {/* Dropdown items */}
                {isExpanded && openDropdown === name && (
                  <div className="ml-6 flex flex-col space-y-1 mt-1">
                    {dropdown.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                          `px-3 py-2 rounded-lg text-sm transition
                           ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-100"}`
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
