import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import axios from "axios";
// make sure this points to your API utility

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blog/slug/${slug}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: blog.title,
      text: "Check out this blog!",
      url: window.location.href,
    })
    .then(() => console.log("Shared successfully"))
    .catch((err) => console.error("Error sharing:", err));
  } else {
    alert("Sharing is not supported in this browser.");
  }
};




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
      {blog.featuredImage.url && (
        <div className="w-full h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-xl border border-orange-600 shadow-lg mb-8 flex justify-center items-center">
          <img
            src={blog.featuredImage.url}
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
  <button
    onClick={() => {
      const url = encodeURIComponent(window.location.href);
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank",
        "width=600,height=400"
      );
    }}
    className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-6 rounded-lg transition"
  >
    Share on Facebook
  </button>

  <button
    onClick={() => {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent("Check out this blog!");
      window.open(
        `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        "_blank",
        "width=600,height=400"
      );
    }}
    className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-6 rounded-lg transition"
  >
    Share on Twitter
  </button>

<button
  onClick={() => {
    const blogUrl = "http://localhost:5173/blog/slug/the-role-of-quantum-technologies";
    const text = encodeURIComponent("Check out this blog: " + blogUrl);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }}
  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition"
>
  Share on WhatsApp
</button>



</div>

    </div>
  );
};

export default BlogDetail;
