import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import Footer from "../components/footer/Footer";

const SIDEBAR_WIDTH = 260;

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width:900px)");

  const handleSidebarToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f9fafb" }}>
      
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onSidebarToggle={handleSidebarToggle} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          ...(isDesktop && {
            ml: `${SIDEBAR_WIDTH}px`, 
          }),
        }}
      >
        {/* Topbar */}
        <Topbar onSidebarToggle={handleSidebarToggle} />

        {/* Page Content */}
        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Outlet />
        </Box>
           {/* Footer */}
      <Footer />
      </Box>
   
    </Box>
  );
}
