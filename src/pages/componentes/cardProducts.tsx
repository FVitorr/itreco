import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Product } from "../../dtos/product.dto";

// Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addProductToCart } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";

interface CardProductsProps {
  product: Product;
}

export default function CardProducts({ product }: CardProductsProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToRedux = () => {
    dispatch(addProductToCart({ product: product }));
    toast.success(`"${product.name}" adicionado ao carrinho!`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1,
        mb: 2,
        boxShadow: 1,
      }}
    >
      {/* Imagem */}
      <Box sx={{ width: 80, height: 80, mr: 2 }}>
        <img
          src={product.imageUrl || require("../../img/icon/photo.png")}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: 4,
          }}
        />
      </Box>

      {/* Detalhes */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
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
            fontSize: 13,
          }}
        >
          {product.description}
        </Typography>
        <Typography
          variant="body1"
          color="success.main"
          fontWeight="bold"
          mt={1}
        >
          R$ {product.price.toFixed(2).replace(".", ",")}
        </Typography>
      </Box>

      {/* Botão */}
      <Button
        variant="contained"
        size="small"
        color="error"
        onClick={handleAddToRedux}
        sx={{ ml: 2, minWidth: 100 }}
      >
        Adicionar
      </Button>
    </Card>
  );
}
