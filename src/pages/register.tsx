"use client";

import React, { useState } from "react";
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
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  Facebook,
  Google,
  LocalShipping,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { login, register } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import {Address} from "../dtos/address.dto";


export default function RegisterPage() {
  const [tabIndex, setTabIndex] = useState(0);
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
  const [address, setAddress] = useState<Address>({
    street: "",
    number: "",
    complement: "",
    city: "",
    state: "",
    zipCode: "",
    isMain: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (_e: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validação agora exige ambos os formulários
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Dados pessoais
    if (!formData.firstName.trim()) newErrors.firstName = "Nome é obrigatório";
    if (!formData.lastName.trim()) newErrors.lastName = "Sobrenome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório";
    if (!formData.password) newErrors.password = "Senha é obrigatória";
    if (formData.password.length < 6)
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Senhas não coincidem";
    if (!formData.acceptTerms)
      newErrors.acceptTerms = "Você deve aceitar os termos";

    // Endereço obrigatório sempre
    if (!address.street.trim()) newErrors.street = "Rua é obrigatória";
    if (!address.number.trim()) newErrors.number = "Número é obrigatório";
    if (!address.city.trim()) newErrors.city = "Cidade é obrigatória";
    if (!address.state.trim()) newErrors.state = "Estado é obrigatório";
    if (!address.zipCode.trim()) newErrors.zipCode = "CEP é obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Força ir para aba que tem erro para facilitar o usuário
      if (
          errors.street ||
          errors.number ||
          errors.city ||
          errors.state ||
          errors.zipCode
      ) {
        setTabIndex(1);
      } else {
        setTabIndex(0);
      }
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Adaptar para enviar endereço, se sua API suportar
      console.log({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        addresses: [ address ],
      });


      const resp = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        addresses: [ address ],
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
      setErrors({
        general: err.message || "Erro ao criar conta. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Botões sociais (você deve implementar o loginSocial para eles)
  const loginSocial = async (provider: "google" | "facebook") => {
    alert(`Login com ${provider} ainda não implementado.`);
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

              {/* Tabs */}
              <Tabs
                  value={tabIndex}
                  onChange={handleTabChange}
                  centered
                  sx={{ mb: 3 }}
              >
                <Tab label="Dados Pessoais" />
                <Tab label="Endereço" />
              </Tabs>

              <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
              >
                {tabIndex === 0 && (
                    <>
                      {/* Dados pessoais */}
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
                    </>
                )}

                {tabIndex === 1 && (
                    <>
                      {/* Endereço */}
                      <TextField
                          fullWidth
                          label="Rua"
                          name="street"
                          value={address.street}
                          onChange={handleAddressChange}
                          error={!!errors.street}
                          helperText={errors.street}
                          required
                          sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%" } }}
                      />
                      <TextField
                          fullWidth
                          label="Número"
                          name="number"
                          value={address.number}
                          onChange={handleAddressChange}
                          error={!!errors.number}
                          helperText={errors.number}
                          required
                          sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%" } }}
                      />
                      <TextField
                          fullWidth
                          label="Complemento"
                          name="complement"
                          value={address.complement}
                          onChange={handleAddressChange}
                          sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%" } }}
                      />
                      <TextField
                          fullWidth
                          label="Cidade"
                          name="city"
                          value={address.city}
                          onChange={handleAddressChange}
                          error={!!errors.city}
                          helperText={errors.city}
                          required
                          sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%" } }}
                      />
                      <TextField
                          fullWidth
                          label="Estado"
                          name="state"
                          value={address.state}
                          onChange={handleAddressChange}
                          error={!!errors.state}
                          helperText={errors.state}
                          required
                          sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%" } }}
                      />
                      <TextField
                          fullWidth
                          label="CEP"
                          name="zipCode"
                          value={address.zipCode}
                          onChange={handleAddressChange}
                          error={!!errors.zipCode}
                          helperText={errors.zipCode}
                          required
                          sx={{ flex: { xs: "1 1 100%", sm: "1 1 48%" } }}
                      />
                      <FormControlLabel
                          control={
                            <Checkbox
                                name="isMain"
                                checked={address.isMain}
                                onChange={handleAddressChange}
                                size="small"
                            />
                          }
                          label={<Typography variant="body2">Endereço Principal</Typography>}
                      />
                    </>
                )}

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
                      mt: 3,
                    }}
                >
                  {loading ? "Criando conta..." : "Criar conta"}
                </Button>
              </Box>

              {/* Botões sociais Google e Facebook */}
              <Divider sx={{ my: 3 }} />
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mb: 2 }}>
                Ou cadastre-se usando
              </Typography>
              <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    mb: 2,
                  }}
              >
                <Button
                    variant="outlined"
                    startIcon={<Google />}
                    onClick={() => loginSocial("google")}
                >
                  Google
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<Facebook />}
                    onClick={() => loginSocial("facebook")}
                >
                  Facebook
                </Button>
              </Box>

              {/* Footer */}
              <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", mt: 2 }}
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
