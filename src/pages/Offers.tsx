import { Box, Card, CardContent, CircularProgress, Grid, Typography, Button, CardActions, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { Offer } from "../types";
import { AddCircle } from "@mui/icons-material";
import { api } from "../services/api";

export function OffersPage() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        api.getOffers().then(data => {
            setOffers(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}><CircularProgress /></Box>;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}><Typography variant="h4">Ofertas de Ajuda</Typography><Button variant="contained" startIcon={<AddCircle />}>Criar Nova Oferta</Button></Box>
            <Grid container spacing={3}>
                {offers.map(offer => (
                    <Grid size={12} key={offer.id}>
                        <Card variant="outlined"><CardContent>
                            <Chip label={offer.type === 'help' ? 'OFERTA' : 'PEDIDO'} color={offer.type === 'help' ? 'success' : 'warning'} size="small" sx={{ mb: 1 }} />
                            <Typography variant="h6">{offer.subject.name}</Typography>
                            <Typography color="text.secondary">{offer.description}</Typography>
                        </CardContent><CardActions><Button size="small">Ver Detalhes</Button></CardActions></Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}