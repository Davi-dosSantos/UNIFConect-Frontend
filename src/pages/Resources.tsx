import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Divider,
  Button,
  Snackbar,
} from "@mui/material";
import { useResources } from "../hooks/useResources";
import { ResourceCard } from "../components/ResourceCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "../services/api";

export function ResourcesPage() {
  const { resources, loading, error, refetchResources } = useResources();
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const token = localStorage.getItem("authToken");
  const loggedInUserId = token ? (jwtDecode(token) as { id: string }).id : null;

  const handleDeleteResource = async (resourceId: string) => {
    if (
      !window.confirm(
        "Tem certeza que deseja deletar este material? Esta ação não pode ser desfeita."
      )
    ) {
      return;
    }

    try {
      await api.delete(`/resources/${resourceId}`);
      setSnackbarMessage("Recurso deletado com sucesso!");
      setSnackbarOpen(true);

      refetchResources();
    } catch (err) {
      console.error("Erro ao deletar recurso:", err);
      setSnackbarMessage("Não foi possível deletar o recurso.");
      setSnackbarOpen(true);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Acervo de Materiais
        </Typography>
        <Button variant="contained" onClick={() => navigate("/resources/new")}>
          + Adicionar Material
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />

      <Grid container spacing={4}>
        {resources.length === 0 ? (
          <Grid size={{ xs: 12 }}>
            <Typography>
              Nenhum material de apoio disponível no momento.
            </Typography>
          </Grid>
        ) : (
          resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onDelete={
                loggedInUserId === resource.uploader.id
                  ? handleDeleteResource
                  : undefined
              }
            />
          ))
        )}
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}
