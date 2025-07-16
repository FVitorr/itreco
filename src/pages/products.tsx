import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Header from "./componentes/header";
import { Product } from "../dtos/product.dto";
import { getProductStores } from "../services/products.service";

export default function ProductsCrudPage() {
  const initialProducts: Product[] = [];
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProductStores();
      setProducts(response.content || []);
    };
    fetchProducts();
  }, []);

  const handleOpenModal = (product?: Product) => {
    setEditingProduct(product || null);
    setForm(
      product
        ? {
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            image: product.imageUrl || "",
          }
        : { name: "", description: "", price: "", image: "" }
    );
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleSave = () => {
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      imageUrl: form.image,
    };

    setProducts((prev) => {
      if (editingProduct) {
        return prev.map((p) => (p.id === editingProduct.id ? newProduct : p));
      }
      return [...prev, newProduct];
    });

    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb" }}>
      <Header />
      <Box
        component="section"
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: 2,
          py: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Produtos
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleOpenModal()}
          sx={{ mb: 4 }}
        >
          Adicionar Produto
        </Button>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 4,
          }}
        >
          {products.map((product) => (
            <Card key={product.id} sx={{ position: "relative" }}>
              <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                <IconButton onClick={() => handleOpenModal(product)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: 150,
                    objectFit: "contain",
                    borderRadius: 8,
                  }}
                />
                <Box>
                  <Typography variant="h6" mt={2}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                    R$ {product.price.toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: 400,
            }}
          >
            <Typography variant="h6" mb={2}>
              {editingProduct ? "Editar Produto" : "Novo Produto"}
            </Typography>
            <TextField
              label="Nome"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Descrição"
              fullWidth
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="Preço"
              type="number"
              fullWidth
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="URL da Imagem"
              fullWidth
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" fullWidth onClick={handleSave}>
              Salvar
            </Button>
          </Box>
        </Modal>
      </Box>

      <Box
        component="footer"
        sx={{ bgcolor: "grey.900", color: "grey.300", py: 6 }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(4, 1fr)",
              },
              gap: 4,
            }}
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "error.main",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mr: 1,
                  }}
                >
                  <LocalShippingIcon />
                </Box>
                <Typography variant="h6" fontWeight="bold" color="common.white">
                  MarketPlace
                </Typography>
              </Box>
              <Typography variant="body2" color="grey.400">
                Seus produtos favoritos, entregues com rapidez e qualidade.
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                mb={2}
                color="common.white"
              >
                Empresa
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                {["Sobre nós", "Carreiras", "Imprensa"].map((text) => (
                  <li key={text}>
                    <a
                      href="#"
                      style={{
                        color: "grey.400",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.color = "#fff")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.color = "grey.400")
                      }
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </Box>
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                mb={2}
                color="common.white"
              >
                Suporte
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                {["Central de Ajuda", "Contato", "Termos de Uso"].map(
                  (text) => (
                    <li key={text}>
                      <a
                        href="#"
                        style={{
                          color: "grey.400",
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.color = "#fff")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.color = "grey.400")
                        }
                      >
                        {text}
                      </a>
                    </li>
                  )
                )}
              </Box>
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                mb={2}
                color="common.white"
              >
                Parceiros
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                {["Seja um parceiro", "Entregadores", "Lojas"].map((text) => (
                  <li key={text}>
                    <a
                      href="#"
                      style={{
                        color: "grey.400",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.color = "#fff")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.color = "grey.400")
                      }
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              borderTop: 1,
              borderColor: "grey.700",
              mt: 6,
              pt: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="grey.500">
              &copy; 2024 MarketPlace. Todos os direitos reservados.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
