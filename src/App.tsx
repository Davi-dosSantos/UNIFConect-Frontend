import { useState } from "react";
import { AuthProvider, useAuth } from './context/AuthContext';
import { OffersPage } from "./pages/Offers";
import { EventsPage } from "./pages/Events";
import { ResourcesPage } from "./pages/Resources";
import { ChatPage } from "./pages/Chat";
import { ProfilePage } from "./pages/Profile";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { DashboardLayout } from "./components/DashboardLayout";
import { createTheme, Theme } from "@mui/material/styles";

const theme: Theme = createTheme();

function AppContent() {
    const isAuthenticated = useAuth();
    const [page, setPage] = useState('home');
    const [authPage, setAuthPage] = useState('login'); // 'login' or 'register'

    const renderPage = () => {
        switch (page) {
            case 'offers': return <OffersPage />;
            case 'events': return <EventsPage />;
            case 'resources': return <ResourcesPage />;
            case 'chat': return <ChatPage />;
            case 'profile': return <ProfilePage />;
            case 'home':
            default: return <HomePage />;
        }
    };

    if (!isAuthenticated) {
        if(authPage === 'login') {
            return <LoginPage navigate={() => setAuthPage('register')} />;
        }
        return <RegisterPage navigate={() => setAuthPage('login')} />;
    }

    return (
        <DashboardLayout currentPage={page} navigate={setPage}>
            {renderPage()}
        </DashboardLayout>
    );
}

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </ThemeProvider>
    );
}
