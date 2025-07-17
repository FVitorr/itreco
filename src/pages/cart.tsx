import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
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
import { CartItem } from "../dtos/cartItem.dto";
import {
  incrementQuantity,
  decrementQuantity,
  setCartItems,
} from "../features/cart/cartSlice";
import { getCart, syncCartWithBackend } from "../services/cart.service";
import {toast} from "react-toastify";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const [selectedProducts, setSelectedProducts] = useState<number[]>(
    items.map((item) => item.product.id)
  );
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<number, boolean>
  >({});

  const selectedItems = useMemo(() => {
    return items.filter((item) => selectedProducts.includes(item.product.id));
  }, [items, selectedProducts]);

  const subtotal = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.price, 0);
  }, [selectedItems]);

  const deliveryFee = selectedItems.length > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;

  const userJson = sessionStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  const TRUNCATE_LENGTH = 100;

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.id || items.length > 0) return;

      try {
        const cartData = await getCart(user.id);
        dispatch(setCartItems(cartData.items)); // cartData.items deve estar no formato CartItem[]
      } catch (error) {
        console.error("Erro ao buscar carrinho:", error);
      }
    };

    fetchCart();
  }, [user?.id, items.length, dispatch]);

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

  const handleFinalizePurchase = async () => {
    if (!user?.id) {
      alert("Você precisa estar logado para finalizar a compra.");
      return;
    }

    try {
      const resp = await syncCartWithBackend(user.id, selectedItems, total);
      toast.success("Operacação realizada com sucesso");
    } catch (error) {
      toast.error("Erro ao sincronizar carrinho: " + error);
    }
  };


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

          {items.length === 0 ? (
            <Typography color="text.secondary">Carrinho vazio</Typography>
          ) : (
            items.map((item: CartItem) => {
              const { product, quantity, price } = item;
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
                        marginRight: 12,
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

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        minWidth: 100,
                        width: 90,
                        ml: 2,
                      }}
                    >
                      <Typography fontWeight="bold" mb={1}>
                        R$ {price.toFixed(2).replace(".", ",")}
                      </Typography>

                      <ButtonGroup
                        variant="contained"
                        size="small"
                        aria-label="Botões de quantidade"
                      >
                        <Button
                          sx={{ width: 22, minWidth: 22 }}
                          onClick={() =>
                            dispatch(decrementQuantity(product.id))
                          }
                        >
                          -
                        </Button>

                        <Button disabled>{quantity}</Button>

                        <Button
                          sx={{ width: 22, minWidth: 22 }}
                          onClick={() =>
                            dispatch(incrementQuantity(product.id))
                          }
                        >
                          +
                        </Button>
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
                onClick={handleFinalizePurchase}
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
