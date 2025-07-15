import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Checkbox,
  Button,
} from "@mui/material";
import Header from "./componentes/header";
import { Product } from "../dtos/product.dto";

export default function CartPage() {
  const products = useSelector((state: RootState) => state.cart.products);

  const [selectedProducts, setSelectedProducts] = useState<number[]>(
    products.map((p) => p.id)
  );

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const selectedItems = useMemo(() => {
    return products.filter((p) => selectedProducts.includes(p.id));
  }, [products, selectedProducts]);

  const subtotal = useMemo(() => {
    return selectedItems.reduce((sum, p) => sum + p.price, 0);
  }, [selectedItems]);

  // Simula taxa de entrega fixa de R$ 5 se tiver produtos selecionados
  const deliveryFee = selectedItems.length > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb" }}>
      <Header />
      <Box sx={{ py: 4, maxWidth: 800, mx: "auto", px: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Seu Carrinho
        </Typography>

        {products.length === 0 ? (
          <Typography color="text.secondary">Carrinho vazio</Typography>
        ) : (
          products.map((product: Product) => (
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
                    marginRight: 16,
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </Box>
                <Typography fontWeight="bold">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}

        {selectedItems.length > 0 && (
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h6" mb={1}>
                Resumo do Pedido
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Typography>Total de Itens</Typography>
                <Typography>{selectedItems.length}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Subtotal</Typography>
                <Typography>
                  R$ {subtotal.toFixed(2).replace(".", ",")}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Taxa de Entrega</Typography>
                <Typography>
                  R$ {deliveryFee.toFixed(2).replace(".", ",")}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography fontWeight="bold">Total</Typography>
                <Typography fontWeight="bold">
                  R$ {total.toFixed(2).replace(".", ",")}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
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
