import { Chat } from "@mui/icons-material";
import { Box, Typography,} from "@mui/material";


export function ChatPage() {
    return (
      <Box sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>
        <Chat sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h5">Funcionalidade de Chat</Typography>
        <Typography>Esta seção está em desenvolvimento.</Typography>
      </Box>
    );
}