import { Box, Card, CardContent, CircularProgress, Grid, Typography, Button, CardActions, Chip, Container, Avatar, TextField, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Work } from "@mui/icons-material";

interface LoginPageProps {
    navigate: (page: 'register') => void;
}
export function LoginPage({ navigate }: LoginPageProps) {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        await login(email, password);
        setLoading(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}><Work /></Avatar>
                <Typography component="h1" variant="h5">UNIFConect</Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth id="email" label="Endereço de Email" name="email" autoComplete="email" autoFocus />
                    <TextField margin="normal" required fullWidth name="password" label="Senha" type="password" id="password" autoComplete="current-password" />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : "Entrar"}
                    </Button>
                    <Grid container><Grid><Link href="#" variant="body2" onClick={() => navigate('register')}>{"Não tem uma conta? Cadastre-se"}</Link></Grid></Grid>
                </Box>
            </Box>
        </Container>
    );
}
