import { Settings, Star } from "@mui/icons-material";
import { Box, Card, CardContent, CircularProgress, Grid, Typography, Button, CardActions, Container, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { User } from "../types";

export function ProfilePage() {
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        api.getUserProfile().then(data => {
            setProfile(data);
            setLoading(false);
        });
    }, []);

    if (loading || !profile) return <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}><CircularProgress /></Box>;

    return (
        <Container maxWidth="md">
           <Card><CardContent>
               <Grid container spacing={2} alignItems="center">
                   <Grid>
                        <Avatar alt={profile.name} src={`https://i.pravatar.cc/150?u=${profile.email}`} sx={{ width: 100, height: 100, border: '3px solid', borderColor: 'primary.main' }} />
                   </Grid>
                   <Grid>
                       <Typography variant="h4" component="h2" sx={{wordBreak: 'break-word'}}>{profile.name}</Typography>
                       <Typography variant="body1" color="text.secondary">{profile.email}</Typography>
                       <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, flexWrap: 'wrap' }}>
                           <Box sx={{ display: 'flex' }}>
                               <Star sx={{ color: '#ffc107' }} /><Star sx={{ color: '#ffc107' }} /><Star sx={{ color: '#ffc107' }} /><Star sx={{ color: '#ffc107' }} /><Star sx={{ color: 'action.disabled' }} />
                           </Box>
                           <Typography sx={{ ml: 1 }}>(14 avaliações)</Typography>
                       </Box>
                   </Grid>
               </Grid>
               <Box mt={4}>
                   <Typography variant="h6" gutterBottom>Sobre mim</Typography>
                   <Typography variant="body1">{profile.bio}</Typography>
               </Box>
           </CardContent><CardActions>
               <Button variant="contained" startIcon={<Settings />}>Editar Perfil</Button>
           </CardActions></Card>
        </Container>
     );
}

