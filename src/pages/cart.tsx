import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';
import Header from "./componentes/header";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useState } from "react";
import { Product } from "../dtos/product.dto";
import { Store } from "../dtos/store.dto";

export default function CartPage() {
    const cartStores = useSelector((state: RootState) => state.cart.stores);
    const [selectedProducts, setSelectedProducts] = useState<number[]>(
        cartStores.flatMap((s) => s.products.map((p) => p.id))
    );

    const countSelectedProducts = (storeId: number) => {
        const store = cartStores.find((s) => s.store.id === storeId);
        if (!store) return 0;
        return store.products.filter((p) => selectedProducts.includes(p.id)).length;
    };

    const toggleProductSelection = (productId: number) => {
        setSelectedProducts((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    const totalSelectedItems = cartStores
        .flatMap((s) => s.products)
        .filter((p) => selectedProducts.includes(p.id));

    const subtotal = totalSelectedItems.reduce((sum, p) => sum + p.price, 0);
    const deliveryFee = cartStores.reduce((sum, s) => {
        const hasProducts = s.products.some((p) =>
            selectedProducts.includes(p.id)
        );
        return hasProducts ? sum + s.store.deliveryTime * 0.5 : sum; // Simulando taxa
    }, 0);
    const total = subtotal + deliveryFee;

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb" }}>
            <Header />
            <Box sx={{ py: 4 }}>
                <Box
                    sx={{
                        maxWidth: 1200,
                        mx: "auto",
                        px: 2,
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
                        gap: 4,
                    }}
                >
                    {/* Carrinho */}
                    <Box>
                        <Typography variant="h4" fontWeight="bold" mb={2}>
                            Seu Carrinho
                        </Typography>
                        {cartStores.length === 0 && (
                            <Typography color="text.secondary">
                                Carrinho vazio
                            </Typography>
                        )}
                        {cartStores.map(({ store, products }) => (
                            <Card key={store.id} sx={{ mb: 3, boxShadow: 3 }}>
                                <CardContent>
                                    {/* Loja */}
                                    <Box sx={{ display: "flex"}}>
                                        <img
                                            src={require("../img/icon/user.png")}
                                            alt={store.owner.firstName}
                                            style={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: "50%",
                                                marginRight: 16,
                                            }}
                                        />
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="h6" fontWeight="bold">
                                                {store.owner.firstName}
                                            </Typography>

                                            <Typography variant="body2" >
                                                {store.category?.name || "Categoria não definida"}
                                            </Typography>

                                            <Box color="text.secondary" sx={{display:"flex", justifyContent: "space-between"}}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Entrega: {store.deliveryTime}min
                                                </Typography>
                                                <Typography sx={{ display:"flex", alignItems:"center"}}>
                                                    <Rating name="half-rating-read" defaultValue={store.rating} precision={0.5} readOnly />
                                                    ({store.rating})
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Badge
                                            badgeContent={products.length}
                                            color="primary"
                                            sx={{ mr: 2 }}
                                        >
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </Box>

                                    {/* Selecionar todos */}
                                    <Box sx={{ mt: 2, display:"flex", alignItems:"center"}}>
                                        <Checkbox
                                            checked={
                                                countSelectedProducts(store.id) === products.length
                                            }
                                            indeterminate={
                                                countSelectedProducts(store.id) > 0 &&
                                                countSelectedProducts(store.id) < products.length
                                            }
                                            onChange={() => {
                                                const allSelected =
                                                    countSelectedProducts(store.id) === products.length;
                                                setSelectedProducts((prev) =>
                                                    allSelected
                                                        ? prev.filter(
                                                            (id) =>
                                                                !products.some((product) => product.id === id)
                                                        )
                                                        : [...prev, ...products.map((p) => p.id)]
                                                );
                                            }}
                                            color="primary"
                                        />
                                        <Typography variant="body2" color="text.secondary">
                                            Selecionar todos os produtos
                                        </Typography>
                                    </Box>

                                    {/* Lista de produtos */}
                                    <Box sx={{ mt: 2 }}>
                                        {products.map((product: Product) => (
                                            <Card key={product.id} sx={{ mb: 2 }}>
                                                <CardContent sx={{ p: 2 }}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                        }}
                                                    >
                                                        <Box sx={{ display: "flex", alignItems: "center" }}>
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
                                                            <Box>
                                                                <Typography variant="body1">{product.name}</Typography>
                                                                <Box sx={{paddingRight:"4px"}}>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {product.description}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                        <Typography variant="body1" fontWeight="bold" sx={{minWidth: 100}}>
                                                            R$ {product.price.toFixed(2).replace(".", ",")}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        ))}

                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    {/* Resumo */}
                    <Box>
                        <Typography variant="h4" fontWeight="bold" mb={2}>
                            Resumo do Pedido
                        </Typography>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Box
                                    sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
                                >
                                    <Typography variant="body1">Total de Itens</Typography>
                                    <Typography variant="body1">
                                        {totalSelectedItems.length}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
                                >
                                    <Typography variant="body1">Subtotal</Typography>
                                    <Typography variant="body1">
                                        R$ {subtotal.toFixed(2).replace(".", ",")}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
                                >
                                    <Typography variant="body1">Taxa de Entrega</Typography>
                                    <Typography variant="body1">
                                        R$ {deliveryFee.toFixed(2).replace(".", ",")}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
                                >
                                    <Typography variant="h6" fontWeight="bold">
                                        Total
                                    </Typography>
                                    <Typography variant="h6" fontWeight="bold">
                                        R$ {total.toFixed(2).replace(".", ",")}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    onClick={() => alert("Pedido realizado com sucesso!")}
                                    disabled={totalSelectedItems.length === 0}
                                >
                                    Finalizar Compra
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
