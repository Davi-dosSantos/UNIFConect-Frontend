import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Grid,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
} from "@mui/material";
import { api } from "../services/api";
import { jwtDecode } from "jwt-decode";
import { OfferCard } from "../components/OfferCard";
import { useOfferModal } from "../hooks/useOfferModal";
import type { Offer } from "../types";
import { AxiosError } from "axios";

export function MyActivitiesPage() {
  const [myOffers, setMyOffers] = useState<Offer[]>([]);
  const [mySubscriptions, setMySubscriptions] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTab, setCurrentTab] = useState(0);

  // Usando o hook para controlar o modal
  const { isModalOpen, selectedOffer, handleOpenModal, handleCloseModal } =
    useOfferModal();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Usuário não autenticado.");
        setLoading(false);
        return;
      }

      const { id: userId } = jwtDecode(token) as { id: string };

      const [offersResponse, subscriptionsResponse] = await Promise.all([
        api.get(`/users/${userId}/offers`),
        api.get("/users/me/subscriptions"),
      ]);
      setMyOffers(offersResponse.data);
      setMySubscriptions(subscriptionsResponse.data);
    } catch (err) {
      setError("Não foi possível carregar suas atividades.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // As funções de inscrever e desinscrever agora vivem aqui
  const handleSubscribe = async () => {
    if (!selectedOffer) return;
    try {
      await api.post(`/offers/${selectedOffer.id}/subscribe`);
      setSnackbarMessage("Inscrição realizada com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleCloseModal();
      fetchData(); // Re-busca os dados para atualizar as listas
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setSnackbarMessage(
          err.response.data.message || "Erro ao se inscrever."
        );
      } else {
        setSnackbarMessage("Ocorreu um erro inesperado.");
      }
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleUnsubscribe = async (offerToUnsubscribe: Offer) => {
    // A confirmação agora acontece dentro do modal ou no clique direto
    if (
      !window.confirm(
        `Tem certeza que deseja cancelar sua inscrição em "${offerToUnsubscribe.title}"?`
      )
    ) {
      return;
    }

    try {
      await api.delete(`/offers/${offerToUnsubscribe.id}/subscribe`);
      setSnackbarMessage("Inscrição cancelada com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      if (isModalOpen) handleCloseModal();
      fetchData(); // Re-busca os dados para atualizar as listas
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setSnackbarMessage("Erro ao cancelar a inscrição.");
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

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;

  // Verificação de inscrição para o botão do modal
  const isSubscribedToSelectedOffer = mySubscriptions.some(
    (sub) => sub.id === selectedOffer?.id
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Minhas Atividades
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Minhas Ofertas" />
          <Tab label="Minhas Inscrições" />
        </Tabs>
      </Box>

      {/* Aba de Minhas Ofertas */}
      {currentTab === 0 && (
        <Grid container spacing={4}>
          {myOffers.length > 0 ? (
            myOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                primaryActionText="Ver Detalhes"
                onPrimaryAction={handleOpenModal}
              />
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <Typography>Você ainda não criou nenhuma oferta.</Typography>
            </Grid>
          )}
        </Grid>
      )}

      {/* Aba de Minhas Inscrições */}
      {currentTab === 1 && (
        <Grid container spacing={4}>
          {mySubscriptions.length > 0 ? (
            mySubscriptions.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                primaryActionText="Cancelar Inscrição"
                onPrimaryAction={handleUnsubscribe}
                secondaryActionText="Ver Detalhes"
                onSecondaryAction={handleOpenModal}
              />
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <Typography>Você não está inscrito em nenhuma oferta.</Typography>
            </Grid>
          )}
        </Grid>
      )}
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
          {isSubscribedToSelectedOffer ? (
            <Button
              variant="contained"
              color="error"
              onClick={() => selectedOffer && handleUnsubscribe(selectedOffer)}
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
              Tenho Interesse!
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
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
