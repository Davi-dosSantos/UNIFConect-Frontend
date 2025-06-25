import { AddCircle } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, Typography, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Event, EventCreationData } from "../types";
import { useAuth } from "../context/AuthContext";


export function EventsPage() {
    const { user } = useAuth();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        api.getEvents().then(data => {
            setEvents(data);
            setLoading(false);
        });
    }, []);

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);


    const handleAddEvent = (newEventData: EventCreationData) => {
        if (!user) return; // Garante que o usuário está logado

        api.createEvent(newEventData, user).then(newEvent => {
            setEvents(prevEvents => [...prevEvents, newEvent]);
            handleCloseDialog();
        });
    };

    if (loading) return <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}><CircularProgress /></Box>;

    return (
        <Box>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Eventos Acadêmicos</Typography>
                <Button variant="contained" startIcon={<AddCircle />} onClick={handleOpenDialog}>
                    Criar Novo Evento
                </Button>
            </Box>
            <CreateEventDialog 
                open={dialogOpen}
                onClose={handleCloseDialog}
                onSubmit={handleAddEvent}
            />
            <Grid container spacing={3}>
                 {events.map(event => (
                    <Grid size={12} key={event.id}>
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

interface CreateEventDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: EventCreationData) => void;
}

function CreateEventDialog({ open, onClose, onSubmit }: CreateEventDialogProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [scheduledFor, setScheduledFor] = useState('');

    const handleSubmit = () => {
        if (!title || !description || !scheduledFor) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        onSubmit({ title, description, scheduled_for: scheduledFor });
        // Limpar campos após o envio
        setTitle('');
        setDescription('');
        setScheduledFor('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Criar Novo Evento</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Preencha os detalhes abaixo para criar um novo evento para a comunidade.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Título do Evento"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Descrição"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="standard"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="scheduled_for"
                    label="Data e Hora"
                    type="datetime-local"
                    fullWidth
                    variant="standard"
                    value={scheduledFor}
                    onChange={(e) => setScheduledFor(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit}>Criar</Button>
            </DialogActions>
        </Dialog>
    );
}

