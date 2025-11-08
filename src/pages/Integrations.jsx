import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Stack,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { IconWifi2 } from "@tabler/icons-react";

// Sample app logos 
const appIcons = {
  Slack: "S",
  "Google Drive": "G",
  Zapier: "Z",
  Stripe: "$",
};

const initialApps = [
  { id: 1, name: "Slack", description: "Send activity alerts to Slack channels.", connected: false },
  { id: 2, name: "Google Drive", description: "Sync files and backups with Drive.", connected: true },
  { id: 3, name: "Zapier", description: "Automate workflows across 5000+ apps.", connected: false },
  { id: 4, name: "Stripe", description: "Payments and subscription billing.", connected: true },
];

export default function Integrations() {
  const [apps, setApps] = useState(initialApps);
  const [search, setSearch] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({ open: false, appId: null });

  // Toggle connection status
  function toggleConnect(id) {
    const app = apps.find((a) => a.id === id);
    if (app.connected) {
      setConfirmDialog({ open: true, appId: id }); 
    } else {
      setApps((prev) => prev.map((a) => (a.id === id ? { ...a, connected: !a.connected } : a)));
    }
  }

  // Confirm disconnect
  const handleConfirmDisconnect = () => {
    setApps((prev) =>
      prev.map((a) => (a.id === confirmDialog.appId ? { ...a, connected: false } : a))
    );
    setConfirmDialog({ open: false, appId: null });
  };

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
<Stack direction="row" alignItems="center" spacing={1} mb={2}>
  <IconWifi2 size={28} stroke={1.5} />
  <Typography variant="h4" fontWeight={700}>
    Integrations
  </Typography>
</Stack>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Connect and manage your integrations to enhance your workflow.
      </Typography>

      {/* Search Bar */}
      <Box mb={3} maxWidth={400}>
        <TextField
          placeholder="Search integrations..."
          variant="outlined"
          size="small"
          fullWidth
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
      </Box>

      {/* App Cards */}
      <Grid container spacing={3}>
        {filteredApps.map((app) => (
          <Grid item xs={12} md={6} key={app.id}>
            <Card
              sx={{
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": { transform: "translateY(-3px)", boxShadow: 6 },
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.main", width: 50, height: 50, fontWeight: 700 }}>
                      {appIcons[app.name] || app.name[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {app.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        {app.description}
                      </Typography>
                      <Chip
                        label={app.connected ? "Connected" : "Not Connected"}
                        color={app.connected ? "success" : "default"}
                        size="small"
                      />
                    </Box>
                  </Stack>
                  <Button
                    variant={app.connected ? "outlined" : "contained"}
                    color={app.connected ? "error" : "primary"}
                    onClick={() => toggleConnect(app.id)}
                    sx={{ minWidth: 120 }}
                  >
                    {app.connected ? "Disconnect" : "Connect"}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Confirm Disconnect Dialog */}
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, appId: null })}>
        <DialogTitle>Confirm Disconnect</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to disconnect{" "}
            {apps.find((a) => a.id === confirmDialog.appId)?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, appId: null })}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDisconnect}>
            Disconnect
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
