import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { getUserInfo } from "../../services/auth";
import { User } from "../../dtos/user.dto";

export default function Header() {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    async function fetchUser() {
      const user = await getUserInfo();
      setUserInfo(user);
    }

    fetchUser();
  }, []);

  const mainAddress = userInfo?.addresses?.[0]; // endereço principal vindo da API

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
      <Box
        onClick={() => navigate("/public")}
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

      <Box sx={{ flexGrow: 1, maxWidth: 400, mx: 2 }}>
        <TextField
          placeholder="Buscar produtos ou lojas"
          size="small"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <SearchIcon fontSize="small" sx={{ color: "#9CA3AF" }} />
              </Box>
            ),
          }}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        {!userInfo && (
          <>
            <Button
              variant="text"
              size="small"
              onClick={() => navigate("/login")}
            >
              Entrar
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => navigate("/cadastrar")}
            >
              Cadastrar
            </Button>
          </>
        )}
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate("/carrinho")}
        >
          <ShoppingCartIcon fontSize="small" />
        </Button>
      </Box>
    </Box>
  );
}
