import React from 'react';
import Navbar from '../components/Layout/Navbar'; // assuming you have a Navbar component
import Header from '../components/Layout/Header';
import Blog from './Blog';
import Footer from '../components/Layout/Footer'; // optional
import TestimonialSlider from "../components/Layout/TestimonialSlider";
import CTASection from "../components/Layout/Ctasection";
import Hero from '../components/Layout/Hero';
import BlogSection from '../components/Layout/BlogSection';

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      {/* <Navbar /> */}
      <Header />

      <Hero/>

<BlogSection />

      {/* <Blog /> */}
       
      <TestimonialSlider />
      <CTASection />
  
      {/* Main Content */}
      <main className="flex-1 p-4">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
