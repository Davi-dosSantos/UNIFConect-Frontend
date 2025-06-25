import { AddCircle } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, Typography, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Event as AppEvent } from "../types";

export function EventsPage() {
    const [events, setEvents] = useState<AppEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        api.getEvents().then(data => {
            setEvents(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}><CircularProgress /></Box>;

    return (
        <Box>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Eventos Acadêmicos</Typography>
                <Button variant="contained" startIcon={<AddCircle />}>Criar Novo Evento</Button>
            </Box>
            <Grid container spacing={3}>
                 {events.map(event => (
                    <Grid size={{xs: 12, md: 6}} key={event.id}>
                        <Card variant="outlined"><CardContent>
                            <Typography variant="h6">{event.title}</Typography>
                            <Typography color="text.secondary">{event.description}</Typography>
                            <Typography variant="body2" sx={{ mt: 2 }}>Organizador: {event.organizer.name}</Typography>
                            <Typography variant="body2" color="primary">{new Date(event.scheduled_for).toLocaleString('pt-BR')}</Typography>
                        </CardContent></Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}