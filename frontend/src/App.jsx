import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Lazy loaded pages
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const User = lazy(() => import("./pages/Admin/User"));
const Blogs = lazy(() => import("./pages/Admin/Blogs"));
const Profile = lazy(() => import("./pages/Admin/Profile"));
const AdminLayout = lazy(() => import("./Layouts/AdminLayout"));
const NotFoundPage = lazy(() => import("./pages/Notfound"));
const UserLayout = lazy(() => import("./pages/UserLayout"));
const BlogLayout = lazy(() => import("./pages/BlogLayout"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const PostAddForm = lazy(() => import("./components/forms/PostAddForm"));
const CategoryForm = lazy(() => import("./components/forms/CategoryForm"));
const CategoryList = lazy(() => import("./pages/Admin/CategoryList"));
const CommentList = lazy(() => import("./pages/Admin/Commentlist"));
const ViewPost = lazy(() => import("./pages/Admin/ViewPost"));
const EditPost = lazy(() => import("./pages/Admin/EditPost"));

// Routes guards
import AdminRoute from "./routes/AdminRoute";
// import BlogRoute from "./routes/BlogRoute";

function App() {
  // Temporary currentUser for demo; replace with auth call
  const currentUser = { name: "Admin", role: "admin" };

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-[60vh]">
              <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
            </div>
          }
        >
          <Routes>
            {/* PUBLIC USER ROUTES */}
            {/* PUBLIC USER ROUTES */}
            <Route path="/" element={<UserLayout />}>
              <Route
                index
                element={<h1 className="text-2xl font-bold">Welcome to the User Dashboard</h1>}
              />
            </Route>

            {/* Blog routes */}
              <Route path="/blogs" element={<BlogLayout />}>
                  <Route index element={<h1 className="text-2xl font-bold">Welcome to the Blog Section</h1>} /> 
              

              <Route path="slug/:slug" element={<BlogDetail />} />
              </Route>



            {/* AUTH ROUTES */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<AdminRoute user={currentUser}><AdminLayout currentUser={currentUser} /></AdminRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<User />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="profile" element={<Profile />} />
              <Route path="blogs/add" element={<PostAddForm />} />
              <Route path="add-category" element={<CategoryForm />} />
              <Route path="categories" element={<CategoryList />} />
              <Route path="comments" element={<CommentList />} />
              <Route path="blog/:id" element={<ViewPost />} />
              <Route path="blog/edit/:id" element={<EditPost />} />
            </Route>

            {/* 404 PAGE */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
