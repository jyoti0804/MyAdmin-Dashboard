import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  TablePagination,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { IconLogs } from "@tabler/icons-react";

// sample logs
const initialLogs = [
  { id: 1, message: "User logged in", severity: "Info", date: "2025-11-06 10:22 AM" },
  { id: 2, message: "Payment failed", severity: "Error", date: "2025-11-06 11:05 AM" },
  { id: 3, message: "Profile updated", severity: "Info", date: "2025-11-06 11:30 AM" },
  { id: 4, message: "API response slow", severity: "Warning", date: "2025-11-06 12:10 PM" },
  { id: 5, message: "New user registered", severity: "Info", date: "2025-11-06 12:45 PM" },
  { id: 6, message: "Server CPU high", severity: "Warning", date: "2025-11-06 01:15 PM" },
  { id: 7, message: "Database backup completed", severity: "Info", date: "2025-11-06 01:50 PM" },
  { id: 8, message: "Failed login attempt", severity: "Warning", date: "2025-11-06 02:10 PM" },
  { id: 9, message: "Password changed", severity: "Info", date: "2025-11-06 02:35 PM" },
  { id: 10, message: "Payment processed", severity: "Info", date: "2025-11-06 03:00 PM" },
  { id: 11, message: "API request failed", severity: "Error", date: "2025-11-06 03:20 PM" },
  { id: 12, message: "Email notification sent", severity: "Info", date: "2025-11-06 03:50 PM" },
  { id: 13, message: "Server memory high", severity: "Warning", date: "2025-11-06 04:10 PM" },
  { id: 14, message: "Subscription renewed", severity: "Info", date: "2025-11-06 04:30 PM" },
  { id: 15, message: "Failed API token refresh", severity: "Error", date: "2025-11-06 04:50 PM" },
];

// Map severity to custom colors
const severityColors = {
  Info: "#2196f3",    // Blue
  Warning: "#ff9800", // Orange
  Error: "#f44336",   // Red
};

// Fallback-safe color accessor
const getSeverityColor = (severity) =>
  severityColors[severity] || "#9e9e9e"; 

export default function Log() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter logs based on search input
  const filteredLogs = initialLogs.filter((log) =>
    log.message.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={2}>
     <Stack direction="row" alignItems="center" spacing={1} mb={2}>
  <IconLogs size={28} stroke={1.5} />
  <Typography variant="h4" fontWeight={700}>
    System Logs
  </Typography>
</Stack>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Monitor system events and track activities. Use the search to quickly filter logs.
      </Typography>

      <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          {/* Search Bar */}
          <TextField
            label="Search Logs"
            fullWidth
            size="small"
            margin="normal"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearch("")}>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Table container */}
          <Paper
            sx={{
              maxHeight: "60vh",
              overflow: "auto",
              borderRadius: 2,
              mt: 1,
            }}
          >
            <Table stickyHeader size="small">
              <TableHead sx={{ backgroundColor: "grey.100" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Message</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Severity</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLogs.length > 0 ? (
                  filteredLogs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((log, index) => (
                      <TableRow
                        key={log.id}
                        sx={{
                          backgroundColor: index % 2 === 0 ? "background.paper" : "grey.50",
                          "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.08)" },
                        }}
                      >
                        <TableCell>{log.message}</TableCell>
                        <TableCell>
                          <Chip
                            label={log.severity}
                            size="small"
                            sx={{
                              backgroundColor: getSeverityColor(log.severity),
                              color: "#fff",
                              fontWeight: 600,
                              borderRadius: 1,
                              px: 1,
                              py: 0.25,
                              boxShadow: 1,
                            }}
                          />
                        </TableCell>
                        <TableCell>{log.date}</TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredLogs.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 15]}
            sx={{ mt: 1 }}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
