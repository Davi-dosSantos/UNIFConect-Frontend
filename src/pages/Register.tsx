import { Work } from "@mui/icons-material";
import { Box, Grid, Typography, Button, Container, Avatar, TextField, Link } from "@mui/material";

export interface RegisterPageProps {
    navigate: (page: 'login') => void;
}
export function RegisterPage({ navigate }: RegisterPageProps) {
     return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}><Work /></Avatar>
                <Typography component="h1" variant="h5">Criar Conta</Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid size={12}><TextField required fullWidth label="Nome Completo" name="name" /></Grid>
                        <Grid size={12}><TextField required fullWidth label="Endereço de Email" name="email" /></Grid>
                        <Grid size={12}><TextField required fullWidth name="password" label="Senha" type="password" /></Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Criar Conta</Button>
                    <Grid container justifyContent="flex-end"><Grid><Link href="#" variant="body2" onClick={() => navigate('login')}>Já tem uma conta? Acesse aqui</Link></Grid></Grid>
                </Box>
            </Box>
        </Container>
    );
}