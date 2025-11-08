import { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
  IconButton,
  Divider,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import ReplyIcon from "@mui/icons-material/Reply";
import CloseIcon from "@mui/icons-material/Close";
import { IconMessage2Plus } from "@tabler/icons-react";

const initialMessages = [
  {
    id: 1,
    from: "Alice Johnson",
    email: "alice@example.com",
    subject: "Welcome to MyAdmin",
    body: "Hi — welcome aboard! If you need any help setting up, reply here.",
    date: "2025-10-01",
    unread: true,
  },
  {
    id: 2,
    from: "Billing",
    email: "billing@company.com",
    subject: "Invoice #324 Available",
    body: "Your invoice for September is ready. View the invoice in Billing > Invoices.",
    date: "2025-10-02",
    unread: false,
  },
  {
    id: 3,
    from: "Carlos",
    email: "carlos@client.com",
    subject: "Feature request — reports",
    body: "Could we add CSV export to the Reports page? That would help our team.",
    date: "2025-10-03",
    unread: true,
  },
  {
    id: 4,
    from: "Support",
    email: "support@company.com",
    subject: "Ticket #442 resolved",
    body: "We’ve fixed the issue. Please verify on your side and close the ticket.",
    date: "2025-10-04",
    unread: false,
  },
];

export default function Message() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedId, setSelectedId] = useState(messages[0]?.id || null);
  const [query, setQuery] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);
  const [compose, setCompose] = useState({ to: "", subject: "", body: "" });

  const selected = useMemo(() => messages.find((m) => m.id === selectedId), [messages, selectedId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return messages;
    return messages.filter(
      (m) =>
        m.subject.toLowerCase().includes(q) ||
        m.from.toLowerCase().includes(q) ||
        m.body.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
    );
  }, [messages, query]);

  function handleSelect(id) {
    setSelectedId(id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, unread: false } : m)));
  }

  function handleDelete(id) {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedId === id) setSelectedId(filtered[0]?.id || null);
  }

  function handleToggleUnread(id) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, unread: !m.unread } : m)));
  }

  function openCompose() {
    setCompose({ to: "", subject: "", body: "" });
    setComposeOpen(true);
  }

  function sendCompose() {
    const newMsg = {
      id: Date.now(),
      from: "You",
      email: "you@admin.local",
      subject: compose.subject || "(no subject)",
      body: compose.body || "",
      date: new Date().toISOString().slice(0, 10),
      unread: false,
    };
    setMessages((prev) => [newMsg, ...prev]);
    setComposeOpen(false);
  }

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
  <IconMessage2Plus size={34} stroke={1.5} />
  <Typography variant="h4" fontWeight={700}>
    Messages
  </Typography>
</Stack>
<Typography variant="body2" color="text.secondary" mb={3}>
  View and manage all messages in your system.
</Typography>

      <Paper elevation={3} sx={{ display: "flex", height: "70vh", borderRadius: 3, overflow: "hidden" }}>
        {/* Left Column */}
        <Box sx={{ width: { xs: "40%", md: 360 }, borderRight: "1px solid #e0e0e0", display: "flex", flexDirection: "column" }}>
          <Box sx={{ p: 2, display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              size="small"
              placeholder="Search messages..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: "#9ca3af" }} />,
              }}
              sx={{ flex: 1 }}
            />
            <Button variant="contained" startIcon={<CreateIcon />} onClick={openCompose} sx={{ borderRadius: 2 }}>
              Compose
            </Button>
          </Box>

          <Divider />

          <Box sx={{ overflow: "auto", flex: 1 }}>
            <List disablePadding>
              {filtered.length === 0 && (
                <Box sx={{ p: 3, textAlign: "center" }}>
                  <Typography color="text.secondary">No messages found.</Typography>
                </Box>
              )}
              {filtered.map((m) => (
                <ListItemButton
                  key={m.id}
                  selected={m.id === selectedId}
                  onClick={() => handleSelect(m.id)}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 1.5,
                    mb: 0.5,
                    "&.Mui-selected": { bgcolor: "rgba(25, 118, 210, 0.08)" },
                    "&:hover": { bgcolor: "rgba(25, 118, 210, 0.04)" },
                  }}
                >
                  <ListItemAvatar>
                    <Badge color="primary" variant={m.unread ? "dot" : "standard"}>
                      <Avatar sx={{ bgcolor: m.unread ? "#1976d2" : "#bdbdbd" }}>
                        <MailOutlineIcon />
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle2" noWrap sx={{ maxWidth: "70%" }}>
                          {m.from}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {m.date}
                        </Typography>
                      </Stack>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" noWrap>
                        <strong style={{ marginRight: 6 }}>{m.subject}</strong> — {m.body}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Box>

        {/* Right Column */}
        <Box sx={{ flex: 1, p: 3, overflow: "auto" }}>
          {!selected ? (
            <Box sx={{ textAlign: "center", mt: 8 }}>
              <Typography variant="h6" color="text.secondary">
                Select a message to read
              </Typography>
            </Box>
          ) : (
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    {selected.subject}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    From: {selected.from} • {selected.email}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <IconButton onClick={() => handleToggleUnread(selected.id)} title={selected.unread ? "Mark as read" : "Mark as unread"}>
                    <MarkunreadIcon />
                  </IconButton>
                  <IconButton onClick={() => alert("Reply flow — implement compose")} title="Reply">
                    <ReplyIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(selected.id)} title="Delete">
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>

              <Divider sx={{ mb: 2 }} />

              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {selected.body}
              </Typography>
            </Paper>
          )}
        </Box>
      </Paper>

      {/* Compose Dialog */}
      <Dialog open={composeOpen} onClose={() => setComposeOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3, p: 2, boxShadow: 6 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>
          Compose Message
          <IconButton
            aria-label="close"
            onClick={() => setComposeOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="To" fullWidth value={compose.to} onChange={(e) => setCompose((p) => ({ ...p, to: e.target.value }))} />
          <TextField label="Subject" fullWidth value={compose.subject} onChange={(e) => setCompose((p) => ({ ...p, subject: e.target.value }))} />
          <TextField label="Message" fullWidth multiline rows={6} value={compose.body} onChange={(e) => setCompose((p) => ({ ...p, body: e.target.value }))} />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setComposeOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={sendCompose} sx={{ borderRadius: 2 }}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
