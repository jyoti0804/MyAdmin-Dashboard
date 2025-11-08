import { Box, useTheme, ThemeProvider, createTheme } from "@mui/material";
import AppRoutes from "./routes/AppRoutes";
import getTheme from "./theme.js";

function App() {
  const theme = createTheme(getTheme()); 

  const onSidebarToggle = () => {
    console.log("sidebar toggle clicked");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: theme.palette.background.default,
        }}
      >
        <AppRoutes />
      </Box>
    </ThemeProvider>
  );
}

export default App;
