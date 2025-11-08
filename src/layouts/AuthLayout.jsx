import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Paper, Typography } from "@mui/material";

export default function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" align="center" fontWeight={600} mb={2}>
            MyAdmin Dashboard
          </Typography>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
}
