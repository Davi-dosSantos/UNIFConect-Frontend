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
import type { Offer } from "../types";

interface OfferCardProps {
  offer: Offer;
  primaryActionText?: string;
  onPrimaryAction?: (offer: Offer) => void;
  secondaryActionText?: string;
  onSecondaryAction?: (offer: Offer) => void;
}

export function OfferCard({
  offer,
  primaryActionText,
  onPrimaryAction,
  secondaryActionText,
  onSecondaryAction,
}: OfferCardProps) {
  const subscriptionCount = offer._count?.subscriptions ?? 0;
  const isFull = subscriptionCount >= offer.slots;

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #e0e0e0",
          opacity: isFull && !primaryActionText?.includes("Cancelar") ? 0.6 : 1,
          transition: "opacity 0.3s",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          {isFull && (
            <Chip
              label="Vagas Esgotadas"
              color="error"
              size="small"
              sx={{ mb: 1 }}
            />
          )}
          <Typography gutterBottom variant="h5" component="h2">
            {offer.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, height: "60px", overflow: "hidden" }}
          >
            {offer.description}
          </Typography>
          <Box sx={{ mb: 2 }}>
            {offer.tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                sx={{ mr: 1, mb: 1 }}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </CardContent>
        <CardActions
          sx={{ px: 2, pb: 2, mt: "auto", justifyContent: "space-between" }}
        >
          <Typography variant="caption" color="text.secondary">
            Oferecido por: {offer.offerer.name}
          </Typography>

          <Box>
            {/* Botão de Ação Secundária (ex: Ver Mais) */}
            {onSecondaryAction && secondaryActionText && (
              <Button size="small" onClick={() => onSecondaryAction(offer)}>
                {secondaryActionText}
              </Button>
            )}
            {/* Botão de Ação Primária (ex: Cancelar Inscrição) */}
            {onPrimaryAction && primaryActionText && (
              <Button
                size="small"
                onClick={() => onPrimaryAction(offer)}
                color={
                  primaryActionText.includes("Cancelar") ? "error" : "primary"
                }
              >
                {primaryActionText}
              </Button>
            )}
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}
