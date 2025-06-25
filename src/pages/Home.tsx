import { Grid, Typography, Card, CardContent, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export function HomePage() {
    const { user } = useAuth();
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                 <Typography variant="h4">Bem-vindo(a) de volta, {user?.name}!</Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid size={12}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" color="primary">Minhas Ofertas Ativas</Typography>
                            <Typography>Você tem 2 ofertas ativas.</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={12}>
                     <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" color="primary">Próximo Evento</Typography>
                            <Typography>Grupo de Estudos de Álgebra Linear.</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={12}>
                     <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" color="primary">Novas Mensagens</Typography>
                            <Typography>Você tem 5 novas mensagens.</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
