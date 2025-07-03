import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";
import { api } from "../services/api";
import { OfferCard } from "../components/OfferCard";
import { useOffers } from "../hooks/useOffers";
import { useTags } from "../hooks/useTags";
import { useOfferModal } from "../hooks/useOfferModal";
import { useMySubscriptions } from "../hooks/useMySubscriptions";
import { AxiosError } from "axios";

export function HomePage() {
  const {
    offers,
    setOffers,
    loading: loadingOffers,
    error: errorOffers,
  } = useOffers();
  const { tags, loading: loadingTags, error: errorTags } = useTags();
  const {
    isModalOpen,
    selectedOffer,
    handleOpenModal,
    handleCloseModal,
    setSelectedOffer,
  } = useOfferModal();

  // buscar as inscrições do usuário logado
  const {
    mySubscriptions,
    setMySubscriptions,
    loading: loadingSubs,
  } = useMySubscriptions();

  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleTagClick = (tagId: string) => {
    setSelectedTagId(selectedTagId === tagId ? null : tagId);
  };

  const handleSubscribe = async () => {
    if (!selectedOffer) return;
    try {
      await api.post(`/offers/${selectedOffer.id}/subscribe`);
      setOffers((currentOffers) =>
        currentOffers.map((o) =>
          o.id === selectedOffer.id
            ? { ...o, _count: { subscriptions: o._count.subscriptions + 1 } }
            : o
        )
      );
      setSelectedOffer((prev) =>
        prev
          ? {
              ...prev,
              _count: { subscriptions: prev._count.subscriptions + 1 },
            }
          : null
      );
      // Adiciona a oferta à lista de inscrições para atualizar a UI
      setMySubscriptions((current) => [...current, selectedOffer]);
      setSnackbarMessage("Inscrição realizada com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleCloseModal();
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setSnackbarMessage(
          err.response?.data?.message || "Erro ao realizar inscrição."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  //  função para cancelar a inscrição
  const handleUnsubscribe = async () => {
    if (!selectedOffer) return;
    if (
      !window.confirm(
        `Tem certeza que deseja cancelar sua inscrição em "${selectedOffer.title}"?`
      )
    ) {
      return;
    }
    try {
      await api.delete(`/offers/${selectedOffer.id}/subscribe`);
      setOffers((currentOffers) =>
        currentOffers.map((o) =>
          o.id === selectedOffer.id
            ? { ...o, _count: { subscriptions: o._count.subscriptions - 1 } }
            : o
        )
      );
      setSelectedOffer((prev) =>
        prev
          ? {
              ...prev,
              _count: { subscriptions: prev._count.subscriptions - 1 },
            }
          : null
      );
      // Remove a oferta da lista de inscrições
      setMySubscriptions((current) =>
        current.filter((sub) => sub.id !== selectedOffer.id)
      );
      setSnackbarMessage("Inscrição cancelada com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleCloseModal();
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setSnackbarMessage(
          err.response.data.message || "Erro ao cancelar inscrição."
        );
      } else {
        setSnackbarMessage("Ocorreu um erro inesperado.");
      }
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const filteredOffers = selectedTagId
    ? offers.filter((offer) =>
        offer.tags.some((tag) => tag.id === selectedTagId)
      )
    : offers;

  if (loadingOffers || loadingTags || loadingSubs) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  const anyError = errorOffers || errorTags;
  if (anyError) {
    return <Alert severity="error">{anyError}</Alert>;
  }

  // 4. Lógica para verificar se o usuário está inscrito na oferta do modal
  const isSubscribedToSelectedOffer = mySubscriptions.some(
    (sub) => sub.id === selectedOffer?.id
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Feed de Ofertas
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Filtrar por Matéria:
        </Typography>
        <Chip
          label="Todas"
          onClick={() => setSelectedTagId(null)}
          color={!selectedTagId ? "primary" : "default"}
          sx={{ mr: 1, mb: 1 }}
        />
        {tags.map((tag) => (
          <Chip
            key={tag.id}
            label={tag.name}
            onClick={() => handleTagClick(tag.id)}
            color={selectedTagId === tag.id ? "primary" : "default"}
            variant={selectedTagId === tag.id ? "filled" : "outlined"}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={4}>
        {filteredOffers.length === 0 ? (
          <Grid size={{ xs: 12 }}>
            <Typography>
              Nenhuma oferta encontrada para o filtro selecionado.
            </Typography>
          </Grid>
        ) : (
          filteredOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onPrimaryAction={handleOpenModal}
              primaryActionText="Ver Mais"
            />
          ))
        )}
      </Grid>
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle variant="h4">{selectedOffer?.title}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>
            Descrição Completa
          </Typography>
          <Typography gutterBottom>{selectedOffer?.description}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
            Matérias
          </Typography>
          <Box sx={{ mb: 2 }}>
            {selectedOffer?.tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                sx={{ mr: 1 }}
                color="primary"
              />
            ))}
          </Box>
          <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
            Vagas
          </Typography>
          <Typography>
            {selectedOffer?._count.subscriptions} / {selectedOffer?.slots}{" "}
            inscritos
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 3 }}>
            Oferecido por: <strong>{selectedOffer?.offerer.name}</strong>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Fechar</Button>

          {/* 5. Renderização condicional do botão com base na verificação */}
          {isSubscribedToSelectedOffer ? (
            <Button
              variant="contained"
              color="error"
              onClick={handleUnsubscribe}
            >
              Cancelar Inscrição
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubscribe}
              disabled={
                selectedOffer
                  ? selectedOffer._count.subscriptions >= selectedOffer.slots
                  : true
              }
            >
              Inscrever-se!
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
