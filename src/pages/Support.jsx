import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconAB2 } from "@tabler/icons-react";

const initialTickets = [
  { id: 1, subject: "Login issue", status: "Open", priority: "High", created: "2025-10-01" },
  { id: 2, subject: "Billing discrepancy", status: "In Progress", priority: "Medium", created: "2025-10-02" },
  { id: 3, subject: "Feature request: Dark mode", status: "Closed", priority: "Low", created: "2025-10-03" },
];

const statusColors = {
  Open: "error",
  "In Progress": "warning",
  Closed: "success",
};

export default function Support() {
  const [tickets, setTickets] = useState(initialTickets);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ subject: "", priority: "" });
  const [editId, setEditId] = useState(null);

  const handleOpen = (ticket = null) => {
    if (ticket) {
      setEditId(ticket.id);
      setForm({ subject: ticket.subject, priority: ticket.priority });
    } else {
      setEditId(null);
      setForm({ subject: "", priority: "" });
    }
    setOpen(true);
  };

  const handleSave = () => {
    if (editId) {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === editId ? { ...t, subject: form.subject, priority: form.priority } : t
        )
      );
    } else {
      setTickets([
        ...tickets,
        {
          id: Date.now(),
          subject: form.subject,
          priority: form.priority || "Low",
          status: "Open",
          created: new Date().toISOString().slice(0, 10),
        },
      ]);
    }
    setOpen(false);
  };

  const handleDelete = (id) => setTickets(tickets.filter((t) => t.id !== id));

  return (
    <Box>
     <Stack direction="row" alignItems="center" spacing={1} mb={1}>
  <IconAB2 size={28} stroke={1.5} />
  <Typography variant="h5" fontWeight={700}>
    Support Tickets
  </Typography>
</Stack>
<Typography variant="body2" color="text.secondary" mb={2}>
  Manage and track support tickets efficiently.
</Typography>

      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6" fontWeight={600}>
              Tickets
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
              New Ticket
            </Button>
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.subject}</TableCell>
                  <TableCell>
                    <Chip label={t.status} color={statusColors[t.status]} size="small" />
                  </TableCell>
                  <TableCell>{t.priority}</TableCell>
                  <TableCell>{t.created}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpen(t)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(t.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editId ? "Edit Ticket" : "New Ticket"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
          <TextField
            label="Priority"
            fullWidth
            margin="normal"
            placeholder="Low, Medium, High"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
