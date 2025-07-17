import React, { useState } from "react";
import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../../dtos/product.dto";

interface ProductCardEditProps {
  product: Product;
  handleOpenModal: (product: Product) => void;
  handleDelete: (id: number) => void;
}

export default function ProductCardEdit({
  product,
  handleOpenModal,
  handleDelete,
}: ProductCardEditProps) {
  // Estado para controlar se o card está expandido
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
        },
        minWidth: 350,
      }}
      onClick={toggleExpanded}
    >
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          display: "flex",
          gap: 1,
          zIndex: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          color="primary"
          size="small"
          onClick={() => handleOpenModal(product)}
          aria-label="Editar produto"
          sx={{ bgcolor: "background.paper", boxShadow: 1 }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          color="error"
          size="small"
          onClick={() => handleDelete(product.id)}
          aria-label="Deletar produto"
          sx={{ bgcolor: "background.paper", boxShadow: 1 }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          pt: 3,
        }}
      >
        <Box
          component="img"
          src={product.imageUrl}
          alt={product.name}
          sx={{
            width: "100%",
            maxHeight: 180,
            height: 180,
            objectFit: "contain",
            borderRadius: 2,
            mb: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        />
        <Typography
          variant="h6"
          component="h3"
          textAlign="center"
          noWrap={!expanded}
        >
          {product.name}
        </Typography>
        <Box sx={{ maxWidth: "250px" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
            sx={{
              textAlign: "center",
              px: 1,
              whiteSpace: expanded ? "normal" : "nowrap",
              overflow: expanded ? "visible" : "hidden",
              textOverflow: expanded ? "clip" : "ellipsis",
              display: expanded ? "block" : "-webkit-box",
              WebkitLineClamp: expanded ? "none" : 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.description}
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          mt={2}
          color="primary.main"
          textAlign="center"
        >
          R$ {product.price.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
}
