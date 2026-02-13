import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Admin/components/SideBar";
import Navbar from "../pages/Admin/components/Navbar";

const AdminLayout = ({ currentUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Overlay for mobile */}
      {sidebarOpen && isMobile && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:fixed z-50 h-screen w-64
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <Sidebar isMobile={isMobile} />
      </aside>

      {/* Main Content */}
      <div
        className={`
          flex-1 flex flex-col min-w-0
          ${!isMobile ? "md:ml-64" : ""}
        `}
      >
        {/* Navbar always on top */}
        <div className="sticky top-0 z-50" style={{marginTop:"30px"} }>
          <Navbar
            currentUser={currentUser}
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>

        {/* Page Content */}
        <main className="p-4 md:p-6 flex-1 overflow-auto">
          <Outlet />

          {/* Example Card */}
          <div className="bg-white p-6 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md mt-6">
            <p>This text and background changes with theme!</p>
          </div>

       
            
         
          
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;