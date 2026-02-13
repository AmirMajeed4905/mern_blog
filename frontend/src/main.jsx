import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Context/AuthContext.jsx";
// import Navbar from "./components/Layout/Navbar";
// 
createRoot(document.getElementById('root')).render(
  <AuthProvider>
   <Toaster position="top-right" />
   
    <App />
  </AuthProvider>
    
  
)
