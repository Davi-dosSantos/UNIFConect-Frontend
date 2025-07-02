import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Avatar,
  Paper,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
} from "@mui/material";
import { api } from "../services/api";
import { jwtDecode } from "jwt-decode";
import { AxiosError } from "axios";

import type { Offer, Profile as ProfileType, User as UserType } from "../types";

export function ProfilePage() {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userId } = useParams<{ userId: string }>();

  const token = localStorage.getItem("authToken");
  const loggedInUserId = token ? (jwtDecode(token) as { id: string }).id : null;

  const targetUserId = userId || loggedInUserId;

  useEffect(() => {
    if (!targetUserId) {
      setError("ID de usuário não encontrado.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        if (targetUserId === loggedInUserId && token) {
          const decodedToken = jwtDecode(token) as {
            name: string;
            id: string;
          };
          setUser({
            name: decodedToken.name,
            id: decodedToken.id,
            email: "",
            password: "",
          });
        }

        const offersResponse = await api.get(`/users/${targetUserId}/offers`);
        setOffers(offersResponse.data);

        try {
          const profileResponse = await api.get(
            `/users/${targetUserId}/profile`
          );
          setProfile(profileResponse.data);
        } catch (profileError) {
          if (
            profileError instanceof AxiosError &&
            profileError.response?.status === 404
          ) {
            setProfile(null);
          } else {
            throw profileError;
          }
        }
      } catch (err) {
        setError("Não foi possível carregar os dados da página.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [targetUserId, loggedInUserId, token]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Avatar
          src={profile?.avatarUrl || ""}
          sx={{ width: 80, height: 80, mr: 2 }}
        />
        <Box>
          <Typography variant="h4">{user?.name || "Usuário"}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {profile?.course || "Curso não informado"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {profile?.institution || "Instituição não informada"}
          </Typography>
        </Box>
        {targetUserId === loggedInUserId && (
          <Button
            component={Link}
            to="/profile/edit"
            variant="outlined"
            sx={{ ml: "auto" }}
          >
            {profile ? "Editar Perfil" : "Editar Perfil"}
          </Button>
        )}
      </Box>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {profile?.bio ||
          'Nenhuma biografia adicionada. Clique em "Editar Perfil" para começar!'}
      </Typography>

      <Typography variant="h5" gutterBottom>
        Atividades Criadas
      </Typography>
      <Grid container spacing={2}>
        {offers.length > 0 ? (
          offers.map((offer) => (
            <Grid size={{ xs: 12, md: 6 }} key={offer.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{offer.title}</Typography>
                  <Box sx={{ mt: 1 }}>
                    {offer.tags.map((tag) => (
                      <Chip
                        key={tag.id}
                        label={tag.name}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid size={12}>
            <Typography sx={{ ml: 2 }}>
              Nenhuma oferta criada por este usuário.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
