import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Box,
  ListItemIcon,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { jwtDecode } from "jwt-decode";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import FolderIcon from "@mui/icons-material/Folder";
import { Footer } from "./Footer";
import { useUserProfile } from "../hooks/useUserProfile";
import logoBranco from "../assets/UNIFConect_LogoBranco.svg";
interface UserPayload {
  id: string;
  name: string;
}

export function MainLayout() {
  const navigate = useNavigate();
  const { profile } = useUserProfile();
  const [user, setUser] = useState<UserPayload | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode<UserPayload>(token);
      setUser(decodedToken);
    }
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("authToken");
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  const handleNavigate = (path: string) => {
    handleClose();
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate("/home")}
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <img
              src={logoBranco} // Use a variável entre chaves {}
              alt="Logo Unifconect"
              style={{
                width: 40,
                height: 40,
                marginRight: 8,
                verticalAlign: "middle",
              }}
            />
            UNIFConect
          </Typography>

          {/* Link para a página de Acervo */}
          <Button color="inherit" onClick={() => navigate("/resources")}>
            Acervo
          </Button>

          <Button color="inherit" onClick={() => navigate("/offers/new")}>
            Atividades
          </Button>

          {/* Menu do Usuário */}
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <Typography sx={{ display: { xs: "none", sm: "block" }, mr: 1 }}>
              Olá, {user?.name || "Usuário"}
            </Typography>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <Avatar
                src={profile?.avatarUrl || ""}
                sx={{ width: 32, height: 32 }}
              >
                {!profile?.avatarUrl && <AccountCircle />}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleNavigate("/my-activities")}>
                <ListItemIcon>
                  <FolderIcon fontSize="small" />
                </ListItemIcon>
                Minhas Atividades
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/profile")}>
                <ListItemIcon>
                  <AccountCircle fontSize="small" />
                </ListItemIcon>
                Meu Perfil
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Sair
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}
