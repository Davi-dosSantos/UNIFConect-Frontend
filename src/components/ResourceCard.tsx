import {
  Grid,
  Card,
  CardContent,
  Chip,
  Typography,
  Box,
  CardActions,
  Button,
} from "@mui/material";
import type { Resource } from "../types";
import { api } from "../services/api";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const fileUrl = `${api.defaults.baseURL}${resource.file.path}`;

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #e0e0e0",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {resource.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {resource.description}
          </Typography>
          <Box sx={{ mb: 2 }}>
            {resource.tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                sx={{ mr: 1, mb: 1 }}
                color="secondary"
                variant="outlined"
              />
            ))}
          </Box>
        </CardContent>
        <CardActions
          sx={{ px: 2, pb: 2, mt: "auto", justifyContent: "space-between" }}
        >
          <Typography variant="caption" color="text.secondary">
            Enviado por: {resource.uploader.name}
          </Typography>
          <Button
            size="small"
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Baixar Material
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
