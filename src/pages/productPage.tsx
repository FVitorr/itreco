import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import Header from "./componentes/header";
import Footer from "./componentes/footer";

// Simulação dos dados (pode substituir pela API real)
const allProducts = [
  {
    id: 1,
    name: "Smartphone Galaxy Pro",
    category: "Eletrônicos",
    price: 1299.9,
    image: "https://m.media-amazon.com/images/I/71KZXGAb5fL._AC_SL1500_.jpg",
  },
  {
    id: 2,
    name: "Fone Bluetooth Premium",
    category: "Eletrônicos",
    price: 299.9,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Smartwatch Fitness",
    category: "Eletrônicos",
    price: 599.9,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Tablet 10 polegadas",
    category: "Eletrônicos",
    price: 899.9,
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Camiseta Premium",
    category: "Moda",
    price: 79.9,
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Calça Jeans Slim",
    category: "Moda",
    price: 149.9,
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Tênis Esportivo",
    category: "Moda",
    price: 299.9,
    image: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Jaqueta Bomber",
    category: "Moda",
    price: 199.9,
    image: "/placeholder.svg",
  },
];

const categories = ["Todas", "Eletrônicos", "Moda"];

export default function AllProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState<number[]>([]);

  const productsPerPage = 4;

  // Filtra produtos conforme busca e categoria
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      filterCategory === "Todas" || product.category === filterCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Paginação
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Adiciona produto ao carrinho simulando clique
  function handleAddToCart(productId: number) {
    if (!cart.includes(productId)) {
      setCart([...cart, productId]);
      alert("Produto adicionado ao carrinho!");
    } else {
      alert("Produto já está no carrinho.");
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb" }}>
      <Header />

      <Box
        component="section"
        sx={{ maxWidth: 1200, mx: "auto", px: 2, mt: 2, mb: 2 }}
      >
        <Typography variant="h4" mb={4}>
          Produtos
        </Typography>

        {/* Filtros e pesquisa */}
        <Box
          component="section"
          sx={{
            display: "flex",
            gap: 2,
            mb: 4,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            sx={{ flex: 1, minWidth: 200 }}
          />

          <Select
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setCurrentPage(1);
            }}
            size="small"
            sx={{ minWidth: 150 }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Lista de produtos */}
        <Box component="section" sx={{ py: 8 }}>
          <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
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
              {paginatedProducts.length === 0 ? (
                <Typography>Nenhum produto encontrado.</Typography>
              ) : (
                paginatedProducts.map((product) => (
                  <Card
                    key={product.id}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { boxShadow: 6 },
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      border: "1px solid red",
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
                        {product.name}
                      </Typography>
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          border: "1px solid red",
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
                ))
              )}
            </Box>
          </Box>
        </Box>

        {/* Paginação */}
        {pageCount > 1 && (
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              color="primary"
            />
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
}
