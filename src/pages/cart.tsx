import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../componentes/header";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export default function CartPage() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  }

  interface Store {
    id: number;
    name: string;
    category: string;
    rating: number;
    deliveryTime: string;
    deliveryFee: string;
    image: string;
    products: Product[];
  }

  const stores: Store[] = [
    {
      id: 1,
      name: "TechStore",
      category: "Eletrônicos",
      rating: 4.8,
      deliveryTime: "1-2 dias",
      deliveryFee: "R$ 9,99",
      image: "/placeholder.svg?height=200&width=300",
      products: [
        {
          id: 1,
          name: "Smartphone Galaxy Pro",
          description:
            "Smartphone com tela de 6.5', 128GB, câmera tripla e bateria de longa duração",
          price: 1299.9,
          image:
            "https://static.vecteezy.com/system/resources/previews/047/300/155/non_2x/add-image-icon-symbol-design-illustration-vector.jpg",
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
          description:
            "Calça jeans com elastano, corte slim e lavagem moderna",
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

  const countSelectedProducts = (storeId: number) => {
    return stores
      .find((store) => store.id === storeId)
      ?.products.filter((product) => selectedProducts.includes(product.id))
      .length;
  };

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts((prevSelected: number[]) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      }
      return [...prevSelected, productId];
    });
  };

  // Calcular o total de itens selecionados e o valor total
  const totalSelectedItems = stores
    .flatMap((store) => store.products)
    .filter((product) => selectedProducts.includes(product.id));

  const subtotal = totalSelectedItems.reduce((total, product) => total + product.price, 0);
  const deliveryFee = stores.reduce((total, store) => {
    const hasSelectedProducts = store.products.some((product) => selectedProducts.includes(product.id));
    return hasSelectedProducts ? total + parseFloat(store.deliveryFee.replace("R$ ", "").replace(",", ".")) : total;
  }, 0);
  const total = subtotal + deliveryFee;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb" }}>
      <Header />
      {/* Hero Section */}
      <Box component="section" sx={{ py: 4 }}>
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
          <Box>
            <Typography variant="h4" fontWeight="bold" mb={2}>
              Seu Carrinho
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {stores.map((store) => (
                <Card key={store.id} sx={{ mb: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={store.image}
                        alt={store.name}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          marginRight: 16,
                        }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {store.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {store.category} - {store.rating}{" "}
                          <StarIcon fontSize="small" color="warning" />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Entrega em {store.deliveryTime} - Taxa de entrega{" "}
                          {store.deliveryFee}
                        </Typography>
                      </Box>
                      <Badge
                        badgeContent={store.products.length}
                        color="primary"
                      >
                        <ShoppingCartIcon />
                      </Badge>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <Checkbox
                        checked={countSelectedProducts(store.id) === store.products.length}
                        indeterminate={
                          (countSelectedProducts(store.id) ?? 0) > 0 &&
                          (countSelectedProducts(store.id) ?? 0) < store.products.length
                        }
                        onChange={() => {
                          const allSelected = countSelectedProducts(store.id) === store.products.length;
                          if (allSelected) {
                            setSelectedProducts((prev) =>
                              prev.filter(
                                (id) =>
                                  !store.products.some((product) => product.id === id)
                              )
                            );
                          }
                          else {
                            setSelectedProducts((prev) => [
                              ...prev,
                              ...store.products.map((product) => product.id),
                            ]);
                          }
                        }}
                        color="primary"
                      />
                      <Typography variant="body2" color="text.secondary">
                        Selecionar todos os produtos
                      </Typography>
                    </Box>
                    <Typography variant="h6" fontWeight="bold" mt={2}>
                      Produtos
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {store.products.map((product) => (
                        <Box
                          key={product.id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onChange={() => toggleProductSelection(product.id)}
                              color="primary"
                            />
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: "8px",
                                marginRight: 16,
                              }}
                            />
                            <Box>
                              <Typography variant="body1">
                                {product.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {product.description}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body1" fontWeight="bold">
                            R$ {product.price.toFixed(2)}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography variant="h4" fontWeight="bold" mb={2}>
              Resumo do Pedido
            </Typography>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="body1">Total de Itens</Typography>
                  <Typography variant="body1">
                    {totalSelectedItems.length}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">
                    R$ {subtotal.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="body1">Taxa de Entrega</Typography>
                  <Typography variant="body1">
                    R$ {deliveryFee.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    R$ {total.toFixed(2)}
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

      {/* Footer */}
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
