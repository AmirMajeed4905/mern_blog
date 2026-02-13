import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Admin/components/SideBar";
import Navbar from "../pages/Admin/components/Navbar";

const AdminLayout = ({ currentUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex transition-colors duration-200">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-100 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-100 via-transparent to-transparent"></div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && isMobile && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:fixed z-50 h-screen
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <Sidebar 
          isMobile={isMobile} 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={`
          flex-1 flex flex-col min-h-screen w-full
          transition-all duration-300
          lg:ml-64
        `}
      >
        {/* Navbar */}
        <Navbar
          currentUser={currentUser}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Admin Dashboard
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    © 2024 All rights reserved
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <a
                    href="#"
                    className="text-xs text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <a
                    href="#"
                    className="text-xs text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <a
                    href="#"
                    className="text-xs text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;