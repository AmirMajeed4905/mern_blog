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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Overlay */}
      {sidebarOpen && isMobile && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-50 h-screen
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <Sidebar isMobile={isMobile} />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <Navbar
          currentUser={currentUser}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="p-4 md:p-6 flex-1 overflow-auto">
          <Outlet />
          <div className="bg-white p-6 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow">
  <p>This text and background changes with theme!</p>
</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
