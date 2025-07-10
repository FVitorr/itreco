import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { getUserInfo } from "../services/auth";
import { UserDTO } from "../dtos/User.dtos";

export default function Header() {
  const [userInfo, setUserInfo] = useState<UserDTO | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUserInfo();
        setUserInfo(user);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }

    fetchUser();
  }, []);  

  return (
    <>
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
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
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
        </a>

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
            Rua das Flores, 123
          </Typography>
        </Box>

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
          <Button variant="text" size="small">
            Entrar
          </Button>
          <Button variant="contained" size="small" color="error">
            Cadastrar
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => (window.location.href = "/carrinho")}
          >
            <ShoppingCartIcon fontSize="small" />
          </Button>
        </Box>
      </Box>
    </>
  );
}
