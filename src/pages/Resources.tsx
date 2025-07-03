import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Divider,
  Button,
} from "@mui/material";
import { useResources } from "../hooks/useResources";
import { ResourceCard } from "../components/ResourceCard";
import { useNavigate } from "react-router-dom";

export function ResourcesPage() {
  const { resources, loading, error } = useResources();
  const navigate = useNavigate();

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
            <ResourceCard key={resource.id} resource={resource} />
          ))
        )}
      </Grid>
    </Box>
  );
}
