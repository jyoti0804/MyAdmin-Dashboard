import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconCircleDottedLetterO } from "@tabler/icons-react";

// Sample orders data
const initialOrders = [
  { id: 101, customer: "John Doe", status: "Pending", total: 120.5, date: "2025-11-01" },
  { id: 102, customer: "Jane Smith", status: "Shipped", total: 250.0, date: "2025-11-02" },
  { id: 103, customer: "Alice Johnson", status: "Delivered", total: 99.99, date: "2025-11-03" },
  { id: 104, customer: "Bob Williams", status: "Cancelled", total: 75.25, date: "2025-11-04" },
  { id: 105, customer: "Charlie Brown", status: "Pending", total: 180.0, date: "2025-11-05" },
];

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openCreate, setOpenCreate] = useState(false);
  const [newOrder, setNewOrder] = useState({ customer: "", status: "", total: "", date: "" });
  const [error, setError] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toString().includes(search)
  );

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteOrder = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Shipped":
        return "info";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const handleAddOrder = () => {
    const { customer, status, total, date } = newOrder;

    if (!customer.trim() || !status.trim() || !total || !date) {
      setError("All fields are required.");
      return;
    }

    const totalValue = parseFloat(total);
    if (isNaN(totalValue) || totalValue <= 0) {
      setError("Total amount must be greater than 0.");
      return;
    }

    setOrders([
      ...orders,
      {
        id: Date.now(),
        customer,
        status,
        total: totalValue,
        date,
      },
    ]);
    setNewOrder({ customer: "", status: "", total: "", date: "" });
    setError("");
    setOpenCreate(false);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      {/* Header with icon */}
      <Stack direction="row" spacing={2} alignItems="center" mb={1}>
        <IconCircleDottedLetterO size={34} stroke={1.5} />
        <Typography variant="h5" fontWeight={700}>
          Orders
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" mb={2}>
        View and manage all orders, update statuses, and perform bulk actions.
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Box />
        <Button variant="contained" color="primary" onClick={() => setOpenCreate(true)}>
          Create Order
        </Button>
      </Stack>

      {/* Search Bar */}
      <TextField
        placeholder="Search by Order ID or Customer"
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
              <Button size="small" onClick={() => setSearch("")}>
                Clear
              </Button>
            </InputAdornment>
          ),
        }}
      />

      {/* Orders Table */}
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead sx={{ backgroundColor: "grey.100" }}>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{ "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.08)" } }}
                  >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <Chip label={order.status} color={getStatusColor(order.status)} size="small" />
                    </TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton color="primary">
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton color="info">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteOrder(order.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredOrders.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
        sx={{ mt: 1 }}
      />

      {/* Create Order Modal */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create New Order</DialogTitle>
        <DialogContent>
          {error && (
            <Typography color="error" mb={1}>
              {error}
            </Typography>
          )}
          <Stack spacing={2} mt={1}>
            <TextField
              label="Customer Name"
              fullWidth
              value={newOrder.customer}
              onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
              error={!newOrder.customer && !!error}
              helperText={!newOrder.customer && !!error ? "Required" : ""}
            />
            <TextField
              label="Status (Pending/Shipped/Delivered/Cancelled)"
              fullWidth
              value={newOrder.status}
              onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
              error={!newOrder.status && !!error}
              helperText={!newOrder.status && !!error ? "Required" : ""}
            />
            <TextField
              label="Total Amount"
              type="number"
              fullWidth
              value={newOrder.total}
              onChange={(e) => setNewOrder({ ...newOrder, total: e.target.value })}
              error={(!newOrder.total || parseFloat(newOrder.total) <= 0) && !!error}
              helperText={(!newOrder.total || parseFloat(newOrder.total) <= 0) && !!error ? "Must be > 0" : ""}
            />
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newOrder.date}
              onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
              error={!newOrder.date && !!error}
              helperText={!newOrder.date && !!error ? "Required" : ""}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddOrder}>
            Create Order
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
