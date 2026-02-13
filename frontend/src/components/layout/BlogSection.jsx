import React, { useEffect, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom"; // for linking to detail page

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs") // update base URL if your backend is hosted elsewhere
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // short description helper
  const getShortDesc = (text, length = 120) => {
    return text ? (text.length > length ? text.substring(0, length) + "…" : text) : "";
  };

  return (
    <section
      style={{
        padding: "6rem 1rem",
        background: "linear-gradient(180deg, #000000 0%, #0a0a0a 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Outfit:wght@400;500;600;700;800&display=swap');

        .blog-container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .blog-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          text-align: center;
          margin-bottom: 3rem;
          background: linear-gradient(135deg, #FFD700 0%, #FFF 50%, #FFD700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShimmer 4s linear infinite;
        }

        @keyframes textShimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .blog-card {
          background: rgba(255, 215, 0, 0.08);
          border: 1px solid rgba(255, 215, 0, 0.3);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(255, 215, 0, 0.2);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          cursor: pointer;
          animation: fadeInUp 1s ease forwards;
        }

        .blog-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 60px rgba(255, 215, 0, 0.4);
        }

        .blog-image {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .blog-content {
          padding: 1.8rem;
          font-family: 'Outfit', sans-serif;
          color: white;
        }

        .blog-meta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .blog-title-card {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
          color: #FFD700;
        }

        .blog-description {
          color: rgba(255, 255, 255, 0.85);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .read-more {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #FFD700;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .read-more:hover {
          color: #FFA500;
          transform: translateX(5px);
        }
      `}</style>

      <div className="blog-container">
        <h2 className="blog-title">Latest from the Blog</h2>

        <div className="blog-grid">
          {blogs.map((post, i) => (
            <Link
              to={`/blog/${post.slug}`}
              className="blog-card"
              key={post._id}
              style={{ animationDelay: `${i * 0.2}s`, textDecoration: "none" }}
            >
              <img
                src={post.featuredImage}
                alt={post.title}
                className="blog-image"
              />

              <div className="blog-content">
                <div className="blog-meta">
                  <Clock size={16} />
                  <span>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="blog-title-card">{post.title}</h3>
                <p className="blog-description">
                  {getShortDesc(post.blogContent, 120)}
                </p>
                <span className="read-more">
                  Read More <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
