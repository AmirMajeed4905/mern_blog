import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin, Phone, BookOpen, ChevronRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' }
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Help Center', href: '/help' },
      { name: 'Guidelines', href: '/guidelines' },
      { name: 'FAQs', href: '/faq' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Disclaimer', href: '/disclaimer' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: '#1877F2' },
    { icon: Twitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
    { icon: Instagram, href: '#', label: 'Instagram', color: '#E4405F' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#0A66C2' },
    { icon: Youtube, href: '#', label: 'YouTube', color: '#FF0000' }
  ];

  return (
    <footer style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Outfit:wght@300;400;500;600;700&display=swap');

        .footer-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #FFD700, transparent);
          box-shadow: 0 0 50px #FFD700;
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem 2rem;
          position: relative;
          z-index: 1;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255, 215, 0, 0.15);
        }

        @media (max-width: 1024px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 640px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-container {
            padding: 3rem 1.5rem 1.5rem;
          }
        }

        .footer-brand {
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .footer-logo-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
          animation: logoFloat 3s ease-in-out infinite;
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .footer-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #FFD700 0%, #FFF 50%, #FFD700 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .footer-description {
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.8;
          margin-bottom: 1.5rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
        }

        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          color: #FFD700;
          transform: translateX(5px);
        }

        .contact-icon {
          color: #FFD700;
          flex-shrink: 0;
        }

        .footer-column {
          animation: fadeInUp 0.6s ease-out;
        }

        .footer-column:nth-child(2) { animation-delay: 0.1s; }
        .footer-column:nth-child(3) { animation-delay: 0.2s; }
        .footer-column:nth-child(4) { animation-delay: 0.3s; }

        .footer-column-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1.5rem;
          position: relative;
          display: inline-block;
        }

        .footer-column-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #FFD700, transparent);
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          position: relative;
          padding-left: 0;
        }

        .footer-link:hover {
          color: #FFD700;
          padding-left: 10px;
        }

        .footer-link-icon {
          opacity: 0;
          transition: all 0.3s ease;
          color: #FFD700;
        }

        .footer-link:hover .footer-link-icon {
          opacity: 1;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding-top: 2rem;
        }

        @media (max-width: 640px) {
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }

        .footer-copyright {
          color: rgba(255, 255, 255, 0.5);
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
        }

        .footer-copyright a {
          color: #FFD700;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .footer-copyright a:hover {
          color: #FFA500;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .social-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--social-color);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .social-link:hover {
          transform: translateY(-5px);
          border-color: var(--social-color);
          box-shadow: 0 10px 30px var(--social-shadow);
        }

        .social-link:hover::before {
          opacity: 1;
        }

        .social-link svg {
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }

        .social-link:hover svg {
          color: white;
          transform: scale(1.1);
        }

        .newsletter-section {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 165, 0, 0.08) 100%);
          border: 1px solid rgba(255, 215, 0, 0.2);
          border-radius: 15px;
          padding: 2rem;
          margin-bottom: 3rem;
          animation: fadeInUp 0.6s ease-out 0.4s backwards;
        }

        .newsletter-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.5rem;
        }

        .newsletter-description {
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1.5rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
        }

        .newsletter-form {
          display: flex;
          gap: 1rem;
        }

        @media (max-width: 640px) {
          .newsletter-form {
            flex-direction: column;
          }
        }

        .newsletter-input {
          flex: 1;
          padding: 0.9rem 1.25rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 215, 0, 0.3);
          border-radius: 10px;
          color: white;
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .newsletter-input:focus {
          border-color: #FFD700;
          background: rgba(0, 0, 0, 0.5);
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .newsletter-button {
          padding: 0.9rem 2rem;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border: none;
          border-radius: 10px;
          color: black;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .newsletter-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4);
        }

        .newsletter-button:active {
          transform: translateY(0);
        }
      `}</style>

      <div className="footer-glow"></div>

      <div className="footer-container">
        {/* Newsletter Section */}
        <div className="newsletter-section">
          <h3 className="newsletter-title">📧 Subscribe to Our Newsletter</h3>
          <p className="newsletter-description">
            Get the latest articles, tips, and updates delivered to your inbox weekly
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              className="newsletter-input" 
              placeholder="Enter your email address"
              required
            />
            <button type="submit" className="newsletter-button">
              Subscribe Now
            </button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <BookOpen size={26} color="black" strokeWidth={2.5} />
              </div>
              <span className="footer-logo-text">BlogHub</span>
            </div>
            <p className="footer-description">
              Empowering writers and readers worldwide with a platform that celebrates authentic storytelling and meaningful connections.
            </p>
            <div className="footer-contact">
              <div className="contact-item">
                <MapPin className="contact-icon" size={18} />
                <span>123 Blog Street, Digital City, DC 12345</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" size={18} />
                <span>+92 300 1234567</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" size={18} />
                <span>hello@bloghub.com</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="footer-column">
            <h4 className="footer-column-title">Company</h4>
            <div className="footer-links">
              {footerLinks.company.map((link) => (
                <a key={link.name} href={link.href} className="footer-link">
                  <ChevronRight className="footer-link-icon" size={16} />
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Resources Links */}
          <div className="footer-column">
            <h4 className="footer-column-title">Resources</h4>
            <div className="footer-links">
              {footerLinks.resources.map((link) => (
                <a key={link.name} href={link.href} className="footer-link">
                  <ChevronRight className="footer-link-icon" size={16} />
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="footer-column">
            <h4 className="footer-column-title">Legal</h4>
            <div className="footer-links">
              {footerLinks.legal.map((link) => (
                <a key={link.name} href={link.href} className="footer-link">
                  <ChevronRight className="footer-link-icon" size={16} />
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} <a href="/">BlogHub</a>. All rights reserved. Made with ❤️ for writers
          </p>
          <div className="social-links">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="social-link"
                  aria-label={social.label}
                  style={{
                    '--social-color': social.color,
                    '--social-shadow': `${social.color}40`
                  }}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;