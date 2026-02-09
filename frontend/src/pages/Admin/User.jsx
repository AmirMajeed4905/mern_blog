import React, { useState, useEffect } from "react";
import api from "../../utils/axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 10; // Users per page

  // Fetch users from backend
  const fetchUsers = async (pageNumber) => {
    try {
      setLoading(true);
      const res = await api.get(`/api/auth/users?page=${pageNumber}&limit=${limit}`);
      const data = res.data;

      setUsers(data.users || []);
      setTotalPages(Math.max(data.totalPages || 1, 1)); // Ensure at least 1 page
      setTotalUsers(data.totalUsers || 0);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch whenever page changes
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // Debug: check backend response
  useEffect(() => {
    console.log("Page:", page, "TotalPages:", totalPages, "TotalUsers:", totalUsers);
  }, [page, totalPages, totalUsers]);

  if (loading)
    return <div className="p-6 text-gray-600 text-center">Loading users...</div>;

  return (
    <div className="p-1">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Users</h1>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center gap-2 overflow-x-auto py-2">
  {/* Prev */}
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
      page === 1
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-gray-200 hover:bg-gray-300"
    }`}
  >
    Prev
  </button>

  {/* Page buttons */}
  {Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => {
      // Always show first 2, last 2, current ±2
      return (
        p <= 2 ||
        p > totalPages - 2 ||
        (p >= page - 2 && p <= page + 2)
      );
    })
    .map((p, idx, arr) => {
      // Add ellipsis
      const prev = arr[idx - 1];
      const isGap = prev && p - prev > 1;
      return (
        <React.Fragment key={p}>
          {isGap && <span className="px-2 text-gray-500">...</span>}
          <button
            onClick={() => setPage(p)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              p === page
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {p}
          </button>
        </React.Fragment>
      );
    })}

  {/* Next */}
  <button
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={page === totalPages}
    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
      page === totalPages
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-gray-200 hover:bg-gray-300"
    }`}
  >
    Next
  </button>
</div>


      {/* Total Users */}
      <p className="mt-4 text-sm text-gray-500">
        Total users: {totalUsers}
      </p>
    </div>
  );
};

export default Users;
