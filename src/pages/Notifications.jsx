import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Stack,
  Switch,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Tooltip,
  Chip,
  Avatar,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const initialNotifications = [
  { id: 1, title: "New user signed up", description: "Alice Johnson joined the platform.", date: "2025-10-04", read: false, type: "info" },
  { id: 2, title: "Invoice paid", description: "Invoice #324 has been paid.", date: "2025-10-03", read: true, type: "success" },
  { id: 3, title: "Server warning", description: "High memory usage detected on server-2.", date: "2025-10-02", read: false, type: "warning" },
  { id: 4, title: "New support ticket", description: "Ticket #442 opened by Carlos.", date: "2025-10-01", read: true, type: "info" },
];

const typeIcons = {
  info: { icon: <InfoIcon />, color: "info.main" },
  success: { icon: <CheckCircleIcon />, color: "success.main" },
  warning: { icon: <WarningIcon />, color: "warning.main" },
};

export default function Notifications() {
  const [items, setItems] = useState(initialNotifications);
  const [onlyUnread, setOnlyUnread] = useState(false);

  const displayed = onlyUnread ? items.filter((i) => !i.read) : items;

  const toggleRead = (id) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, read: !it.read } : it)));
  };

  const dismiss = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((it) => ({ ...it, read: true })));
  };

  const clearAll = () => {
    setItems([]);
  };

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <NotificationsActiveIcon  fontSize="large" />
          <Typography variant="h5" fontWeight={700}>
            Notifications
          </Typography>
          <Chip
            label={`${items.filter((i) => !i.read).length} unread`}
            size="small"
            sx={{ ml: 1, fontWeight: 500, bgcolor: "primary.light", color: "primary.dark" }}
          />
        </Stack>

        <Stack direction="row" spacing={1}>
          <Tooltip title="Show unread only">
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Unread
              </Typography>
              <Switch size="small" checked={onlyUnread} onChange={(e) => setOnlyUnread(e.target.checked)} />
            </Stack>
          </Tooltip>

          <Button variant="outlined" startIcon={<DoneIcon />} onClick={markAllRead}>
            Mark all read
          </Button>

          <Button variant="outlined" color="error" startIcon={<ClearAllIcon />} onClick={clearAll}>
            Clear all
          </Button>
        </Stack>
      </Stack>

      {/* Notification List */}
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          {displayed.length === 0 ? (
            <Box sx={{ p: 5, textAlign: "center" }}>
              <Typography color="text.secondary">No notifications</Typography>
            </Box>
          ) : (
            <List>
  {displayed.map((n) => (
    <React.Fragment key={n.id}>
      <ListItem
        alignItems="flex-start"
        sx={{
          bgcolor: n.read ? "background.paper" : "rgba(0,110,255,0.08)",
          borderRadius: 2,
          mb: 1,
          px: 2,
          py: 1.5,
          transition: "background 0.3s",
          "&:hover": { bgcolor: n.read ? "grey.100" : "rgba(0,110,255,0.12)" },
        }}
      >
        {/* Avatar / Icon */}
        <Avatar sx={{ bgcolor: typeIcons[n.type].color, width: 40, height: 40, mr: 2 }}>
          {typeIcons[n.type].icon}
        </Avatar>

        {/* Main text */}
        <ListItemText
          primary={
            <Typography variant="subtitle1" fontWeight={600}>
              {n.title}
            </Typography>
          }
          secondary={
            <Typography variant="body2" color="text.secondary">
              {n.description}
            </Typography>
          }
        />

        {/* Right side: date + actions */}
        <Stack direction="column" spacing={0.5} alignItems="flex-end">
          <Typography variant="caption" color="text.secondary">
            {n.date}
          </Typography>
          <Stack direction="row" spacing={0.5}>
            <Tooltip title={n.read ? "Mark unread" : "Mark read"}>
              <IconButton size="small" onClick={() => toggleRead(n.id)}>
                {n.read ? <MarkunreadIcon /> : <DoneIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Dismiss">
              <IconButton size="small" color="error" onClick={() => dismiss(n.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </ListItem>
      <Divider />
    </React.Fragment>
  ))}
</List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
