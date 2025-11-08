import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Paper,
  TextField,
  InputAdornment,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  Collapse,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconBrandAsana, IconUsers } from "@tabler/icons-react";

const initialRoles = [
  { id: 1, name: "Administrator", description: "Full access to all features", active: true, users: 3 },
  { id: 2, name: "Editor", description: "Create & edit content", active: true, users: 8 },
  { id: 3, name: "Viewer", description: "Read-only access", active: true, users: 25 },
  { id: 4, name: "Analyst", description: "View reports & exports", active: false, users: 5 },
  { id: 5, name: "Support", description: "Manage tickets and users", active: true, users: 2 },
  { id: 6, name: "Guest", description: "Temporary limited access", active: false, users: 1 },
];

export default function Roles() {
  const [roles, setRoles] = useState(initialRoles);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showInactive, setShowInactive] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", active: true });
  const [modalError, setModalError] = useState("");

  const filteredRoles = useMemo(() => {
    const q = search.trim().toLowerCase();
    return roles.filter((r) => {
      if (!showInactive && !r.active) return false;
      if (!q) return true;
      return r.name.toLowerCase().includes(q) || (r.description || "").toLowerCase().includes(q);
    });
  }, [roles, search, showInactive]);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const paginated = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredRoles.slice(start, start + rowsPerPage);
  }, [filteredRoles, page, rowsPerPage]);

  const openAddModal = () => {
    setEditing(null);
    setForm({ name: "", description: "", active: true });
    setModalError("");
    setOpenModal(true);
  };

  const openEditModal = (role) => {
    setEditing(role);
    setForm({ name: role.name, description: role.description, active: role.active });
    setModalError("");
    setOpenModal(true);
  };

  const handleSaveRole = () => {
    const { name, description, active } = form;

    // Validation
    if (!name.trim() || !description.trim()) {
      setModalError("Please fill in all required fields.");
      return;
    }
    setModalError("");

    if (editing) {
      setRoles((prev) =>
        prev.map((r) =>
          r.id === editing.id ? { ...r, name: name.trim(), description: description.trim(), active } : r
        )
      );
    } else {
      const newRole = {
        id: Date.now(),
        name: name.trim(),
        description: description.trim(),
        active,
        users: 0,
      };
      setRoles((prev) => [newRole, ...prev]);
    }
    setOpenModal(false);
  };

  const handleDelete = (id) => setRoles((prev) => prev.filter((r) => r.id !== id));

  const cardSx = {
    height: "160px",
    borderRadius: 2,
    border: "1px solid rgba(0,0,0,0.06)",
    bgcolor: "background.paper",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    p: 2,
    boxShadow: 0,
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 80px)",
        overflowY: "auto",
        px: { xs: 2, md: 4 },
        py: 4,
        bgcolor: "background.default",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconBrandAsana size={34} stroke={1.6} />
          <Typography variant="h4" fontWeight={700}>
            Role Management
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Button
            variant="outlined"
            onClick={() => setShowFilters((s) => !s)}
            startIcon={<SearchIcon />}
            size="small"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Create and manage roles & permissions for your organization.
        </Typography>
      </Box>

      {/* Filter Collapse */}
      <Collapse in={showFilters} timeout="auto" unmountOnExit>
        <Paper sx={{ p: 2, mb: 3, border: "1px solid rgba(0,0,0,0.06)" }}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
            <TextField
              size="small"
              placeholder="Search roles..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 260 }}
            />
            <FormControlLabel
              control={<Checkbox checked={showInactive} onChange={(e) => setShowInactive(e.target.checked)} />}
              label="Include inactive roles"
            />
            <Box sx={{ flex: 1 }} />
            <Button variant="contained" startIcon={<AddIcon />} onClick={openAddModal}>
              Add Role
            </Button>
          </Box>
        </Paper>
      </Collapse>

      {/* 4 Cards per row */}
      <Box component="section" sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={cardSx}>
              <CardContent sx={{ p: 0 }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary">Total Roles</Typography>
                  <Typography variant="h5" fontWeight={700}>{roles.length}</Typography>
                  <Typography variant="body2" color="text.secondary">Active / Inactive: {roles.filter(r => r.active).length} / {roles.filter(r => !r.active).length}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={cardSx}>
              <CardContent sx={{ p: 0 }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary">Most Assigned Role</Typography>
                  <Typography variant="h6" fontWeight={700}>
                    {roles.slice().sort((a, b) => (b.users || 0) - (a.users || 0))[0]?.name || "—"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Users assigned to top role</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={cardSx}>
              <CardContent sx={{ p: 0 }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary">Inactive Roles</Typography>
                  <Typography variant="h5" fontWeight={700}>{roles.filter(r => !r.active).length}</Typography>
                  <Typography variant="body2" color="text.secondary">Review and archive</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={cardSx}>
              <CardContent sx={{ p: 0 }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary">Quick Actions</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Button size="small" variant="outlined" onClick={openAddModal} startIcon={<AddIcon />}>Add</Button>
                    <Button size="small" variant="outlined" startIcon={<IconUsers size={16} stroke={1.6} />}>Assign</Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Roles Table */}
      <Box>
        <Paper sx={{ border: "1px solid rgba(0,0,0,0.06)" }}>
          <TableContainer sx={{ maxHeight: 420 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                  <TableCell sx={{ width: 120, fontWeight: 700 }}>Users</TableCell>
                  <TableCell sx={{ width: 120, fontWeight: 700 }}>Status</TableCell>
                  <TableCell align="right" sx={{ width: 160, fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.length > 0 ? (
                  paginated.map((role) => (
                    <TableRow hover key={role.id}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <IconBrandAsana size={18} stroke={1.4} />
                          <Typography variant="subtitle2" fontWeight={600}>{role.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">{role.description}</Typography>
                      </TableCell>
                      <TableCell>{role.users ?? 0}</TableCell>
                      <TableCell>
                        <Chip
                          label={role.active ? "Active" : "Inactive"}
                          color={role.active ? "success" : "default"}
                          size="small"
                          variant={role.active ? "filled" : "outlined"}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Button size="small" startIcon={<EditIcon />} onClick={() => openEditModal(role)}>Edit</Button>
                          <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(role.id)}>Delete</Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4, color: "text.secondary" }}>
                      No roles match your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider />

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredRoles.length === 0 ? 0 : page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, filteredRoles.length)} of {filteredRoles.length}
            </Typography>
            <TablePagination
              component="div"
              count={filteredRoles.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20]}
              sx={{ "& .MuiTablePagination-toolbar": { py: 0 } }}
            />
          </Box>
        </Paper>
      </Box>

      {/* Add / Edit Role Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 700 }}>{editing ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent>
          {modalError && (
            <Typography color="error" mb={1}>
              {modalError}
            </Typography>
          )}
          <Stack spacing={2} mt={1}>
            <TextField
              label="Role Name"
              fullWidth
              size="small"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              error={!form.name.trim() && modalError}
              helperText={!form.name.trim() && modalError ? "Required" : ""}
            />
            <TextField
              label="Description"
              fullWidth
              size="small"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              multiline
              error={!form.description.trim() && modalError}
              helperText={!form.description.trim() && modalError ? "Required" : ""}
            />
            <FormControlLabel
              control={<Checkbox checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} />}
              label="Active"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveRole}>{editing ? "Save Changes" : "Create Role"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
