import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Product } from "../../dtos/product.dto";

// 🚀 Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addProduct } from "../products/productSlice"; 

interface CardProductsProps {
  product: Product;
}

export default function CardProducts({ product: Product }: CardProductsProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToRedux = () => {
    dispatch(addProduct(product));
  };

  return (
    <Card
      key={product.id}
      sx={{
        cursor: "pointer",
        "&:hover": { boxShadow: 6 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid red",
        width: 250,
        p: 2,
      }}
    >
      <Box width="100%" height={150} mt={4}>
        <img
          src={product.imageUrl || require("../../img/icon/photo.png")}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            objectFit: "contain",
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, width: "100%" }}>
        <Typography variant="subtitle1" fontWeight="600" noWrap>
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
          }}
        >
          {product.description}
        </Typography>
        <Box
          sx={{
            mt: 2,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="success.main" fontWeight="bold">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </Typography>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={handleAddToRedux}
          >
            Adicionar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
