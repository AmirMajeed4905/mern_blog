import React, { useState, useEffect } from 'react';
import { Menu, X, Search, User, BookOpen } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/categories' },
    { name: 'Latest', href: '/latest' },
    { name: 'Popular', href: '/popular' },
    { name: 'About', href: '/about' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'
    }`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Outfit:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Outfit', sans-serif;
          overflow-x: hidden;
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.25rem 2rem;
        }

        .nav-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          position: relative;
        }

        .logo-icon {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: logoFloat 3s ease-in-out infinite;
          box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
          transition: all 0.3s ease;
        }

        .logo-icon:hover {
          transform: translateY(-3px) rotate(5deg);
          box-shadow: 0 12px 35px rgba(255, 215, 0, 0.5);
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          font-weight: 900;
          background: linear-gradient(135deg, #FFD700 0%, #FFF 50%, #FFD700 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
          letter-spacing: -0.5px;
        }

        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .desktop-nav {
          display: none;
          gap: 0.5rem;
        }

        @media (min-width: 768px) {
          .desktop-nav {
            display: flex;
          }
        }

        .nav-link {
          position: relative;
          padding: 0.65rem 1.25rem;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          border-radius: 8px;
          letter-spacing: 0.3px;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #FFD700, #FFA500);
          transform: translateX(-50%);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover {
          color: #FFD700;
          background: rgba(255, 215, 0, 0.08);
        }

        .nav-link:hover::before {
          width: 70%;
        }

        .action-buttons {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .icon-button {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .icon-button:hover {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border-color: #FFD700;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);
        }

        .mobile-menu-button {
          display: flex;
        }

        @media (min-width: 768px) {
          .mobile-menu-button {
            display: none;
          }
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 85%;
          max-width: 350px;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -10px 0 50px rgba(0, 0, 0, 0.8);
          overflow-y: auto;
          z-index: 1000;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 215, 0, 0.15);
        }

        .mobile-menu-close {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 215, 0, 0.1);
          border: 1px solid rgba(255, 215, 0, 0.3);
          color: #FFD700;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mobile-menu-close:hover {
          background: #FFD700;
          color: black;
        }

        .mobile-nav {
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-nav-link {
          padding: 1rem 1.25rem;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          font-weight: 500;
          font-size: 1.05rem;
          border-radius: 10px;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
          animation: slideInRight 0.4s ease-out backwards;
        }

        .mobile-nav-link:nth-child(1) { animation-delay: 0.1s; }
        .mobile-nav-link:nth-child(2) { animation-delay: 0.15s; }
        .mobile-nav-link:nth-child(3) { animation-delay: 0.2s; }
        .mobile-nav-link:nth-child(4) { animation-delay: 0.25s; }
        .mobile-nav-link:nth-child(5) { animation-delay: 0.3s; }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .mobile-nav-link:hover {
          background: rgba(255, 215, 0, 0.1);
          border-left-color: #FFD700;
          color: #FFD700;
          padding-left: 1.5rem;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 999;
        }

        .overlay.show {
          opacity: 1;
          pointer-events: all;
        }

        .search-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 1001;
          padding: 1rem;
        }

        .search-modal.open {
          opacity: 1;
          pointer-events: all;
        }

        .search-container {
          width: 100%;
          max-width: 700px;
          animation: scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .search-input-wrapper {
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 1.5rem 4rem 1.5rem 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 215, 0, 0.3);
          border-radius: 15px;
          color: white;
          font-size: 1.25rem;
          outline: none;
          transition: all 0.3s ease;
          font-family: 'Outfit', sans-serif;
        }

        .search-input:focus {
          border-color: #FFD700;
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .search-icon-wrapper {
          position: absolute;
          right: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          color: #FFD700;
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 1rem 1.25rem;
          }

          .logo-text {
            font-size: 1.4rem;
          }

          .logo-icon {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>

      <div className="header-container ">
        <nav className="nav-wrapper">
          {/* Logo */}
          <div className="logo-section">
            <div className="logo-icon">
              <BookOpen size={22} color="black" strokeWidth={2.5} />
            </div>
            <span className="logo-text">BlogHub</span>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              className="icon-button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button className="icon-button" aria-label="User Profile">
              <User size={18} />
            </button>
            <button 
              className="icon-button mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="logo-section">
            <div className="logo-icon" style={{ width: '36px', height: '36px' }}>
              <BookOpen size={20} color="black" strokeWidth={2.5} />
            </div>
            <span className="logo-text" style={{ fontSize: '1.4rem' }}>BlogHub</span>
          </div>
          <button 
            className="mobile-menu-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mobile-nav">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Overlay */}
      <div 
        className={`overlay ${isMobileMenuOpen ? 'show' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Search Modal */}
      <div className={`search-modal ${isSearchOpen ? 'open' : ''}`}>
        <div className="search-container">
          <div className="search-input-wrapper">
            <input 
              type="text"
              className="search-input"
              placeholder="Search articles, categories, authors..."
              autoFocus
              onKeyDown={(e) => e.key === 'Escape' && setIsSearchOpen(false)}
            />
            <div className="search-icon-wrapper">
              <Search size={24} />
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsSearchOpen(false)}
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          <X size={32} />
        </button>
      </div>
    </header>
  );
};

export default Header;