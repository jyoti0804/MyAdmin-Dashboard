import React, { useState } from "react";
import {
  Paper,
  Typography,
  Stack,
  Divider,
  Switch,
  TextField,
  Button,
  Avatar,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconSettingsCog } from "@tabler/icons-react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Alice Johnson", role: "Admin" },
    { id: 2, name: "Carlos Smith", role: "Editor" },
  ]);

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", role: "" });
  const [errors, setErrors] = useState({ name: false, role: false });

  const removeMember = (id) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddMember = () => {
    // Validate
    const newErrors = {
      name: !newMember.name.trim(),
      role: !newMember.role.trim(),
    };
    setErrors(newErrors);

    if (newErrors.name || newErrors.role) return;

    // Add member
    setTeamMembers((prev) => [
      ...prev,
      { id: Date.now(), name: newMember.name, role: newMember.role },
    ]);

    // Reset modal
    setNewMember({ name: "", role: "" });
    setErrors({ name: false, role: false });
    setOpenModal(false);
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 80px)", // adjust based on your header/navbar
        overflowY: "auto",
        p: 2,
      }}
    >
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
  <IconSettingsCog size={28} stroke={1.5} />
  <Typography variant="h4" fontWeight={700}>
    Settings
  </Typography>
</Stack>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Manage application settings, feature flags, integrations, and team members.
        </Typography>

        {/* Appearance Section */}
        <Stack spacing={2} mb={4}>
          <Typography variant="h6" fontWeight={600}>
            Appearance
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>Dark Mode</Typography>
            <Switch
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
          </Stack>
          <Divider />
        </Stack>

        {/* Notifications Section */}
        <Stack spacing={2} mb={4}>
          <Typography variant="h6" fontWeight={600}>
            Notifications
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>Email Notifications</Typography>
            <Switch
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
          </Stack>
          <Divider />
        </Stack>

        {/* Integrations Section */}
        <Stack spacing={2} mb={4}>
          <Typography variant="h6" fontWeight={600}>
            Integrations
          </Typography>
          <TextField
            label="API Key"
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Enter your API key"
          />
          <Button variant="contained" color="primary" sx={{ alignSelf: "flex-start" }}>
            Save Integration
          </Button>
          <Divider />
        </Stack>

        {/* Team Members Section */}
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600}>
            Team Members
          </Typography>
          {teamMembers.map((member) => (
            <Stack
              key={member.id}
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ bgcolor: "background.paper", p: 1.5, borderRadius: 2 }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar>{member.name[0]}</Avatar>
                <Box>
                  <Typography fontWeight={600}>{member.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </Box>
              </Stack>
              <IconButton color="error" onClick={() => removeMember(member.id)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
          <Button variant="outlined" onClick={() => setOpenModal(true)}>
            Add Team Member
          </Button>
        </Stack>
      </Paper>

      {/* Add Member Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Team Member</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Name"
              fullWidth
              value={newMember.name}
              error={errors.name}
              helperText={errors.name ? "Name is required" : ""}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            />
            <TextField
              label="Role"
              fullWidth
              value={newMember.role}
              error={errors.role}
              helperText={errors.role ? "Role is required" : ""}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddMember}>
            Add Member
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
