import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn"; // para MapPin
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // para Clock
import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // para Truck

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import imagensDestaques from "../utils/loadImage";
import Header from "./componentes/header";
import Footer from "./componentes/footer";

export default function HomePage() {
  const stores = [
    {
      id: 1,
      name: "TechStore",
      category: "Eletrônicos",
      rating: 4.8,
      deliveryTime: "1-2 dias",
      deliveryFee: "R$ 9,99",
      image: null,
      products: [
        {
          id: 1,
          name: "Smartphone Galaxy Pro",
          description:
            "Smartphone com tela de 6.5', 128GB, câmera tripla e bateria de longa duração",
          price: 1299.9,
          image:
            "https://m.media-amazon.com/images/I/71KZXGAb5fL._AC_SL1500_.jpg",
        },
        {
          id: 2,
          name: "Fone Bluetooth Premium",
          description:
            "Fone de ouvido sem fio com cancelamento de ruído e 30h de bateria",
          price: 299.9,
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: 3,
          name: "Smartwatch Fitness",
          description:
            "Relógio inteligente com monitor cardíaco e GPS integrado",
          price: 599.9,
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: 4,
          name: "Tablet 10 polegadas",
          description:
            "Tablet com tela HD, 64GB de armazenamento e processador octa-core",
          price: 899.9,
          image: "/placeholder.svg?height=150&width=200",
        },
      ],
    },
    {
      id: 2,
      name: "Fashion Style",
      category: "Moda",
      rating: 4.6,
      deliveryTime: "2-3 dias",
      deliveryFee: "R$ 12,99",
      image: "/placeholder.svg?height=200&width=300",
      products: [
        {
          id: 5,
          name: "Camiseta Premium",
          description:
            "Camiseta 100% algodão com estampa exclusiva e corte moderno",
          price: 79.9,
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: 6,
          name: "Calça Jeans Slim",
          description: "Calça jeans com elastano, corte slim e lavagem moderna",
          price: 149.9,
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: 7,
          name: "Tênis Esportivo",
          description:
            "Tênis para corrida com tecnologia de amortecimento e design moderno",
          price: 299.9,
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: 8,
          name: "Jaqueta Bomber",
          description:
            "Jaqueta estilo bomber com forro interno e bolsos laterais",
          price: 199.9,
          image: "/placeholder.svg?height=150&width=200",
        },
      ],
    },
  ];

  const destaques = [
    {
      id: 1,
      name: "Smartphone Galaxy Pro",
      image: "src/berr.jpg",
    },
    {
      id: 2,
      name: "Fone Bluetooth Premium",
      description:
        "Fone de ouvido sem fio com cancelamento de ruído e 30h de bateria",
      price: 299.9,
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      id: 3,
      name: "Smartwatch Fitness",
      description: "Relógio inteligente com monitor cardíaco e GPS integrado",
      price: 599.9,
      image: "",
    },
    {
      id: 4,
      name: "Tablet 10 polegadas",
      description:
        "Tablet com tela HD, 64GB de armazenamento e processador octa-core",
      price: 899.9,
      image: "/placeholder.svg?height=150&width=200",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb" }}>
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <Box component="section" sx={{ py: 8 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              gap: 2,
              pb: 2,
              "&::-webkit-scrollbar": { display: "none" }, // esconde a scrollbar no Chrome
            }}
          >
            {imagensDestaques.map((img: string, index: number) => (
              <Box
                key={index}
                sx={{
                  minWidth: {
                    xs: "85%", // quase toda a tela no mobile
                    sm: "45%",
                    md: "30%",
                    lg: "22%",
                  },
                  scrollSnapAlign: "start",
                  flexShrink: 0,
                }}
              >
                <Card
                  sx={{
                    cursor: "pointer",
                    "&:hover": { boxShadow: 6 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxHeight: "250px",
                  }}
                >
                  <CardContent>
                    <Box height={100} width={100}>
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Destaque ${index + 1}`}
                        height={100}
                        width={100}
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Stores and Products */}
      <Box component="section" sx={{ py: 8 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
          {stores.map((store) => (
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
                  alt={store.name}
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
                    {store.name}
                  </Typography>
                  <Typography color="text.secondary" mb={1}>
                    {store.category}
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
                      <Typography>{store.deliveryFee}</Typography>
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
                        src={product.image || require("../img/icon/photo.png")}
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
                        <Button variant="contained" size="small" color="error">
                          Adicionar
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
