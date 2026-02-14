import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiFileText, FiMenu, FiChevronDown, FiTag, FiX,FiMessageCircle } from "react-icons/fi";

const SideBar = ({ isMobile, isOpen, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  const [openDropdown, setOpenDropdown] = useState(null);

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
        { name: "Add Category", path: "/admin/add-category" },
      ],
    },
    {
      name: "Comments",
      icon: FiMessageCircle,
      dropdown: [
        { name: "All Comments", path: "/admin/comments" },
      ],
    },
  ];

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 h-full
          bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
          shadow-[4px_0_24px_rgba(0,0,0,0.08)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.3)]
          transition-all duration-300 ease-in-out
          ${isExpanded ? "w-64" : "w-20"}
          rounded-r-3xl
          flex flex-col
          z-50
          border-r border-orange-100/30 dark:border-gray-700/50
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-6 border-b border-orange-100/50 dark:border-gray-700/50 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-gray-800/50 dark:to-gray-700/50">
          {isExpanded && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-base bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                Admin
              </span>
            </div>
          )}
          
          {/* Toggle Button - Desktop */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden lg:block p-2 rounded-xl hover:bg-gradient-to-br hover:from-amber-100 hover:to-orange-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 text-gray-700 dark:text-gray-300"
            aria-label="Toggle sidebar"
          >
            <FiMenu className="text-xl" strokeWidth={2.5} />
          </button>

          {/* Close Button - Mobile */}
          {isMobile && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-xl hover:bg-gradient-to-br hover:from-amber-100 hover:to-orange-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 text-gray-700 dark:text-gray-300"
              aria-label="Close sidebar"
            >
              <FiX className="text-xl" strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-200 dark:scrollbar-thumb-gray-700">
          {menuItems.map(({ name, icon: Icon, path, dropdown }) => (
            <div key={name}>
              {!dropdown ? (
                // Regular Menu Item
                <NavLink
                  to={path}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                     ${isExpanded ? "justify-start" : "justify-center"}
                     ${
                       isActive
                         ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 dark:shadow-orange-500/20"
                         : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:shadow-md"
                     }`
                  }
                >
                  <Icon size={22} strokeWidth={2.5} className="flex-shrink-0" />
                  {isExpanded && (
                    <span className="text-sm font-semibold">{name}</span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-6 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-xl z-50">
                      {name}
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                    </div>
                  )}
                </NavLink>
              ) : (
                // Dropdown Menu Item
                <>
                  <button
                    onClick={() => toggleDropdown(name)}
                    className={`group relative flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200
                      ${isExpanded ? "justify-start" : "justify-center"}
                      text-gray-700 dark:text-gray-300 hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:shadow-md
                    `}
                  >
                    <Icon size={22} strokeWidth={2.5} className="flex-shrink-0" />
                    {isExpanded && (
                      <>
                        <span className="text-sm font-semibold flex-1 text-left">
                          {name}
                        </span>
                        <FiChevronDown
                          className={`transition-transform duration-200 ${
                            openDropdown === name ? "rotate-180" : "rotate-0"
                          }`}
                          size={18}
                        />
                      </>
                    )}
                    
                    {/* Tooltip for collapsed state */}
                    {!isExpanded && (
                      <div className="absolute left-full ml-6 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-xl z-50">
                        {name}
                        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                      </div>
                    )}
                  </button>

                  {/* Dropdown Items */}
                  {isExpanded && openDropdown === name && (
                    <div className="ml-4 mt-1 space-y-1 animate-slideDown">
                      {dropdown.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.path}
                          onClick={handleLinkClick}
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                             ${
                               isActive
                                 ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md"
                                 : "text-gray-600 dark:text-gray-400 hover:bg-amber-100/50 dark:hover:bg-gray-700/50 hover:text-amber-700 dark:hover:text-orange-400"
                             }`
                          }
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
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

        {/* Footer */}
        {isExpanded && (
          <div className="p-4 border-t border-orange-100/50 dark:border-gray-700/50 bg-gradient-to-br from-amber-50/30 to-orange-50/30 dark:from-gray-800/30 dark:to-gray-700/30">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              <p className="font-semibold">Admin Dashboard</p>
              <p className="mt-1">v1.0.0</p>
            </div>
          </div>
        )}
      </aside>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        /* Custom scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thumb-orange-200::-webkit-scrollbar-thumb {
          background: #fed7aa;
          border-radius: 3px;
        }
        .dark .scrollbar-thumb-gray-700::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 3px;
        }
      `}</style>
    </>
  );
};

export default SideBar;