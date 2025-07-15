import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // para Clock
import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // para Truck

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "./componentes/header";
import Footer from "./componentes/footer";
import { getCategory } from "../services/category";
import { getTopStores } from "../services/store.service";
import { useState, useEffect } from "react";
import { Category } from "../dtos/category.dto";
import { Store } from "../dtos/store.dto";
import CardProducts from "./componentes/cardProducts";
import { Product } from "../dtos/product.dto";
import { searchProductsOrStores } from "../services/products.service";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategory();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchStores() {
      const data = await getTopStores();
      setStores(data);
    }
    fetchStores();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb" }}>
      {/* Header */}
      <Header />
      {/* Hero Section */}
      {categories.length > 0 && (
        <Box component="section" sx={{ py: 4 }}>
          <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Categorias
            </Typography>

            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                alignItems: "center",
                justifyContent: "space-between",
                scrollSnapType: "x mandatory",
                gap: 2,
                pb: 1,
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {categories.map((category) => (
                <Box
                  key={category.id}
                  sx={{
                    scrollSnapAlign: "start",
                    flexShrink: 0,
                    minWidth: 120,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: "center",
                      cursor: "pointer",
                      "&:hover": { boxShadow: 4 },
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <img
                        src={category.imageUrl || "/placeholder.svg"}
                        alt={category.name}
                        width={60}
                        height={60}
                        style={{ objectFit: "contain", marginBottom: 8 }}
                      />
                      <Typography variant="subtitle2">
                        {category.name}
                      </Typography>
                    </Box>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      {/* Stores and Products */}
      <Box component="section" sx={{ py: 8 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
          {stores.length > 0 ? (
            stores.map((store) => (
              <Box key={store.id} sx={{ mb: 12 }}>
                {/* Store Header */}
                <Card
                  sx={{
                    display: "flex",
                    p: 3,
                    mb: 4,
                    alignItems: "flex-start",
                    boxShadow: 1,
                  }}
                >
                  <img
                    src={require("../img/icon/user.png")}
                    alt={store.owner.firstName}
                    style={{
                      width: 120,
                      height: 80,
                      borderRadius: 8,
                      objectFit: "contain", // redimensiona sem cortar
                      display: "block", // evita espaços extras em alguns layouts
                    }}
                  />

                  <Box sx={{ flexGrow: 1, ml: 3 }}>
                    <Typography variant="h6" fontWeight="bold" mb={0.5}>
                      {store.owner.firstName}
                    </Typography>
                    <Typography color="text.secondary" mb={1}>
                      {store.category?.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 3,
                        fontSize: 14,
                        color: "text.secondary",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <StarIcon fontSize="small" sx={{ color: "#FBBF24" }} />
                        <Typography>{store.rating}</Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <AccessTimeIcon fontSize="small" />
                        <Typography>{store.deliveryTime}</Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <LocalShippingIcon fontSize="small" />
                        <Typography>{store.deliveryTime}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Badge
                      badgeContent="Aberto"
                      color="success"
                      sx={{ alignSelf: "start", mr: 2, fontWeight: "bold" }}
                    />
                  </Box>
                </Card>

                {/* Products Grid */}
                <Box sx={{ overflowX: "auto", whiteSpace: "nowrap", p: 2 }}>
                  <Box
                    sx={{
                      display: "inline-grid",
                      gridAutoFlow: "column", // transforma em grid horizontal
                      gridAutoColumns: "min-content",
                      gap: 2,
                    }}
                  >
                    {store.products.map((product: Product, index) => (
                      <CardProducts key={index} product={product} />
                    ))}
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Box sx={{ textAlign: "center", color: "text.secondary", py: 10 }}>
              <Typography variant="h6">Nenhuma loja encontrada.</Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
