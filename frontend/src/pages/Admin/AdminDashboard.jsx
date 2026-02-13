import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, posts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const getStats = async () => {
    try {
      setLoading(true);

      // Users
      const usersRes = await api.get("/api/auth/users?page=1&limit=1");
      const totalUsers = usersRes.data.totalUsers || 0;

      // Blogs
      const blogsRes = await api.get("/api/blog?page=1&limit=1"); // minimal request
      // assuming backend returns totalBlogs
      const totalPosts = blogsRes.data.totalBlogs || blogsRes.data.totalPages * 1 || 0;

      setStats({ users: totalUsers, posts: totalPosts });
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };

  getStats();
}, []);


  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);
        const usersRes = await api.get("/api/auth/users?page=1&limit=1");
        const totalUsers = usersRes.data.totalUsers || 0;

        // Placeholder for posts
        const totalPosts = 0;

        setStats({ users: totalUsers, posts: totalPosts });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  if (loading)
    return <div className="p-6 text-center text-gray-500 text-lg">Loading dashboard...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Total Users */}
        <Link to="/admin/users">
          <div className="relative bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-xl rounded-2xl p-6 transform transition-transform hover:-translate-y-2 hover:scale-105 duration-300 cursor-pointer">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-4xl font-bold mt-2">{stats.users}</p>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-300 rounded-full opacity-30 animate-pulse"></div>
          </div>
        </Link>

        {/* Total Posts */}
        <Link to="/admin/blogs">
          <div className="relative bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white shadow-xl rounded-2xl p-6 transform transition-transform hover:-translate-y-2 hover:scale-105 duration-300 cursor-pointer">
            <h3 className="text-lg font-semibold">Total Posts</h3>
            <p className="text-4xl font-bold mt-2">{stats.posts}</p>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-300 rounded-full opacity-30 animate-pulse"></div>
          </div>
        </Link>

        {/* Other Stats */}
        <div className="relative bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white shadow-xl rounded-2xl p-6 transform transition-transform hover:-translate-y-2 hover:scale-105 duration-300 cursor-pointer">
          <h3 className="text-lg font-semibold">Other Stats</h3>
          <p className="text-4xl font-bold mt-2">0</p>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-purple-300 rounded-full opacity-30 animate-pulse"></div>
        </div>

      </div>

      {/* Additional sections / charts can go here */}
    </div>
  );
};

export default AdminDashboard;
