import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Register from "./pages/Register/Register";
import AboutUs from "./pages/AboutUs/AboutUs";
import Login from "./pages/Login/Login";
import Header from "./assets/Layout/Header/Header";
import Footer from "./assets/Layout/Footer/Footer";
import User from "./pages/User/User";
import Product from "./pages/Product/Product";
import AdminRoutes from "./AdminRoutes/AdminRoutes";
import { Cart } from "./assets/Layout/Cart/Cart";
import { ProductDetail } from "./componnets/ProductDetail/ProductDetail";
import Orders from "./pages/Orders/Orders";
import Pass from "./pages/Pass/Pass"

function App() {
  return (
    <>
      <Header />
      <Cart />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/pass" element={<Pass />} />
          <Route
            path="/admin-user"
            element={
              <AdminRoutes>
                <User />
              </AdminRoutes>
            }
          />
          <Route
            path="/admin-product"
            element={
              <AdminRoutes>
                {" "}
                <Product />{" "}
              </AdminRoutes>
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
