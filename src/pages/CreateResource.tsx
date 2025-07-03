import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Autocomplete,
  CircularProgress,
  Paper,
} from "@mui/material";
import { api } from "../services/api";
import type { Tag } from "../types";
import { useTags } from "../hooks/useTags";
import { AxiosError } from "axios";

export function CreateResourcePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const { tags, loading: loadingTags, error: errorTags } = useTags();

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!title || !description || !selectedFile || selectedTags.length === 0) {
      setError("Por favor, preencha todos os campos e selecione um arquivo.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", selectedFile);

    const tagIds = selectedTags.map((tag) => tag.id);
    formData.append("tagIds", tagIds.join(","));

    try {
      await api.post("/resources", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/resources");
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data.message || "Erro ao enviar o material.");
      } else {
        setError("Ocorreu um erro inesperado.");
      }
      console.error("Erro ao criar recurso:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography component="h1" variant="h4" gutterBottom>
        Adicionar Material ao Acervo
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Título do Material"
          name="title"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="description"
          label="Descrição do Material"
          id="description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
        />
        <Autocomplete
          sx={{ mt: 2 }}
          multiple
          id="tags-selection"
          options={tags}
          getOptionLabel={(option) => option.name}
          value={selectedTags}
          onChange={(event, newValue) => {
            setSelectedTags(newValue);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Matérias / Tópicos"
              placeholder="Selecione as tags"
              error={!!errorTags}
              helperText={errorTags}
            />
          )}
          disabled={loadingTags || isSubmitting}
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          {selectedFile
            ? `Arquivo Selecionado: ${selectedFile.name}`
            : "Selecionar Arquivo"}
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitting || loadingTags}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Enviar Material"
          )}
        </Button>
      </Box>
    </Paper>
  );
}
