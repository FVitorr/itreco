import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
} from "@mui/material";
import Header from "./componentes/header";
import Footer from "./componentes/footer";
import { Product } from "../dtos/product.dto";
import CardProducts from "./componentes/cardProducts";
import { getProducts } from "../services/products.service";
import { getCategory } from "../services/category.service";
import { useLocation } from "react-router-dom";

export default function AllProducts() {
  const location = useLocation();
  const categoryIdFromState = location?.state?.categoryId ?? null;
  const searchTermFromState = location?.state?.searchTerm ?? "";

  const [categories, setCategories] = useState<{ id: any; name: string }[]>([
    { id: 0, name: "Todas" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategoryId, setFilterCategoryId] = useState<number>(categoryIdFromState);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const productsPerPage = 10;

  // Atualiza o termo de busca caso venha via location.state
  useEffect(() => {
    if (searchTermFromState) {
      setSearchTerm(searchTermFromState);
      setCurrentPage(1);

      // Remove o state após leitura (previne reuso ao voltar no navegador)
      window.history.replaceState({}, document.title);
    }
  }, [searchTermFromState]);

  // Carregar categorias uma vez
  useEffect(() => {
    async function fetchCategories() {
      try {
        const cats = await getCategory();
        setCategories([{ id: 0, name: "Todas" }, ...cats]);
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    }
    fetchCategories();
  }, []);

  // Atualizar filtro de categoria ao montar, se veio via location
  useEffect(() => {
    if (categoryIdFromState !== 0) {
      setFilterCategoryId(categoryIdFromState);
    }
  }, [categoryIdFromState]);

  // Buscar produtos sempre que filtros mudarem
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = {
          page: currentPage - 1,
          size: productsPerPage,
          name: searchTerm || undefined,
          categoryId: filterCategoryId !== 0 ? filterCategoryId : undefined,
        };
        const data = await getProducts(params);
        if (data && Array.isArray(data.content)) {
          setProducts(data.content);
          setTotalPages(data.totalPages ?? 1);
        } else {
          setProducts([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [searchTerm, filterCategoryId, currentPage]);

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

        {/* Filtros */}
        <Box
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
            value={filterCategoryId}
            onChange={(e) => {
              setFilterCategoryId(Number(e.target.value));
              setCurrentPage(1);
            }}
            size="small"
            sx={{ minWidth: 150 }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Lista de produtos */}
        <Box sx={{ py: 8 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
              <CircularProgress />
            </Box>
          ) : products.length === 0 ? (
            <Typography>Nenhum produto encontrado.</Typography>
          ) : (
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
              {products.map((product) => (
                <CardProducts key={product.id} product={product} />
              ))}
            </Box>
          )}
        </Box>

        {/* Paginação */}
        {totalPages > 1 && (
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={totalPages}
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
