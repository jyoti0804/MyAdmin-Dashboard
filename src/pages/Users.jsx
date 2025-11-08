import React, { useState, useMemo } from 'react';
import {
  Box, Typography, Divider, Button, ButtonGroup, TextField, Collapse, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel,
  Checkbox, Switch, Dialog, DialogActions, DialogContent,
  DialogTitle
} from '@mui/material';


import { IconUsers } from "@tabler/icons-react";

// sample users data
const usersDataInitial = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', signupDate: '2025-01-15', status: true },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', signupDate: '2025-02-10', status: false },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', signupDate: '2025-03-05', status: true },
  { id: 4, name: 'David Lee', email: 'david@example.com', signupDate: '2025-04-12', status: true },
  { id: 5, name: 'Eve Martinez', email: 'eve@example.com', signupDate: '2025-05-07', status: false },
  { id: 6, name: 'Frank Wright', email: 'frank@example.com', signupDate: '2025-06-20', status: true },
  { id: 7, name: 'Grace Kim', email: 'grace@example.com', signupDate: '2025-07-15', status: true },
  { id: 8, name: 'Hannah Davis', email: 'hannah@example.com', signupDate: '2025-08-01', status: false },
  { id: 9, name: 'Ian Clark', email: 'ian@example.com', signupDate: '2025-09-12', status: true },
  { id: 10, name: 'Jack Wilson', email: 'jack@example.com', signupDate: '2025-10-05', status: true },
];

function convertToCSV(data) {
  if (!data.length) return '';
  const keys = Object.keys(data[0]);
  const csvRows = [keys.join(',')];
  for (const row of data) {
    const values = keys.map(k => `"${String(row[k]).replace(/"/g, '""')}"`);
    csvRows.push(values.join(','));
  }
  return csvRows.join('\n');
}

export default function Users() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const [selected, setSelected] = useState([]);
  const [usersData, setUsersData] = useState(usersDataInitial);
  const [detailUser, setDetailUser] = useState(null);

  const handleFilterToggle = () => setFilterOpen(!filterOpen);
  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const sortData = (data, config) => {
    if (!config.key) return data;
    return [...data].sort((a, b) => {
      const aVal = String(a[config.key]).toLowerCase();
      const bVal = String(b[config.key]).toLowerCase();
      if (aVal < bVal) return config.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return config.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filteredUsers = useMemo(() =>
    usersData.filter(({ name, email, status }) => {
      const statusStr = status ? 'active' : 'inactive';
      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        statusStr.includes(searchTerm.toLowerCase())
      );
    }), [searchTerm, usersData]
  );

  const sortedUsers = useMemo(() => sortData(filteredUsers, sortConfig), [filteredUsers, sortConfig]);

  const createSortHandler = key => () => {
    if (sortConfig.key === key) {
      setSortConfig({ key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
  };

  const paginatedUsers = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedUsers.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, sortedUsers]);

  const isSelected = id => selected.indexOf(id) !== -1;

  const handleSelectAll = event => {
    if (event.target.checked) setSelected(sortedUsers.map(n => n.id));
    else setSelected([]);
  };

  const handleSelect = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) newSelected = newSelected.concat(selected, id);
    else if (selectedIndex === 0) newSelected = newSelected.concat(selected.slice(1));
    else if (selectedIndex === selected.length - 1) newSelected = newSelected.concat(selected.slice(0, -1));
    else if (selectedIndex > 0) newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));

    setSelected(newSelected);
  };

  const handleStatusToggle = (id) => {
    setUsersData(prevData => prevData.map(user => user.id === id ? { ...user, status: !user.status } : user));
  };

  const handleRowClick = user => setDetailUser(user);
  const handleCloseDetail = () => setDetailUser(null);

  const downloadCSV = () => {
    const csvData = sortedUsers.map(({ id, ...rest }) => ({
      ...rest,
      status: rest.status ? 'Active' : 'Inactive',
    }));
    const csvStr = convertToCSV(csvData);
    const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'users-report.csv');
    link.click();
    URL.revokeObjectURL(url);
  };

  const totalPages = Math.max(Math.ceil(sortedUsers.length / rowsPerPage), 1);

  return (
    <Box sx={{ 
      maxWidth: 1200, 
      mx: 'auto', 
      px: 4, 
      pt: 4, 
      height: "100vh", 
      overflowY: "auto" 
    }}>
      
      {/* Header */}
      <Box sx={{
        mb: 3,
        borderBottom: '1px solid #ddd',
        pb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Box sx={{ mb: 3 }}>
  {/* Top Row: Icon + Users */}
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <IconUsers size={35} stroke={3} />
    <Typography variant="h3" fontWeight={700}>
      Users
    </Typography>
  </Box>

  {/* Subtitle Below */}
  <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
    Manage user registrations and statuses. Use filters, selections, and inline editing.
  </Typography>
</Box>

     

        <Button variant="outlined" onClick={handleFilterToggle}>
          {filterOpen ? 'Close Filters' : 'Filter Data'}
        </Button>
      </Box>

      {/* Filter Panel */}
      <Collapse in={filterOpen} timeout="auto" unmountOnExit sx={{ mb: 4 }}>
        <TextField
          label="Search Users"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: 300 }}
          placeholder="Search by name, email, or status..."
          autoFocus
        />
        <Divider sx={{ mt: 2 }} />
      </Collapse>

      {/* User Table */}
      <Box sx={{ mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight={700}>User Registrations</Typography>
          <Button variant="outlined" size="small" onClick={downloadCSV}>Export CSV</Button>
        </Box>

        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer sx={{ maxHeight: 500, overflowY: 'auto' }}>
            <Table stickyHeader aria-label="users table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < sortedUsers.length}
                      checked={sortedUsers.length > 0 && selected.length === sortedUsers.length}
                      onChange={handleSelectAll}
                      inputProps={{ 'aria-label': 'select all users' }}
                    />
                  </TableCell>
                  {['name', 'email', 'signupDate', 'status'].map(col => (
                    <TableCell
                      key={col}
                      sortDirection={sortConfig.key === col ? sortConfig.direction : false}
                    >
                      <TableSortLabel
                        active={sortConfig.key === col}
                        direction={sortConfig.key === col ? sortConfig.direction : 'asc'}
                        onClick={createSortHandler(col)}
                      >
                        {col.charAt(0).toUpperCase() + col.slice(1)}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell align="center">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map(({ id, name, email, signupDate, status }) => {
                  const isItemSelected = isSelected(id);
                  return (
                    <TableRow key={id} hover tabIndex={-1} selected={isItemSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={e => handleSelect(e, id)}
                          inputProps={{ 'aria-labelledby': `users-checkbox-${id}` }}
                        />
                      </TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{signupDate}</TableCell>
                      <TableCell>
                        <Switch
                          checked={status}
                          onChange={() => handleStatusToggle(id)}
                          color="primary"
                          inputProps={{ 'aria-label': `Toggle status for ${name}` }}
                        />
                        {status ? 'Active' : 'Inactive'}
                      </TableCell>
                      <TableCell align="center">
                        <Button variant="text" size="small" onClick={() => handleRowClick({ id, name, email, signupDate, status })}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {paginatedUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4, fontStyle: 'italic' }}>
                      No users found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, gap: 1, flexWrap: 'wrap' }}>
          <Button onClick={() => setPage(old => Math.max(old - 1, 0))} disabled={page === 0}>
            Previous
          </Button>

          <ButtonGroup variant="outlined" aria-label="pagination buttons">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={page === i ? 'contained' : 'outlined'}
                onClick={() => setPage(i)}
                aria-current={page === i ? 'page' : undefined}
              >
                {i + 1}
              </Button>
            ))}
          </ButtonGroup>

          <Button onClick={() => setPage(old => (old < totalPages - 1 ? old + 1 : old))} disabled={page >= totalPages - 1}>
            Next
          </Button>
        </Box>
      </Box>

      {/* Detail User Dialog */}
      <Dialog
        open={Boolean(detailUser)}
        onClose={handleCloseDetail}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 2, boxShadow: 6 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: 22, borderBottom: '1px solid #eee', pb: 1 }}>
          User Details
        </DialogTitle>

        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          {detailUser && (
            <>
              <Typography variant="h5" fontWeight={600} color="primary">
                {detailUser.name}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography color="text.secondary"><strong>Email:</strong></Typography>
                <Typography>{detailUser.email}</Typography>
              </Box>

              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography color="text.secondary"><strong>Signup Date:</strong></Typography>
                <Typography>{detailUser.signupDate}</Typography>
              </Box>

              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, alignItems: 'center' }}>
                <Typography color="text.secondary"><strong>Status:</strong></Typography>
                <Box
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: detailUser.status ? 'success.main' : 'error.main',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 14,
                    textAlign: 'center',
                    minWidth: 80,
                  }}
                >
                  {detailUser.status ? 'Active' : 'Inactive'}
                </Box>
              </Box>
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleCloseDetail}
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
