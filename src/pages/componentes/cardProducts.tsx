import {motion} from "framer-motion";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Product} from "../../dtos/product.dto";

import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import {addProductToCart} from "../../features/cart/cartSlice";
import {toast} from "react-toastify";
import {MotionButton} from "./button";

interface CardProductsProps {
  product: Product;
}

const MotionCard = motion(Card);

export default function CardProducts({ product }: CardProductsProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToRedux = () => {
    dispatch(addProductToCart({ product }));
    toast.success(`"${product.name}" adicionado ao carrinho!`);
  };

  return (
    <MotionCard
      whileHover={{ scale: 1.03, boxShadow: "0 8px 15px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.97 }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        px: 2,
        py: 1,
        mb: 2,
        boxShadow: 1,
        width: "250px",
        gap: 2,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {/* Imagem */}
      <Box sx={{ width: 80, height: 80, mr: 2, mb: 2 }}>
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
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography
          variant="body1"
          color="success.main"
          fontWeight="bold"
          mt={1}
        >
          R$ {product.price.toFixed(2).replace(".", ",")}
        </Typography>
        <MotionButton
          variant="contained"
          size="small"
          color="error"
          onClick={handleAddToRedux}
          sx={{ minWidth: 100 }}
        >
          Adicionar
        </MotionButton>
      </Box>
    </MotionCard>
  );
}
