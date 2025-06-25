import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

interface EventCreationData {
    title: string;
    description: string;
    scheduled_for: string;
}

interface CreateEventDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: EventCreationData) => void;
}

export function CreateEventDialog({ open, onClose, onSubmit }: CreateEventDialogProps) {
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
