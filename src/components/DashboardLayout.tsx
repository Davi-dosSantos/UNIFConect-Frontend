import { ReactNode, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AppBar, Avatar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Book, CalendarToday, Chat, Description, Home, Logout, Person } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

interface DashboardLayoutProps {
    children: ReactNode;
    currentPage: string;
    navigate: (page: string) => void;
}

export function DashboardLayout({ children, currentPage, navigate }: DashboardLayoutProps) {
    const { user, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const navItems = [
        { label: 'Início', icon: <Home />, target: 'home' },
        { label: 'Ofertas de Ajuda', icon: <Book />, target: 'offers' },
        { label: 'Eventos', icon: <CalendarToday />, target: 'events' },
        { label: 'Recursos', icon: <Description />, target: 'resources' },
        { label: 'Chat', icon: <Chat />, target: 'chat' },
        { label: 'Meu Perfil', icon: <Person />, target: 'profile' },
    ];

    const drawerContent = (
        <div>
            <Toolbar />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton selected={currentPage === item.target} onClick={() => { navigate(item.target); if (!isSmUp) handleDrawerToggle(); }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={logout}><ListItemIcon><Logout /></ListItemIcon><ListItemText primary="Sair" /></ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px}` } }}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}><MenuIcon /></IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>UNIFConect</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                       <Avatar alt={user?.name} src={`https://i.pravatar.cc/150?u=${user?.email}`} />
                       <Typography sx={{display: {xs: 'none', md: 'block'}}}>{user?.name}</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>{drawerContent}</Drawer>
                <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }} open>{drawerContent}</Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}