import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import About from "./About";
import ProductDetails from "./ProductDetails";
import NotFound from "./NotFound";
import AddProduct from "./AddProduct";
import Products from "./Products";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";

export default function App() {
  const [status, setStatus] = useState(false)
  return (
    <BrowserRouter>
      <Header loginStatus={status} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/addproduct" element={<AddProduct />} />
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
