import React, { useState, useMemo } from "react";
import {
  Box, Typography, Button, TextField, Collapse, Divider, Paper
} from "@mui/material";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, CartesianGrid,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { IconChartDots2 } from "@tabler/icons-react";

// Dummy Data
const userActivityData = [
  { date: "Week 1", logins: 120, purchases: 40 },
  { date: "Week 2", logins: 150, purchases: 65 },
  { date: "Week 3", logins: 200, purchases: 75 },
  { date: "Week 4", logins: 170, purchases: 80 },
];

const salesPerformanceData = [
  { month: "Jan", revenue: 4000, cost: 2400 },
  { month: "Feb", revenue: 3000, cost: 1398 },
  { month: "Mar", revenue: 2000, cost: 9800 },
  { month: "Apr", revenue: 2780, cost: 3908 },
  { month: "May", revenue: 1890, cost: 4800 },
];

const customerSegmentsData = [
  { segment: "New Customers", value: 120 },
  { segment: "Returning Customers", value: 80 },
  { segment: "VIP Customers", value: 45 },
  { segment: "Churned Customers", value: 30 },
  { segment: "Inactive", value: 60 },
];

export default function Analytics() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredUserActivity = useMemo(() => {
    if (!searchTerm.trim()) return userActivityData;
    return userActivityData.filter(({ date }) =>
      date.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredSalesPerformance = useMemo(() => {
    if (!searchTerm.trim()) return salesPerformanceData;
    return salesPerformanceData.filter(({ month }) =>
      month.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredCustomerSegments = useMemo(() => {
    if (!searchTerm.trim()) return customerSegmentsData;
    return customerSegmentsData.filter(({ segment }) =>
      segment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <Box
      sx={{
        height: "calc(100vh - 80px)",  
        overflowY: "auto",
        px: 3,
        py: 3,
        bgcolor: "#f8f9fa",
      }}
    >
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  }}
>

<Box sx={{ mb: 2 }}>
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <IconChartDots2 size={32} stroke={2} />
    <Typography variant="h4" fontWeight={700} color="text.primary">
      Analytics Dashboard
    </Typography>
  </Box>

  <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5, ml: 5 }}>
    Insights and performance overview
  </Typography>
</Box>

  <Button variant="contained" onClick={() => setFilterOpen(!filterOpen)}>
    {filterOpen ? "Hide Filters" : "Show Filters"}
  </Button>
</Box>

<Collapse in={filterOpen} timeout="auto" unmountOnExit sx={{ mt: 2 }}>
  <TextField
    label="Search Data"
    variant="outlined"
    value={searchTerm}
    onChange={handleSearchChange}
    sx={{ width: 300 }}
    placeholder="Search by week, month, or segment..."
    autoFocus
  />
  <Divider sx={{ mt: 2 }} />
</Collapse>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 2 }}>

        {/* User Activity */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={700} mb={1}>
            User Activity Trends
          </Typography>
          <Typography variant="body2" mb={2} color="text.secondary">
            Weekly logins vs purchases
          </Typography>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={filteredUserActivity}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="logins" stroke="#1976d2" strokeWidth={3} />
              <Line type="monotone" dataKey="purchases" stroke="#ff5722" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        {/* Sales Performance */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={700} mb={1}>
            Sales Performance
          </Typography>
          <Typography variant="body2" mb={2} color="text.secondary">
            Monthly revenue vs cost
          </Typography>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={filteredSalesPerformance}>
              <defs>
                <linearGradient id="revenueG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2e7d32" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#2e7d32" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="costG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d32f2f" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#d32f2f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Area type="monotone" dataKey="revenue" fill="url(#revenueG)" stroke="#2e7d32" strokeWidth={2} />
              <Area type="monotone" dataKey="cost" fill="url(#costG)" stroke="#d32f2f" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>

        {/* Customer Segments */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={700} mb={1}>
            Customer Segment Distribution
          </Typography>
          <Typography variant="body2" mb={2} color="text.secondary">
            Customer groups and distribution
          </Typography>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={filteredCustomerSegments}>
              <PolarGrid />
              <PolarAngleAxis dataKey="segment" />
              <PolarRadiusAxis />
              <Radar name="Customers" dataKey="value" stroke="#673ab7" fill="#673ab7" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </Paper>

      </Box>
    </Box>
  );
}
