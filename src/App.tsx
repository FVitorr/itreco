import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import HomePage from "./pages/home";
import { RequireRole } from "./middleware/requireRole";
import CartPage from "./pages/cart";
import ProductsPage from "./pages/products";
import { ToastContainer } from "react-toastify";
import { ErrorInterceptor } from "./services/errorInterceptor";
import Unauthorized from "./pages/unauthorized";
import AllProducts from "./pages/productPage";

function App() {
  ErrorInterceptor();
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Rota padrão redireciona para home */}
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/allProducts" element={<AllProducts />} />

        <Route
          path="/cart"
          element={
            <RequireRole allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
              <CartPage />
            </RequireRole>
          }
        />

        <Route
          path="/products"
          element={
            <RequireRole allowedRoles={["ROLE_ADMIN", "ROLE_OPERATOR"]}>
              <ProductsPage />
            </RequireRole>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
