import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          UNIFConect
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Desenvolvido por Davi dos Santos Costa
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <IconButton
            aria-label="GitHub"
            component={Link}
            href="https://github.com/Davi-dosSantos"
            target="_blank"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            aria-label="LinkedIn"
            component={Link}
            href="https://linkedin.com/in/davi-dos-santos-costa-22687b207"
            target="_blank"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            aria-label="Email"
            component="a"
            href="mailto:daviita1@hotmail.com"
          >
            <EmailIcon />
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 1 }}
        >
          {"Copyright © "}
          <Link color="inherit" href="#">
            UNIFConect
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}
