import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useMemo, useState } from "react";
import Badge from "@mui/material/Badge";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Typography,
  Link,
  ButtonGroup,
} from "@mui/material";
import Header from "./componentes/header";
import { Product } from "../dtos/product.dto";
import { Trash2 } from "lucide-react"; // ✔️ import correto do ícone

export default function CartPage() {
  const products = useSelector((state: RootState) => state.cart.products);

  const [selectedProducts, setSelectedProducts] = useState<number[]>(
    products.map((p) => p.id)
  );

  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<number, boolean>
  >({});

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleDescription = (productId: number) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const selectedItems = useMemo(() => {
    return products.filter((p) => selectedProducts.includes(p.id));
  }, [products, selectedProducts]);

  const subtotal = useMemo(() => {
    return selectedItems.reduce((sum, p) => sum + p.price, 0);
  }, [selectedItems]);

  const deliveryFee = selectedItems.length > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;

  const TRUNCATE_LENGTH = 100;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb" }}>
      <Header />
      <Box
        sx={{
          py: 4,
          maxWidth: 900,
          mx: "auto",
          px: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box sx={{ flex: { xs: "none", md: 2 }, minWidth: 0 }}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Seu Carrinho
          </Typography>

          {products.length === 0 ? (
            <Typography color="text.secondary">Carrinho vazio</Typography>
          ) : (
            products.map((product: Product) => {
              const isExpanded = expandedDescriptions[product.id] || false;
              const description = product.description || "";
              const shouldTruncate = description.length > TRUNCATE_LENGTH;

              return (
                <Card key={product.id} sx={{ mb: 2 }}>
                  <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                      color="primary"
                    />

                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: "8px",
                      }}
                    />

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1">{product.name}</Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ whiteSpace: "pre-line" }}
                      >
                        {isExpanded
                          ? description
                          : shouldTruncate
                          ? description.substring(0, TRUNCATE_LENGTH) + "..."
                          : description}
                        {shouldTruncate && (
                          <Link
                            component="button"
                            variant="body2"
                            onClick={() => toggleDescription(product.id)}
                          >
                            {isExpanded ? "Mostrar menos" : "Mostrar mais"}
                          </Link>
                        )}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "right", minWidth: 100 }}>
                      <Typography fontWeight="bold" mb={1}>
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        width: "100%",
                        height: "100%",
                        border: "1px solid red",
                      }}
                    >
                      <ButtonGroup
                        variant="contained"
                        aria-label="Basic button group"
                      >
                        <Button>One</Button>
                        <Button disabled>{product.quantity}</Button>
                        <Button>Three</Button>
                      </ButtonGroup>
                    </Box>
                  </CardContent>
                </Card>
              );
            })
          )}
        </Box>

        {selectedItems.length > 0 && (
          <Card
            sx={{
              flex: { xs: "none", md: 1 },
              minWidth: { xs: "auto", md: 280 },
              alignSelf: "start",
            }}
          >
            <CardContent>
              <Typography variant="h6" mb={1}>
                Resumo do Pedido
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography>Total de Itens</Typography>
                <Typography>{selectedItems.length}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography>Subtotal</Typography>
                <Typography>
                  R$ {subtotal.toFixed(2).replace(".", ",")}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography>Taxa de Entrega</Typography>
                <Typography>
                  R$ {deliveryFee.toFixed(2).replace(".", ",")}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1} mb={2}>
                <Typography fontWeight="bold">Total</Typography>
                <Typography fontWeight="bold">
                  R$ {total.toFixed(2).replace(".", ",")}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => alert("Pedido realizado com sucesso!")}
              >
                Finalizar Compra
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}
