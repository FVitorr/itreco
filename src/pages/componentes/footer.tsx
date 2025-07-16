import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{ bgcolor: "grey.900", color: "grey.300", py: { xs: 6, md: 8 } }}
        >
            <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 } }}>
                <Stack
                    direction="row"
                    spacing={8}
                    justifyContent="space-between"
                    flexWrap="nowrap" // linha única, sem wrap
                    sx={{ overflow: "hidden" }} // evita scroll horizontal
                >
                    {/* Logo e descrição - sempre visível */}
                    <Box sx={{ flex: "0 0 220px", minWidth: 220 }}>
                        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                            <Box
                                sx={{
                                    width: 36,
                                    height: 36,
                                    bgcolor: "error.main",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <LocalShippingIcon sx={{ color: "common.white" }} />
                            </Box>
                            <Typography variant="h6" fontWeight="bold" color="common.white" noWrap>
                                MarketPlace
                            </Typography>
                        </Stack>
                        <Typography variant="body2" color="grey.400" maxWidth={300}>
                            Seus produtos favoritos, entregues com rapidez e qualidade.
                        </Typography>
                    </Box>

                    {/* Colunas de links */}
                    {[
                        {
                            title: "Empresa",
                            links: ["Sobre nós", "Carreiras", "Imprensa"],
                            hideBelowMd: false,
                        },
                        {
                            title: "Suporte",
                            links: ["Central de Ajuda", "Contato", "Termos de Uso"],
                            hideBelowMd: true,
                            hideBelowSm: false,
                        },
                        {
                            title: "Parceiros",
                            links: ["Seja um parceiro", "Entregadores", "Lojas"],
                            hideBelowMd: true,
                            hideBelowSm: true,
                        },
                    ].map(({ title, links, hideBelowMd, hideBelowSm }) => (
                        <Box
                            key={title}
                            sx={{
                                flex: "1 1 160px",
                                minWidth: 160,
                                display: {
                                    xs: "none", // esconde tudo no xs (celular)
                                    sm: hideBelowSm ? "none" : "block", // pode esconder a penúltima coluna em sm
                                    md: hideBelowMd ? "none" : "block", // pode esconder algumas colunas em md
                                    lg: "block", // mostra em lg+
                                },
                            }}
                            component="nav"
                            aria-label={title}
                        >
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                mb={2}
                                color="common.white"
                            >
                                {title}
                            </Typography>
                            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                                {links.map((text) => (
                                    <li key={text}>
                                        <a
                                            href="#"
                                            style={{
                                                color: "grey.400",
                                                textDecoration: "none",
                                                cursor: "pointer",
                                                transition: "color 0.3s",
                                                display: "inline-block",
                                                padding: "4px 0",
                                                outline: "none", // remove contorno azul no foco
                                            }}
                                            onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
                                            onMouseOut={(e) => (e.currentTarget.style.color = "grey.400")}
                                            onFocus={(e) => (e.currentTarget.style.color = "#fff")}    // mantém cor no foco
                                            onBlur={(e) => (e.currentTarget.style.color = "grey.400")}  // volta cor ao perder foco
                                            onClick={(e) => e.preventDefault()} // evita scroll se quiser
                                        >
                                            {text}
                                        </a>
                                    </li>
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Stack>

                <Box
                    sx={{
                        borderTop: 1,
                        borderColor: "grey.700",
                        mt: { xs: 6, md: 8 },
                        pt: 3,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="body2" color="grey.500" component="p" noWrap>
                        &copy; 2024 MarketPlace. Todos os direitos reservados.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
