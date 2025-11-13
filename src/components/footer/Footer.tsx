import React from "react";
import { Box, Typography, useTheme, alpha, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        bgcolor: theme.palette.background.paper,
        borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        borderRadius: 2,
        boxShadow: theme.shadows[2],
        px: 3,
        py: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      {/* Left side */}
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} MyAdmin Dashboard — All rights reserved.
      </Typography>

      {/* Right side (optional icons/links) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          size="small"
          sx={{
            color: theme.palette.primary.main,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.15) },
          }}
          href="https://github.com"
          target="_blank"
        >
          <GitHubIcon fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          sx={{
            color: theme.palette.primary.main,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.15) },
          }}
          href="https://linkedin.com"
          target="_blank"
        >
          <LinkedInIcon fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          sx={{
            color: theme.palette.primary.main,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.15) },
          }}
          href="/"
        >
          <LanguageIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
