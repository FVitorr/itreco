import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {getUserInfo, hasRole} from "../../services/auth.service";
import {User} from "../../dtos/user.dto";
import {MotionButton} from "./button";

export default function Header() {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    async function fetchUser() {
      const user = await getUserInfo();
      console.log("User Info:", user);
      sessionStorage.setItem("user", JSON.stringify(user));
      setUserInfo(user);
    }

    fetchUser();
  }, []);

  const search = (term: string) => {
    if (!term.trim()) return;
    navigate("/allProducts", { state: { searchTerm: term } });
  };


  const mainAddress = userInfo?.addresses?.[0];

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        px: 3,
        boxShadow: 1,
        bgcolor: "background.paper",
      }}
    >
      {/* Logo */}
      <Box
        onClick={() => navigate("/home")}
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            bgcolor: "error.main",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: 1,
          }}
        >
          <LocalShippingIcon fontSize="small" sx={{ color: "#fff" }} />
        </Box>
        <Typography variant="h6" color="error">
          MarketPlace
        </Typography>
      </Box>

      {/* Endereço */}
      {userInfo && mainAddress && (
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
            color: "text.secondary",
          }}
        >
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">Enviar para</Typography>
          <Typography variant="body2" fontWeight="medium">
            {`${mainAddress.street}, ${mainAddress.number}`}
          </Typography>
        </Box>
      )}

      {/* Campo de busca + botão */}
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: 400,
          mx: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          placeholder="Buscar produtos ou lojas"
          size="small"
          variant="outlined"
          fullWidth
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search(searchValue);
            }
          }}
          InputProps={{
            startAdornment: (
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <SearchIcon fontSize="small" sx={{ color: "#9CA3AF" }} />
              </Box>
            ),
          }}
        />

        <MotionButton
          variant="contained"
          color="error"
          fullWidth
          size="small"
          sx={{ height: "100%" }}
          onClick={() => search(searchValue)}
        >
          <SearchIcon />
        </MotionButton>
      </Box>

      {/* Botões de login/cadastro/carrinho */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          height: "40px",
        }}
      >
        {!userInfo ? (
          <>
            <MotionButton
              variant="text"
              fullWidth
              onClick={() => navigate("/login")}
            >
              Entrar
            </MotionButton>
            <MotionButton
              variant="contained"
              fullWidth
              size="small"
              sx={{ height: "100%" }}
              color="error"
              onClick={() => navigate("/register")}
            >
              Cadastrar
            </MotionButton>
          </>
        ) : (
          <Box sx={{ mr: 1 }}>
            <Typography variant="body2" sx={{ alignSelf: "center" }}>
              Olá, {userInfo.firstName}
            </Typography>
          </Box>
        )}

        {!hasRole(userInfo?.roles, ["ROLE_SELLER", "ROLE_ADMIN"]) ? (
          <MotionButton
            variant="contained"
            color="error"
            fullWidth
            size="small"
            sx={{ height: "100%" }}
            onClick={() => navigate("/cart")}
          >
            <ShoppingCartIcon />
          </MotionButton>
        ) : (
          <MotionButton
            variant="contained"
            color="error"
            fullWidth
            size="small"
            sx={{ height: "100%" }}
            onClick={() => navigate("/products")}
          >
            <AdminPanelSettingsIcon />
          </MotionButton>
        )}

        {hasRole(userInfo?.roles, ["ROLE_ADMIN"]) ? (
          <MotionButton
            variant="contained"
            color="error"
            fullWidth
            size="small"
            sx={{ height: "100%" }}
            onClick={() => navigate("/cart")}
          >
            <ShoppingCartIcon />
          </MotionButton>
        ) : null}
      </Box>
    </Box>
  );
}
