import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import User from "./pages/Admin/User";
import Blogs from "./pages/Admin/Blogs";
import Profile from "./pages/Admin/Profile";
import AdminLayout from "./pages/Admin/AdminLayout";

import AdminRoute from "./routes/AdminRoute";
import NotFoundPage from "./pages/Notfound";
function App() {
  // later ye /api/auth/me se ayega
  const currentUser = { name: "Admin", role: "admin" };

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
         <Route path="*" element={<NotFoundPage />} /> {/* 404 route */}
          {/* PUBLIC ROUTES */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* 🔒 ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <AdminRoute user={currentUser}>
                <AdminLayout currentUser={currentUser} />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<User />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="profile" element={<Profile />} />
          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
