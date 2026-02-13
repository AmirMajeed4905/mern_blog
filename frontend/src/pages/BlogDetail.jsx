import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/blog/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Blog not found");
        return res.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p className="text-center text-xl text-orange-400 mt-10">Loading...</p>;
  if (!blog) return <p className="text-center text-xl text-orange-400 mt-10">Blog Not Found</p>;

  return (
    <div className="bg-black text-white min-h-screen p-6 md:p-10 lg:p-16">
      
      {/* Back Button */}
      <Link to="/" className="flex items-center text-orange-400 hover:text-orange-500 mb-8">
        <ArrowLeft size={22} className="mr-2" /> Back to Blogs
      </Link>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-orange-300 mb-4">
        {blog.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-4 text-gray-400 mb-6">
        <div className="flex items-center gap-1">
          <Clock size={18} /> 
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        {blog.category && (
          <span className="px-3 py-1 bg-orange-800 text-orange-200 rounded-full text-sm font-semibold capitalize">
            {blog.category.name}
          </span>
        )}

        {blog.author && blog.author.name && (
          <span className="italic text-gray-300">by {blog.author.name}</span>
        )}
      </div>

{/* Featured Image */}
{blog.featuredImage && (
  <div className="w-full h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-xl border border-orange-600 shadow-lg mb-8 flex justify-center items-center">
    <img
      src={blog.featuredImage}
      alt={blog.title}
      className="max-w-full max-h-full object-contain"
    />
  </div>
)}

    <div className="prose prose-invert prose-orange max-w-none text-lg leading-relaxed">
  {blog.blogContent}
</div>

      {/* Optional: Extra share / UI */}
      <div className="mt-12 flex justify-center gap-6">
        <button className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-6 rounded-lg transition">
          Share on Facebook
        </button>
        <button className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-6 rounded-lg transition">
          Share on Twitter
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
