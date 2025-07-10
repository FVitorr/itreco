import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn"; // para MapPin
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // para Clock
import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // para Truck

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <>
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
    </>
  );
}
