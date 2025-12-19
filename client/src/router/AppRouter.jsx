import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Home from "../pages/Home.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import Auth from "../pages/Auth.jsx";
import Profile from "../pages/Profile.jsx";
import AdminDashboard from "../pages/Admin/AdminDashboard.jsx"; 
import AddProduct from "../pages/Admin/AddProduct.jsx";
import EditProduct from "../pages/Admin/EditProduct.jsx";
import ManageShops from "../pages/Admin/ManageShops.jsx";

const AppRouter = () => {
  const { token, user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* If logged in, go to Home; otherwise, go to Login */}
        <Route 
          path="/" 
          element={token ? <Home /> : <Navigate to="/login" />} 
        />

        <Route path="/login" element={<Auth />} />

        {/* Protected user routes */}
        <Route 
          path="/product/:name" 
          element={token ? <ProductDetails /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={token ? <Profile /> : <Navigate to="/login" />} 
        />

        {/* Protected Admin routes */}
        <Route 
          path="/admin" 
          element={token && user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin/add-product" 
          element={token && user?.role === "admin" ? <AddProduct /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin/edit-product/:id" 
          element={token && user?.role === "admin" ? <EditProduct /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin/shops" 
          element={token && user?.role === "admin" ? <ManageShops /> : <Navigate to="/" />} 
        />

        
        {/* Catch-all: back to root */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

