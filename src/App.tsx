import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import HomePage from "./pages/home";
// import Dashboard from "./pages/Dashboard";
// import AdminPage from "./pages/AdminPage";
// import Unauthorized from "./pages/Unauthorized";

import { RequireRole } from "./middleware/requireRole";
import Typography from "@mui/material/Typography";
import CartPage from "./pages/cart";
import ProductsPage from "./pages/products";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota padrão redireciona para login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/carrinho" element={<CartPage />} />
        <Route path="/products" element={<ProductsPage />} />

        <Route
          path="/unauthorized"
          element={
            <>
              <Typography variant="h6">Acesso Negado</Typography>
            </>
          }
        />

        {/* Rotas privadas por role */}
        {/* <Route
          path="/home"
          element={
            <RequireRole allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
              <HomePage />
            </RequireRole>
          }
        /> */}

        <Route
          path="/admin"
          element={
            <RequireRole allowedRoles={["ROLE_ADMIN"]}>
              <Login />
            </RequireRole>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
