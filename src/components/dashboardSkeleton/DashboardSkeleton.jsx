import React from "react";
import { Box, Grid, Paper, Skeleton } from "@mui/material";

export function DashboardSkeleton() {
  return (
    <Box sx={{ height: "100vh", background: "#f8f9fa", display: "flex" }}>
      {/* Sidebar Skeleton */}
      <Box
        sx={{
          width: "240px", // same as your sidebar width
          background: "#f3f4f6",
          borderRight: "1px solid #edeef0",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Logo */}
        <Skeleton variant="rectangular" width={120} height={36} sx={{ mb: 4 }} />

        {/* Group titles */}
        {["MAIN", "MANAGEMENT", "COMMUNICATION", "SYSTEM"].map((title, i) => (
          <Skeleton
            key={title}
            variant="text"
            width={80}
            height={24}
            sx={{ mb: 2, mt: i !== 0 ? 3 : 0 }}
          />
        ))}

        {/* Navigation items */}
        {Array(12)
          .fill(null)
          .map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={180}
              height={40}
              sx={{ mb: 2 }}
            />
          ))}
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4 }}>
        {/* Topbar Skeleton */}
        <Paper
          elevation={2}
          sx={{
            mb: 4,
            width: "100%",
            height: 76,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 4,
            borderRadius: 3,
          }}
        >
          <Skeleton variant="text" width={140} height={36} />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
        </Paper>

        {/* Quick Stats Cards Skeleton */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper
                elevation={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 3,
                  borderRadius: 3,
                  gap: 2,
                }}
              >
                <Skeleton variant="circular" width={135} height={40} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="40%" height={32} />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Users Growth Chart Skeleton */}
        <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
          <Skeleton variant="text" width={180} height={32} sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={320} />
        </Paper>
      </Box>
    </Box>
  );
}




