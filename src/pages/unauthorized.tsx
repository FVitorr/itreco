import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f9fafb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxWidth: 400,
          p: 4,
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: "white",
        }}
      >
        <LockIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Acesso Negado
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Você não tem permissão para acessar esta página.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/home")}
        >
          Voltar para o início
        </Button>
      </Box>
    </Box>
  );
}
