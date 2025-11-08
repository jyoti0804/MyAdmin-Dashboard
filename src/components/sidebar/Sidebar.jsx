import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  Box,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import HistoryIcon from "@mui/icons-material/History";
import ExtensionIcon from "@mui/icons-material/Extension";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BarChartIcon from "@mui/icons-material/BarChart";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, onSidebarToggle }) => {
  const location = useLocation();

  const [openGroup, setOpenGroup] = useState({
    main: true,
    management: false,
    communication: false,
    system: false,
  });

  const handleGroupToggle = (group) => {
    setOpenGroup((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const renderNavItem = (name, icon, path) => {
    const isActive = location.pathname === path;

    return (
      <ListItemButton
        component={Link}
        to={path}
        onClick={onSidebarToggle}
        sx={{
          borderRadius: 1.5,
          mb: 0.5,
          ...(isActive && {
            bgcolor: "rgba(0, 110, 255, 0.12)",
            "& .MuiListItemIcon-root": { color: "#006EFF" },
            "& .MuiListItemText-primary": { color: "#006EFF", fontWeight: 600 },
          }),
        }}
      >
        <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    );
  };

  const content = (
    <Box sx={{ width: drawerWidth, p: 1.5 }}>
      {/* Logo Section */}
      <Toolbar sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            bgcolor: "#006EFF",
            width: 32,
            height: 32,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: "0.9rem",
          }}
        >
          M
        </Box>
        <Typography variant="h6" fontWeight={700}>
          MyAdmin
        </Typography>
      </Toolbar>

      <Divider sx={{ mb: 1 }} />

      <List component="nav">
        {/* MAIN */}
        <ListItemButton onClick={() => handleGroupToggle("main")}>
          <ListItemText primary="MAIN" primaryTypographyProps={{ fontWeight: 700, fontSize: 12 }} />
          {openGroup.main ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openGroup.main} timeout={250} unmountOnExit>
          <Box sx={{ pl: 1 }}>
            {renderNavItem("Dashboard", <DashboardIcon />, "/dashboard")}
            {renderNavItem("Analytics", <BarChartIcon />, "/analytics")}
            {renderNavItem("Reports", <AssessmentIcon />, "/reports")}
          </Box>
        </Collapse>

        {/* MANAGEMENT */}
        <ListItemButton onClick={() => handleGroupToggle("management")}>
          <ListItemText primary="MANAGEMENT" primaryTypographyProps={{ fontWeight: 700, fontSize: 12 }} />
          {openGroup.management ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openGroup.management} timeout={250} unmountOnExit>
          <Box sx={{ pl: 1 }}>
            {renderNavItem("Users", <GroupIcon />, "/users")}
            {renderNavItem("Roles", <AdminPanelSettingsIcon />, "/roles")}
            {renderNavItem("Products", <InventoryIcon />, "/products")}
            {renderNavItem("Orders", <ShoppingCartIcon />, "/orders")}
          </Box>
        </Collapse>

        {/* COMMUNICATION */}
        <ListItemButton onClick={() => handleGroupToggle("communication")}>
          <ListItemText primary="COMMUNICATION" primaryTypographyProps={{ fontWeight: 700, fontSize: 12 }} />
          {openGroup.communication ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openGroup.communication} timeout={250} unmountOnExit>
          <Box sx={{ pl: 1 }}>
            {renderNavItem("Messages", <MessageIcon />, "/messages")}
            {renderNavItem("Notifications", <NotificationsIcon />, "/notifications")}
            {renderNavItem("Support", <SupportAgentIcon />, "/support")}
          </Box>
        </Collapse>

        {/* SYSTEM */}
        <ListItemButton onClick={() => handleGroupToggle("system")}>
          <ListItemText primary="SYSTEM" primaryTypographyProps={{ fontWeight: 700, fontSize: 12 }} />
          {openGroup.system ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openGroup.system} timeout={250} unmountOnExit>
          <Box sx={{ pl: 1 }}>
            {renderNavItem("Settings", <SettingsIcon />, "/settings")}
            {renderNavItem("Integrations", <ExtensionIcon />, "/integrations")}
            {renderNavItem("Calendar", <CalendarTodayIcon />, "/calendar")}
            {renderNavItem("Logs", <HistoryIcon />, "/logs")}
          </Box>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onSidebarToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        {content}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", borderRight: "none" },
        }}
        open
      >
        {content}
      </Drawer>
    </>
  );
};

export default Sidebar;
