import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { api } from "../services/api";
import { jwtDecode } from "jwt-decode";
import { AxiosError } from "axios";

// Definindo a interface para os dados do formulário
interface ProfileFormData {
  bio: string;
  course: string;
  institution: string;
  avatarUrl: string;
}

export function EditProfilePage() {
  const [formData, setFormData] = useState<ProfileFormData>({
    bio: "",
    course: "",
    institution: "",
    avatarUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Busca os dados atuais do perfil para preencher o formulário
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }
        const decodedToken = jwtDecode(token) as { id: string };
        const userId = decodedToken.id;

        const response = await api.get(`/users/${userId}/profile`);
        // Preenche o formulário com os dados existentes (ou strings vazias se forem nulos)
        setFormData({
          bio: response.data.bio || "",
          course: response.data.course || "",
          institution: response.data.institution || "",
          avatarUrl: response.data.avatarUrl || "",
        });
      } catch (err) {
        if (err instanceof AxiosError && err.response) {
          setError(
            err.response.data.message || "Erro ao carregar os dados do perfil."
          );
        } else {
          console.error("Erro ao buscar dados do perfil:", err);
        }
        setError("Não foi possível carregar os dados do perfil para edição.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Função para enviar o formulário atualizado
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      // O endpoint PUT /profile já sabe qual usuário atualizar pelo token
      await api.put("/users/profile", formData);
      setSuccess("Perfil atualizado com sucesso! Redirecionando...");

      setTimeout(() => {
        navigate("/profile"); // Redireciona de volta para a página de perfil
      }, 1500);
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data.message || "Erro ao atualizar o perfil.");
      } else {
        setError("Ocorreu um erro inesperado.");
      }
      console.error("Erro ao atualizar o perfil:", err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography component="h1" variant="h4" gutterBottom>
          Editar Meu Perfil
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            fullWidth
            id="bio"
            label="Sua Biografia"
            name="bio"
            multiline
            rows={4}
            value={formData.bio}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="course"
            label="Seu Curso"
            name="course"
            value={formData.course}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="institution"
            label="Sua Instituição de Ensino"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="avatarUrl"
            label="URL da sua Foto de Perfil"
            name="avatarUrl"
            value={formData.avatarUrl}
            onChange={handleChange}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {success}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Salvar Alterações
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
