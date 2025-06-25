import { Grid, Typography, Card, CardContent } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export function HomePage() {
    const { user } = useAuth();
    return (
        <Grid container spacing={5} sx={{ marginTop:0 }}>
            <Grid size={12}>
                <Typography variant="h4" color="primary">Bem-vindo, {user?.name || "Usuário"}!</Typography>
            </Grid>

        <Grid container spacing={3}>
            <Grid size={{xs: 12, md: 4}}><Card><CardContent><Typography variant="h6" color="primary">Minhas Ofertas Ativas</Typography><Typography>Você tem 2 ofertas ativas.</Typography></CardContent></Card></Grid>
            <Grid size={{xs: 12, md: 4}}><Card><CardContent><Typography variant="h6" color="primary">Próximo Evento</Typography><Typography>Grupo de Estudos de Álgebra Linear.</Typography></CardContent></Card></Grid>
            <Grid size={{xs: 12, md: 4}}><Card><CardContent><Typography variant="h6" color="primary">Novas Mensagens</Typography><Typography>Você tem 5 novas mensagens.</Typography></CardContent></Card></Grid>
        </Grid>
        </Grid>
    );
}
