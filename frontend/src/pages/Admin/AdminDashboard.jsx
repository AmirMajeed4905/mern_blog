import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiFileText, FiTrendingUp, FiActivity, FiMessageCircle } from "react-icons/fi";
import api from "../../utils/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, posts: 0, categories: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);

        // Fetch Users
        const usersRes = await api.get("/api/auth/users?page=1&limit=1");
        const totalUsers = usersRes.data.totalUsers || 0;

        // Fetch Blogs
        const blogsRes = await api.get("/api/blog?page=1&limit=1");
        const totalPosts = blogsRes.data.totalBlogs || 0;

        // Fetch Categories (if endpoint exists)
        let totalCategories = 0;
        try {
          const categoriesRes = await api.get("/api/categories?page=1&limit=1");
          totalCategories = categoriesRes.data.totalCategories || 0;
        } catch (err) {
          console.log("Categories endpoint not available");
        }

        setStats({ users: totalUsers, posts: totalPosts, categories: totalCategories });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-orange-200 dark:border-gray-700 border-t-orange-600 dark:border-t-orange-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-amber-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: FiUsers,
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      bgPattern: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
      link: "/admin/users",
      change: "+12%",
      changeType: "increase",
    },
    {
      title: "Total Posts",
      value: stats.posts,
      icon: FiFileText,
      gradient: "from-emerald-500 via-green-500 to-teal-600",
      bgPattern: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
      link: "/admin/blogs",
      change: "+8%",
      changeType: "increase",
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: FiActivity,
      gradient: "from-purple-500 via-purple-600 to-pink-600",
      bgPattern: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      link: "/admin/categories",
      change: "+3%",
      changeType: "increase",
    },
    {
      title: "Comments",
      value: "94.2%",
      icon: FiMessageCircle,
      gradient: "from-amber-500 via-orange-500 to-red-500",
      bgPattern: "from-amber-50 to-red-50 dark:from-amber-900/20 dark:to-red-900/20",
      link: "/admin/comments",
      change: "+5.3%",
      changeType: "increase",
    },
    {
      title: "Engagement",
      value: "94.2%",
      icon: FiTrendingUp,
      gradient: "from-amber-500 via-orange-500 to-red-500",
      bgPattern: "from-yellow-50 to-yellow-50 dark:from-yellow-200/20 dark:to-yellow-900/20",
      link: "/admin",
      change: "+5.3%",
      changeType: "increase",
    },

  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard Overview
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Data</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="group relative overflow-hidden"
          >
            <div className={`relative bg-gradient-to-br ${card.bgPattern} p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]`}>
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-2xl transform -translate-x-12 translate-y-12 group-hover:-translate-x-8 group-hover:translate-y-8 transition-transform duration-700"></div>
              </div>

              {/* Icon */}
              <div className={`relative inline-flex p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>

              {/* Content */}
              <div className="relative">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {card.title}
                </p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                  
                  {/* Change Badge */}
                  {card.change && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                      card.changeType === "increase"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    }`}>
                      <FiTrendingUp className={`w-3 h-3 ${card.changeType === "decrease" ? "rotate-180" : ""}`} />
                      {card.change}
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            to="/admin/blogs/add"
            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 border border-orange-200/50 dark:border-gray-600 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white group-hover:scale-110 transition-transform duration-200">
              <FiFileText className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Create Post</span>
          </Link>

          <Link
            to="/admin/add-category"
            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 border border-purple-200/50 dark:border-gray-600 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white group-hover:scale-110 transition-transform duration-200">
              <FiActivity className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Add Category</span>
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 border border-blue-200/50 dark:border-gray-600 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white group-hover:scale-110 transition-transform duration-200">
              <FiUsers className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Manage Users</span>
          </Link>

          <Link
            to="/admin/blogs"
            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 border border-emerald-200/50 dark:border-gray-600 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white group-hover:scale-110 transition-transform duration-200">
              <FiFileText className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">View All Posts</span>
          </Link>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;