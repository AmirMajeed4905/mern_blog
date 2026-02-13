import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import BlogSection from '../components/Layout/BlogSection';
import { Outlet } from "react-router-dom";

const BlogLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <BlogSection />

      {/* Main Content for nested routes */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default BlogLayout;
