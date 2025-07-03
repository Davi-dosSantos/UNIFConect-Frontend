import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Autocomplete,
  Chip,
  CircularProgress,
} from "@mui/material";
import { api } from "../services/api";
import { AxiosError } from "axios";

interface Tag {
  id: string;
  name: string;
}

export function CreateOfferPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slots, setSlots] = useState<number | "">("");
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("/tags");
        setAvailableTags(response.data);
      } catch (err) {
        if (err instanceof AxiosError && err.response) {
          setError(
            err.response.data.message || "Erro ao carregar as matérias."
          );
        } else {
          setError(
            "Não foi possível carregar as matérias. Tente novamente mais tarde."
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!title || !description || selectedTags.length === 0 || !slots) {
      setError(
        "Por favor, preencha todos os campos e selecione ao menos uma matéria."
      );
      return;
    }

    try {
      const tagIds = selectedTags.map((tag) => tag.id);
      await api.post("/offers", { title, description, slots, tagIds });
      navigate("/home"); // Redireciona para a home após o sucesso
    } catch (err) {
      setError("Ocorreu um erro ao criar a oferta. Tente novamente.");
      console.error("Erro ao criar oferta:", err);
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
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography component="h1" variant="h4" gutterBottom>
        Atividades
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="title"
        label="Título da sua oferta"
        name="title"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="description"
        label="Descreva o que você vai ensinar"
        id="description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="slots"
        label="Número de Vagas"
        type="number"
        id="slots"
        value={slots}
        onChange={(e) =>
          setSlots(e.target.value === "" ? "" : parseInt(e.target.value, 10))
        }
        InputProps={{ inputProps: { min: 1 } }}
      />

      <Autocomplete
        multiple
        id="tags-selection"
        options={availableTags}
        getOptionLabel={(option) => option.name}
        value={selectedTags}
        onChange={(_event, newValue) => {
          setSelectedTags(newValue);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Matérias / Tópicos"
            placeholder="Selecione as matérias"
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option.name} {...getTagProps({ index })} />
          ))
        }
        sx={{ mt: 2 }}
      />
      {error && (
        <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
          {error}
        </Alert>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Publicar Oferta
      </Button>
    </Box>
  );
}
