// src/admin/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../../utils/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, posts: 0 });


  useEffect(() => {
  const getStats = async () => {
    try {
      console.log("amir")
      const usersRes = await api.get("/api/auth/users");
      // const postsRes = await api.get("/api/posts");
      //  posts: postsRes.data.posts.length 
      setStats({ users: usersRes.data.users.length});
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  getStats();
}, []);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-bold">Total Users</h3>
        <p className="text-3xl mt-2">{stats.users}</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-bold">Total Posts</h3>
        <p className="text-3xl mt-2">{stats.posts}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
