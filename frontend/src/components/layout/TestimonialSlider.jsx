import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialSlider = () => {
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Content Writer",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      text: "This platform has completely transformed how I share my thoughts. The interface is beautiful and the community is amazing!"
    },
    {
      id: 2,
      name: "Ali Hassan",
      role: "Tech Blogger",
      image: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      text: "Best blogging platform I've ever used. The features are incredible and the design is stunning!"
    },
    {
      id: 3,
      name: "Fatima Khan",
      role: "Travel Enthusiast",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      text: "I love how easy it is to create and share stories. My travel blog has never looked better!"
    },
    {
      id: 4,
      name: "Usman Malik",
      role: "Food Critic",
      image: "https://i.pravatar.cc/150?img=7",
      rating: 5,
      text: "The perfect platform for food bloggers. My recipes get so much engagement here!"
    },
    {
      id: 5,
      name: "Ayesha Raza",
      role: "Lifestyle Blogger",
      image: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      text: "Amazing experience! The analytics and engagement tools are exactly what I needed."
    },
    {
      id: 6,
      name: "Hamza Sheikh",
      role: "Developer",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      text: "Clean, fast, and feature-rich. This is how modern blogging should be done!"
    }
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section style={{ padding: '5rem 1rem', background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Outfit:wght@400;500;600&display=swap');

        .testimonial-section {
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
          animation: fadeInUp 0.8s ease-out;
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

        .section-subtitle {
          color: #FFD700;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 1rem;
          font-family: 'Outfit', sans-serif;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          background: linear-gradient(135deg, #FFD700 0%, #FFF 50%, #FFD700 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          animation: shimmer 3s linear infinite;
        }

        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .section-description {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.8;
          font-family: 'Outfit', sans-serif;
        }

        .slider-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }

        .slider-track {
          display: flex;
          gap: 2rem;
          animation: scroll 40s linear infinite;
          will-change: transform;
        }

        .slider-track.paused {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .testimonial-card {
          flex: 0 0 auto;
          width: 400px;
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 165, 0, 0.05) 100%);
          border: 1px solid rgba(255, 215, 0, 0.2);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          backdrop-filter: blur(10px);
        }

        .testimonial-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: #FFD700;
          box-shadow: 0 20px 60px rgba(255, 215, 0, 0.3);
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.1) 100%);
        }

        .quote-icon {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          color: rgba(255, 215, 0, 0.2);
          transition: all 0.3s ease;
        }

        .testimonial-card:hover .quote-icon {
          color: rgba(255, 215, 0, 0.4);
          transform: scale(1.1) rotate(-5deg);
        }

        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .testimonial-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid #FFD700;
          object-fit: cover;
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
          transition: all 0.3s ease;
        }

        .testimonial-card:hover .testimonial-avatar {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(255, 215, 0, 0.5);
        }

        .testimonial-info {
          flex: 1;
        }

        .testimonial-name {
          font-family: 'Outfit', sans-serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.25rem;
        }

        .testimonial-role {
          font-size: 0.9rem;
          color: rgba(255, 215, 0, 0.8);
          font-weight: 500;
        }

        .rating {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }

        .star-icon {
          color: #FFD700;
          animation: starPulse 2s ease-in-out infinite;
        }

        .star-icon:nth-child(1) { animation-delay: 0s; }
        .star-icon:nth-child(2) { animation-delay: 0.1s; }
        .star-icon:nth-child(3) { animation-delay: 0.2s; }
        .star-icon:nth-child(4) { animation-delay: 0.3s; }
        .star-icon:nth-child(5) { animation-delay: 0.4s; }

        @keyframes starPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .testimonial-text {
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .testimonial-card {
            width: 320px;
          }

          .slider-track {
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .testimonial-card {
            width: 280px;
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="testimonial-section">
        <div className="section-header">
          <div className="section-subtitle">Testimonials</div>
          <h2 className="section-title">What Our Writers Say</h2>
          <p className="section-description">
            Join thousands of satisfied bloggers who have transformed their content creation journey with us
          </p>
        </div>

        <div className="slider-container">
          <div 
            className={`slider-track ${isPaused ? 'paused' : ''}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className="testimonial-card">
                <Quote className="quote-icon" size={40} />
                
                <div className="testimonial-header">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-info">
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-role">{testimonial.role}</div>
                  </div>
                </div>

                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="star-icon" size={18} fill="#FFD700" />
                  ))}
                </div>

                <p className="testimonial-text">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;