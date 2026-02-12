import React from 'react';
import { ArrowRight, Zap, CheckCircle } from 'lucide-react';

const CTASection = () => {
  const features = [
    'No credit card required',
    'Unlimited articles',
    'Premium templates',
    'Analytics dashboard'
  ];

  return (
    <section style={{ 
      padding: '6rem 1rem',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Outfit:wght@400;500;600;700;800&display=swap');

        .cta-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .cta-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.4;
        }

        .glow-1 {
          background: radial-gradient(circle, #FFD700, transparent);
          top: -20%;
          left: -10%;
          animation: glowPulse 8s ease-in-out infinite;
        }

        .glow-2 {
          background: radial-gradient(circle, #FFA500, transparent);
          bottom: -20%;
          right: -10%;
          animation: glowPulse 8s ease-in-out infinite;
          animation-delay: 4s;
        }

        @keyframes glowPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }

        .cta-container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .cta-card {
          background: linear-gradient(135deg, 
            rgba(255, 215, 0, 0.1) 0%, 
            rgba(255, 165, 0, 0.05) 50%,
            rgba(255, 215, 0, 0.1) 100%
          );
          border: 2px solid rgba(255, 215, 0, 0.3);
          border-radius: 30px;
          padding: 4rem 3rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(255, 215, 0, 0.2);
          animation: fadeInScale 1s ease-out;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .cta-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 215, 0, 0.05),
            transparent
          );
          animation: shimmerMove 6s linear infinite;
        }

        @keyframes shimmerMove {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .cta-icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border-radius: 20px;
          margin-bottom: 2rem;
          box-shadow: 0 15px 40px rgba(255, 215, 0, 0.4);
          animation: iconFloat 3s ease-in-out infinite;
          position: relative;
          z-index: 1;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        .cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 1.25rem;
          background: linear-gradient(135deg, #FFD700 0%, #FFF 50%, #FFD700 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 3s linear infinite;
          position: relative;
          z-index: 1;
        }

        @keyframes shimmerText {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .cta-description {
          font-family: 'Outfit', sans-serif;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
          font-weight: 400;
          position: relative;
          z-index: 1;
        }

        .cta-features {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          position: relative;
          z-index: 1;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          animation: slideIn 0.6s ease-out backwards;
        }

        .feature-item:nth-child(1) { animation-delay: 0.2s; }
        .feature-item:nth-child(2) { animation-delay: 0.3s; }
        .feature-item:nth-child(3) { animation-delay: 0.4s; }
        .feature-item:nth-child(4) { animation-delay: 0.5s; }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-check {
          color: #FFD700;
          flex-shrink: 0;
        }

        .cta-button-wrapper {
          display: flex;
          gap: 1.25rem;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
          animation: slideIn 0.6s ease-out 0.6s backwards;
        }

        .cta-button {
          padding: 1.15rem 3rem;
          border-radius: 15px;
          font-size: 1.1rem;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          border: none;
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
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

        .cta-button:hover::before {
          width: 400px;
          height: 400px;
        }

        .cta-button-primary {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          color: black;
          box-shadow: 0 15px 40px rgba(255, 215, 0, 0.4);
        }

        .cta-button-primary:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(255, 215, 0, 0.6);
        }

        .cta-button-primary:active {
          transform: translateY(-2px);
        }

        .cta-button-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 2px solid rgba(255, 215, 0, 0.4);
          backdrop-filter: blur(10px);
        }

        .cta-button-secondary:hover {
          background: rgba(255, 215, 0, 0.1);
          border-color: #FFD700;
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(255, 215, 0, 0.3);
        }

        .button-icon {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .cta-button:hover .button-icon {
          transform: translateX(5px);
        }

        .button-text {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .cta-card {
            padding: 3rem 2rem;
            border-radius: 25px;
          }

          .cta-features {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }

          .cta-button-wrapper {
            flex-direction: column;
            width: 100%;
          }

          .cta-button {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .cta-card {
            padding: 2.5rem 1.5rem;
          }

          .cta-icon-wrapper {
            width: 65px;
            height: 65px;
          }
        }
      `}</style>

      <div className="cta-background">
        <div className="cta-glow glow-1"></div>
        <div className="cta-glow glow-2"></div>
      </div>

      <div className="cta-container">
        <div className="cta-card">
          <div className="cta-icon-wrapper">
            <Zap size={40} color="black" strokeWidth={2.5} />
          </div>

          <h2 className="cta-title">
            Ready to Start Your<br />Blogging Journey?
          </h2>

          <p className="cta-description">
            Join thousands of writers who have already transformed their ideas into 
            compelling stories. Start creating amazing content today!
          </p>

          <div className="cta-features">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <CheckCircle className="feature-check" size={20} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="cta-button-wrapper">
            <button className="cta-button cta-button-primary">
              <span className="button-text">Get Started Now</span>
              <ArrowRight className="button-icon" size={22} />
            </button>
            <button className="cta-button cta-button-secondary">
              <span className="button-text">Learn More</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;