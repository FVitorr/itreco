"use client";

import type React from "react";
import {useState} from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {ArrowBack, Facebook, Google, LocalShipping, Visibility, VisibilityOff,} from "@mui/icons-material";
import {login, register} from "../services/auth.service";
import {useNavigate} from "react-router-dom";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    contaComercial: false,
    acceptTerms: false,
    receiveEmails: false,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "acceptTerms" || name === "receiveEmails" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Nome é obrigatório";
    if (!formData.lastName.trim())
      newErrors.lastName = "Sobrenome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório";
    if (!formData.password) newErrors.password = "Senha é obrigatória";
    if (formData.password.length < 6)
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Senhas não coincidem";
    if (!formData.acceptTerms)
      newErrors.acceptTerms = "Você deve aceitar os termos";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      //Pegar a resposta  e verificar se deu certo
      const resp = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      if (!resp || !resp.id) {
        throw new Error("Erro ao criar conta. Tente novamente.");
      } else {
        const loginResp = await login(formData.email, formData.password);
        if (loginResp) {
          navigate("/home");
        }
      }
      alert("Cadastro realizado com sucesso!");
    } catch (err: any) {
      console.error("Erro no registro:", err);
      setErrors({
        general: err.message || "Erro ao criar conta. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <IconButton sx={{ mr: 1 }} href="/" component="a">
                <ArrowBack />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "#f44336",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  <LocalShipping sx={{ color: "white", fontSize: 24 }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#f44336" }}
                >
                  MarketPlace
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
            >
              Crie sua conta
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, textAlign: "center" }}
            >
              Cadastre-se para começar a comprar
            </Typography>

            {errors.general && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errors.general}
              </Alert>
            )}

            {/* Social */}
            <Box sx={{ mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                sx={{ mb: 2, py: 1.5, textTransform: "none" }}
              >
                Cadastrar com Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                sx={{ py: 1.5, textTransform: "none" }}
              >
                Cadastrar com Facebook
              </Button>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                ou
              </Typography>
            </Divider>

            {/* Formulário */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
            >
              <TextField
                fullWidth
                label="Nome"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                required
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%" } }}
              />

              <TextField
                fullWidth
                label="Sobrenome"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                required
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%" } }}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                required
                placeholder="seu@email.com"
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%" } }}
              />

              <TextField
                fullWidth
                label="Telefone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                required
                placeholder="(11) 99999-9999"
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%" } }}
              />

              <TextField
                fullWidth
                label="Senha"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                required
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%" } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Confirmar Senha"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                required
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%" } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2">
                    Eu aceito os{" "}
                    <Typography
                      component="a"
                      href="/terms"
                      sx={{
                        color: "#f44336",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Termos de Uso
                    </Typography>{" "}
                    e{" "}
                    <Typography
                      component="a"
                      href="/privacy"
                      sx={{
                        color: "#f44336",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      Política de Privacidade
                    </Typography>
                  </Typography>
                }
              />
              {errors.acceptTerms && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ display: "block", ml: 4 }}
                >
                  {errors.acceptTerms}
                </Typography>
              )}

              <FormControlLabel
                control={
                  <Checkbox
                    name="receiveEmails"
                    checked={formData.receiveEmails}
                    onChange={handleChange}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2">
                    Quero receber ofertas e novidades por email
                  </Typography>
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  bgcolor: "#f44336",
                  "&:hover": { bgcolor: "#d32f2f" },
                  textTransform: "none",
                  fontSize: "1.1rem",
                  mb: 3,
                }}
              >
                {loading ? "Criando conta..." : "Criar conta"}
              </Button>
            </Box>

            {/* Footer */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              Já tem uma conta?{" "}
              <Typography
                component="a"
                href="/login"
                color="primary"
                sx={{ fontWeight: 600, cursor: "pointer" }}
              >
                Faça login
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
