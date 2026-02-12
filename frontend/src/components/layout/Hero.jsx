import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, Users, BookOpen, Sparkles } from 'lucide-react';

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Stories', 'Ideas', 'Insights', 'Thoughts'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Writers' },
    { icon: BookOpen, value: '100K+', label: 'Articles Published' },
    { icon: TrendingUp, value: '5M+', label: 'Monthly Readers' }
  ];

  return (
    <section style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '80px'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Outfit:wght@300;400;500;600;700;800&display=swap');

        .hero-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #FFD700, transparent);
          top: -10%;
          right: -10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #FFA500, transparent);
          bottom: -5%;
          left: -5%;
          animation-delay: 5s;
        }

        .orb-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #FFD700, transparent);
          top: 40%;
          left: 50%;
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 30px) scale(1.05); }
        }

        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 215, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 215, 0, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 3rem 2rem;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 165, 0, 0.15) 100%);
          border: 1px solid rgba(255, 215, 0, 0.3);
          border-radius: 50px;
          color: #FFD700;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 2rem;
          animation: fadeInDown 0.8s ease-out, pulse 2s ease-in-out infinite;
          font-family: 'Outfit', sans-serif;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4); }
          50% { box-shadow: 0 0 0 15px rgba(255, 215, 0, 0); }
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 900;
          line-height: 1.15;
          margin-bottom: 1.5rem;
          color: white;
          animation: fadeInUp 1s ease-out 0.2s backwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-title-highlight {
          position: relative;
          display: inline-block;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-title-highlight::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 8px;
          background: linear-gradient(90deg, #FFD700, #FFA500);
          border-radius: 4px;
          opacity: 0.3;
        }

        .rotating-words {
          display: inline-block;
          position: relative;
          height: 1.2em;
          vertical-align: bottom;
        }

        .word {
          position: absolute;
          left: 0;
          right: 0;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .word.active {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-description {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.1rem, 2vw, 1.35rem);
          color: rgba(255, 255, 255, 0.7);
          max-width: 700px;
          margin: 0 auto 2.5rem;
          line-height: 1.8;
          font-weight: 400;
          animation: fadeInUp 1s ease-out 0.4s backwards;
        }

        .cta-buttons {
          display: flex;
          gap: 1.25rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 4rem;
          animation: fadeInUp 1s ease-out 0.6s backwards;
        }

        .btn {
          padding: 1rem 2.5rem;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          border: none;
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          color: black;
          box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255, 215, 0, 0.5);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid rgba(255, 215, 0, 0.3);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 215, 0, 0.1);
          border-color: #FFD700;
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255, 215, 0, 0.2);
        }

        .btn-icon {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .btn:hover .btn-icon {
          transform: translateX(5px);
        }

        .stats-container {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease-out 0.8s backwards;
        }

        .stat-item {
          text-align: center;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 165, 0, 0.05) 100%);
          border: 1px solid rgba(255, 215, 0, 0.15);
          border-radius: 15px;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .stat-item:hover {
          transform: translateY(-5px);
          border-color: #FFD700;
          box-shadow: 0 15px 40px rgba(255, 215, 0, 0.2);
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.1) 100%);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          margin: 0 auto 1rem;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: black;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .stat-value {
          font-family: 'Outfit', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #FFD700;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .hero-container {
            padding: 2rem 1.5rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .btn {
            justify-content: center;
          }

          .stats-container {
            gap: 1.5rem;
          }

          .stat-item {
            padding: 1.25rem 1.5rem;
          }
        }
      `}</style>

      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={18} />
            <span>Join 50,000+ Content Creators</span>
          </div>

          <h1 className="hero-title">
            Share Your{' '}
            <div className="rotating-words">
              {words.map((word, index) => (
                <span 
                  key={word} 
                  className={`word ${index === currentWord ? 'active' : ''}`}
                >
                  {word}
                </span>
              ))}
            </div>
            <br />
            With The <span className="hero-title-highlight">World</span>
          </h1>

          <p className="hero-description">
            Start your blogging journey today. Create, share, and grow your audience 
            with our powerful and intuitive platform designed for modern content creators.
          </p>

          <div className="cta-buttons">
            <button className="btn btn-primary">
              <span style={{ position: 'relative', zIndex: 1 }}>Start Writing Free</span>
              <ArrowRight className="btn-icon" size={20} />
            </button>
            <button className="btn btn-secondary">
              <span style={{ position: 'relative', zIndex: 1 }}>Explore Blogs</span>
            </button>
          </div>

          <div className="stats-container">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="stat-item">
                  <div className="stat-icon">
                    <Icon size={24} strokeWidth={2.5} />
                  </div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;