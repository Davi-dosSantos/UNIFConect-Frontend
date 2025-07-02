import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Grid,
} from "@mui/material";
import { api } from "../services/api";
import { AxiosError } from "axios";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("authToken", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/home");
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data.message || "Email ou senha inválidos.");
      } else {
        setError("Ocorreu um erro inesperado. Tente novamente.");
      }
      console.error("Erro de login:", err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Entrar no UNIFConect
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="body2" color="primary">
                  Ainda não tem uma conta? Cadastre-se
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
