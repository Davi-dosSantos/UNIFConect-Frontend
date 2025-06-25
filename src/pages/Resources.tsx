import { AddCircle } from "@mui/icons-material";
import { Box, Card, CardContent, CircularProgress, Grid, Typography, Button, CardActions, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { Resource } from "../types";
import { api } from "../services/api";

export function ResourcesPage() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        api.getResources().then(data => {
            setResources(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}><CircularProgress /></Box>;
    
    return (
        <Box>
           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
               <Typography variant="h4">Recursos e Materiais</Typography>
               <Button variant="contained" startIcon={<AddCircle />}>Adicionar Recurso</Button>
           </Box>
           <Grid container spacing={3}>
               {resources.map(resource => (
                   <Grid size={{ xs: 6, md: 4 }} key={resource.id}>
                        <Card variant="outlined"><CardContent>
                           <Typography variant="caption">{resource.subject.name}</Typography>
                           <Typography variant="h6">{resource.title}</Typography>
                           <Typography color="text.secondary" variant="body2">Enviado por: {resource.added_by.name}</Typography>
                       </CardContent><CardActions><Button size="small">Baixar</Button></CardActions></Card>
                   </Grid>
               ))}
           </Grid>
       </Box>
   );
}