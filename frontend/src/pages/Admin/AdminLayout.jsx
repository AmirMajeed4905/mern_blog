// src/admin/components/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/SideBar";
import Navbar from "./components/Navbar";

const AdminLayout = ({ currentUser }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar currentUser={currentUser} />
        <main className="p-6 flex-1 overflow-auto">
          <Outlet /> {/* Nested pages will render here */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
