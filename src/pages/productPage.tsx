import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
  Button,
  Paper,
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
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [filterCategoryId, setFilterCategoryId] = useState<number>(categoryIdFromState);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("");

  const productsPerPage = 10;

  useEffect(() => {
    if (searchTermFromState) {
      setSearchTerm(searchTermFromState);
      setAppliedSearchTerm(searchTermFromState);
      setCurrentPage(1);
      window.history.replaceState({}, document.title);
    }
  }, [searchTermFromState]);

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

  useEffect(() => {
    if (categoryIdFromState !== 0) {
      setFilterCategoryId(categoryIdFromState);
    }
  }, [categoryIdFromState]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = {
          page: currentPage - 1,
          size: productsPerPage,
          name: appliedSearchTerm || undefined,
          categoryId: filterCategoryId !== 0 ? filterCategoryId : undefined,
          sort: sortOrder || undefined,
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
  }, [appliedSearchTerm, filterCategoryId, currentPage, sortOrder]);

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
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" mb={2}>
              Filtros
            </Typography>
            <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", minWidth: 200 }}>
                <Typography variant="body2" mb={0.5}>
                  Nome:
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Box>

              <Box>
                <Button
                    variant="contained"
                    sx={{ mt: "auto", height: "40px" }}
                    onClick={() => {
                      setAppliedSearchTerm(searchTerm);
                      setCurrentPage(1);
                    }}
                >
                  Buscar
                </Button>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", minWidth: 180 }}>
                <Typography variant="body2" mb={0.5}>
                  Categoria:
                </Typography>
                <Select
                    value={filterCategoryId}
                    onChange={(e) => {
                      setFilterCategoryId(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    size="small"
                >
                  {categories.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                  ))}
                </Select>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", minWidth: 180 }}>
                <Typography variant="body2" mb={0.5}>
                  Ordenar por preço:
                </Typography>
                <Select
                    value={sortOrder}
                    onChange={(e) => {
                      setSortOrder(e.target.value);
                      setCurrentPage(1);
                    }}
                    size="small"
                >
                  <MenuItem value="">Nenhum</MenuItem>
                  <MenuItem value="price,asc">Menor para maior</MenuItem>
                  <MenuItem value="price,desc">Maior para menor</MenuItem>
                </Select>
              </Box>
            </Box>
          </Paper>

          {/* Lista de produtos */}
          <Box sx={{ py: 8, display:"flex", alignItems:"center", justifyContent: "center", maxWidth: 1200}}>
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
                        xs: "1fr",                // até 600px: 1 coluna
                        sm: "repeat(2, 1fr)",     // de 600px a 900px: 2 colunas
                        md: "repeat(3, 1fr)",     // de 900px a 1200px: 3 colunas
                        lg: "repeat(4, 1fr)",     // de 1200px a 1536px: 4 colunas
                        xl: "repeat(5, 1fr)",     // acima de 1536px: 5 colunas (opcional)
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
