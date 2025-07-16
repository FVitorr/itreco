import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CircularProgress from "@mui/material/CircularProgress";

import Card from "@mui/material/Card";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "./componentes/header";
import Footer from "./componentes/footer";
import { getCategory } from "../services/category.service";
import { getTopStores } from "../services/store.service";
import { useState, useEffect } from "react";
import { Category } from "../dtos/category.dto";
import { Store } from "../dtos/store.dto";
import CardProducts from "./componentes/cardProducts";
import { Product } from "../dtos/product.dto";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const cats = await getCategory();
        const stores = await getTopStores();

        setCategories(cats);
        setStores(stores);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f9fafb",
        }}
      >
        <CircularProgress size={60} color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb" }}>
      {/* Header */}
      <Header />

      {/* Categorias */}
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
                gap: 2,
                pb: 1,
                scrollSnapType: "x mandatory",
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
                    onClick={() =>
                      navigate("/AllProducts", {
                        state: { categoryId: category.id },
                      })
                    }
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

      {/* Lojas e Produtos */}
      <Box component="section" sx={{ py: 8 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
          {stores.length > 0 ? (
            stores.map((store) => (
              <Box key={store.id} sx={{ mb: 12 }}>
                {/* Card da Loja */}
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
                      objectFit: "contain",
                      display: "block",
                    }}
                  />

                  <Box sx={{ flexGrow: 1, ml: 3 }}>
                    <Typography variant="h6" fontWeight="bold" mb={0.5}>
                      {store.owner.firstName}
                    </Typography>
                    <Typography color="text.secondary" mb={1}>
                      {store.category?.name || "Categoria não definida"}
                    </Typography>

                    {/* Informações */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 3,
                        fontSize: 14,
                        color: "text.secondary",
                        flexWrap: "wrap",
                      }}
                    >
                      {/* Avaliação */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <Typography variant="body2">Avaliação:</Typography>
                        <Rating
                          value={store.rating}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                        <Typography variant="body2" ml={0.5}>
                          ({store.rating.toFixed(1)})
                        </Typography>
                      </Box>

                      {/* Tempo médio */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <AccessTimeIcon fontSize="small" />
                        <Typography variant="body2">Tempo médio:</Typography>
                        <Typography variant="body2" ml={0.5}>
                          {store.deliveryTime} min
                        </Typography>
                      </Box>

                      {/* Frete */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <LocalShippingIcon fontSize="small" />
                        <Typography variant="body2">Frete estimado:</Typography>
                        <Typography variant="body2" ml={0.5}>
                          R${" "}
                          {(store.deliveryTime * 0.5)
                            .toFixed(2)
                            .replace(".", ",")}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Badge de status */}
                  <Box sx={{ mr: 3 }}>
                    <Badge
                      badgeContent="Aberto"
                      color="success"
                      sx={{ alignSelf: "start", ml: 2, fontWeight: "bold" }}
                    />
                  </Box>
                </Card>

                {/* Produtos */}
                <Box sx={{ px: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      overflowX: "auto",
                      gap: 2,
                      pb: 1,
                      scrollSnapType: "x mandatory",
                      justifyContent: "flex-start",
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }}
                  >
                    {store.products.map((product: Product, index) => (
                      <Box
                        key={index}
                        sx={{
                          minWidth: 250,
                          scrollSnapAlign: "start",
                          flexShrink: 0,
                        }}
                      >
                        <CardProducts product={product} />
                      </Box>
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
