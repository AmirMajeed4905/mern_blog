import React, { useEffect, useState } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0); // total posts
  const LIMIT = 10;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/blog?page=${page}&limit=${LIMIT}`
        );
        const data = await res.json();

        // backend should return: { blogs: [...], totalBlogs: X, totalPages: Y }
        setBlogs(data.blogs || []);
        setTotalPages(data.totalPages || 1);
        setTotalPosts(data.totalBlogs || 0);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-gray-600">
        <div className="animate-pulse text-lg">Loading blogs...</div>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
        Blogs Dashboard
      </h1>

      {/* Total Posts Card */}
      <div className="mb-4 text-lg font-semibold text-gray-700">
        Total Posts: {totalPosts}
      </div>

      {/* Responsive table wrapper */}
      <div className="relative w-full overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="px-2 py-3 text-left">#</th>
              <th className="px-2 py-3 text-left">Title</th>
              <th className="px-2 py-3 text-left">Author</th>
              <th className="px-2 py-3 text-left">Category</th>
              <th className="px-2 py-3 text-left">Slug</th>
              <th className="px-2 py-3 text-left">Description</th>
              <th className="px-2 py-3 text-left">Image</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog._id} className="border-t">
                <td className="px-2 py-2">{index + 1 + (page - 1) * LIMIT}</td>
                <td className="px-2 py-2 font-semibold">{blog.title}</td>
                <td className="px-2 py-2">{blog.author?.name || "N/A"}</td>
                <td className="px-2 py-2">{blog.category?.name || "N/A"}</td>
                <td className="px-2 py-2">{blog.slug}</td>
                <td className="px-2 py-2 max-w-xs truncate">{blog.blogContent}</td>
                <td className="px-2 py-2">
                  {blog.featuredImage && (
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2 flex-wrap">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 bg-orange-500 text-white rounded disabled:opacity-50 hover:bg-orange-600 transition"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-orange-700 text-white"
                : "bg-orange-200 hover:bg-orange-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 bg-orange-500 text-white rounded disabled:opacity-50 hover:bg-orange-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blog;
