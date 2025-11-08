import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  useTheme,
  alpha,
  Badge,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Topbar = ({ onSidebarToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 2 }}>
      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          bgcolor: theme.palette.background.paper,
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          borderRadius: 2,
          color: theme.palette.text.primary,
          px: 1,
          boxShadow: theme.shadows[3],
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>

          {/* Logo + App Name */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Sidebar Toggle  */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                onClick={onSidebarToggle}
                size="large"
                sx={{
                  color: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.25) },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#000" }}   
            >
              MyAdmin
            </Typography>
          </Box>

          {/* Action Icons + User Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

            {/* Notifications */}
            <IconButton onClick={() => navigate("/notifications")}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Settings */}
            <IconButton onClick={() => navigate("/settings")}>
              <SettingsIcon />
            </IconButton>

            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: 36,
                    height: 36,
                    boxShadow: `0 0 6px ${alpha(theme.palette.primary.main, 0.3)}`,
                  },
                },
              }}
            />
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Topbar;
