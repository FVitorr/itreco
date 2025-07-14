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

export default function HomePage() {
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

  // const stores = [
  //   {
  //     id: 1,
  //     name: "TechStore",
  //     category: "Eletrônicos",
  //     rating: 4.8,
  //     deliveryTime: "1-2 dias",
  //     deliveryFee: "R$ 9,99",
  //     image: null,
  //     products: [
  //       {
  //         id: 1,
  //         name: "Smartphone Galaxy Pro",
  //         description:
  //           "Smartphone com tela de 6.5', 128GB, câmera tripla e bateria de longa duração",
  //         price: 1299.9,
  //         image:
  //           "https://m.media-amazon.com/images/I/71KZXGAb5fL._AC_SL1500_.jpg",
  //       },
  //       {
  //         id: 2,
  //         name: "Fone Bluetooth Premium",
  //         description:
  //           "Fone de ouvido sem fio com cancelamento de ruído e 30h de bateria",
  //         price: 299.9,
  //         image: "/placeholder.svg?height=150&width=200",
  //       },
  //       {
  //         id: 3,
  //         name: "Smartwatch Fitness",
  //         description:
  //           "Relógio inteligente com monitor cardíaco e GPS integrado",
  //         price: 599.9,
  //         image: "/placeholder.svg?height=150&width=200",
  //       },
  //       {
  //         id: 4,
  //         name: "Tablet 10 polegadas",
  //         description:
  //           "Tablet com tela HD, 64GB de armazenamento e processador octa-core",
  //         price: 899.9,
  //         image: "/placeholder.svg?height=150&width=200",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Fashion Style",
  //     category: "Moda",
  //     rating: 4.6,
  //     deliveryTime: "2-3 dias",
  //     deliveryFee: "R$ 12,99",
  //     image: "/placeholder.svg?height=200&width=300",
  //     products: [
  //       {
  //         id: 5,
  //         name: "Camiseta Premium",
  //         description:
  //           "Camiseta 100% algodão com estampa exclusiva e corte moderno",
  //         price: 79.9,
  //         image: "/placeholder.svg?height=150&width=200",
  //       },
  //       {
  //         id: 6,
  //         name: "Calça Jeans Slim",
  //         description: "Calça jeans com elastano, corte slim e lavagem moderna",
  //         price: 149.9,
  //         image: "/placeholder.svg?height=150&width=200",
  //       },
  //       {
  //         id: 7,
  //         name: "Tênis Esportivo",
  //         description:
  //           "Tênis para corrida com tecnologia de amortecimento e design moderno",
  //         price: 299.9,
  //         image: "/placeholder.svg?height=150&width=200",
  //       },
  //       {
  //         id: 8,
  //         name: "Jaqueta Bomber",
  //         description:
  //           "Jaqueta estilo bomber com forro interno e bolsos laterais",
  //         price: 199.9,
  //         image: "/placeholder.svg?height=150&width=200",
  //       },
  //     ],
  //   },
  // ];

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
                  <Badge
                    badgeContent="Aberto"
                    color="success"
                    sx={{ alignSelf: "start", ml: 10, fontWeight: "bold" }}
                  />
                </Card>

                {/* Products Grid */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "repeat(2, 1fr)",
                      lg: "repeat(4, 1fr)",
                    },
                    gap: 3,
                    overflowX: "auto",
                  }}
                >
                  {store.products.map((product) => (
                    <Card
                      key={product.id}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { boxShadow: 6 },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box width={200} height={150} mt={4}>
                        <img
                          src={
                            product.imageUrl || require("../img/icon/photo.png")
                          }
                          alt={product.name}
                          width={200}
                          height={150}
                          style={{
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            objectFit: "contain",
                          }}
                        />
                      </Box>

                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" fontWeight="600" noWrap>
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {product.description}
                        </Typography>
                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h6"
                            color="success.main"
                            fontWeight="bold"
                          >
                            R$ {product.price.toFixed(2).replace(".", ",")}
                          </Typography>
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                          >
                            Adicionar
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
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
