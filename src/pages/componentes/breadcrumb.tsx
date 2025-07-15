import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

export default function BreadcrumbNav() {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          onClick={() => navigate(-1)}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <ArrowBackIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Voltar
        </Link>
        <Link
          color="inherit"
          onClick={() => navigate("/")}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Início
        </Link>
        <Typography color="text.primary">Produtos</Typography>
      </Breadcrumbs>
    </Box>
  );
}
