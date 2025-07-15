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
import { Store } from "../dtos/store.dto";
import { getProducts } from "../services/products.service";
import { getCategory } from "../services/category.service"; // importando getCategory

export default function AllProducts() {
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([
        { id: 0, name: "Todas" }, // mantém opção Todas sempre disponível
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategoryId, setFilterCategoryId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const productsPerPage = 8;

    // Busca categorias do backend uma vez só
    useEffect(() => {
        async function fetchCategories() {
            try {
                const cats = await getCategory();
                // Adiciona "Todas" + categorias do backend
                setCategories([{ id: 0, name: "Todas" }, ...cats]);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        }
        fetchCategories();
    }, []);

    // Busca produtos de acordo com filtros e paginação
    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const params = {
                    page: currentPage,
                    limit: productsPerPage,
                    name: searchTerm || undefined,
                    categoryId: filterCategoryId !== 0 ? filterCategoryId : undefined,
                };

                const data = await getProducts(params);

                setProducts(data.items);
                setTotalPages(data.totalPages);
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

            <Box component="section" sx={{ maxWidth: 1200, mx: "auto", px: 2, mt: 2, mb: 2 }}>
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
                                <CardProducts
                                    product={product}
                                    store={product.store as Store} // se o produto tem store embutida
                                />
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
