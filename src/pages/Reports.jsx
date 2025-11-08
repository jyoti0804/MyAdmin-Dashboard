import React, { useState, useMemo } from 'react';
import {
  Box, Typography, Divider, Button, TextField, Collapse, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel
} from '@mui/material';
import { IconClipboardDataFilled } from "@tabler/icons-react";

// Sample report data
const reportsData = {
  sales: [
    { id: 1, product: 'Product A', unitsSold: 150, revenue: 3200, month: 'Jan' },
    { id: 2, product: 'Product B', unitsSold: 100, revenue: 2100, month: 'Jan' },
    { id: 3, product: 'Product C', unitsSold: 180, revenue: 4300, month: 'Jan' },
    { id: 4, product: 'Product D', unitsSold: 90, revenue: 1500, month: 'Feb' },
    { id: 5, product: 'Product E', unitsSold: 110, revenue: 2500, month: 'Feb' },
    { id: 6, product: 'Product F', unitsSold: 140, revenue: 3000, month: 'Mar' },
    { id: 7, product: 'Product G', unitsSold: 130, revenue: 2800, month: 'Mar' }
  ],
  users: [
    { id: 1, user: 'Alice', signupDate: '2025-01-15', status: 'Active' },
    { id: 2, user: 'Bob', signupDate: '2025-02-10', status: 'Inactive' },
    { id: 3, user: 'Charlie', signupDate: '2025-03-05', status: 'Active' },
     { id: 4, user: 'David', signupDate: '2025-04-12', status: 'Active' },
    { id: 5, user: 'Eve', signupDate: '2025-05-07', status: 'Inactive' },
    { id: 6, user: 'Frank', signupDate: '2025-06-20', status: 'Active' },
    { id: 7, user: 'Grace', signupDate: '2025-07-15', status: 'Active' }
  ],
  orders: [
    { id: 1, orderId: '#00123', customer: 'Alice', total: 120, date: '2025-11-01' },
    { id: 2, orderId: '#00124', customer: 'Bob', total: 75, date: '2025-11-02' },
    { id: 3, orderId: '#00125', customer: 'Charlie', total: 220, date: '2025-11-03' },
     { id: 4, orderId: '#00126', customer: 'David', total: 140, date: '2025-11-04' },
    { id: 5, orderId: '#00127', customer: 'Eve', total: 95, date: '2025-11-05' },
    { id: 6, orderId: '#00128', customer: 'Frank', total: 180, date: '2025-11-06' },
    { id: 7, orderId: '#00129', customer: 'Grace', total: 130, date: '2025-11-07' }
  ],
};

// Utility to export array of objects to CSV string
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

export default function Reports() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [salesSortConfig, setSalesSortConfig] = useState({ key: '', direction: 'asc' });
  const [usersSortConfig, setUsersSortConfig] = useState({ key: '', direction: 'asc' });
  const [ordersSortConfig, setOrdersSortConfig] = useState({ key: '', direction: 'asc' });

  const handleFilterToggle = () => setFilterOpen(!filterOpen);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Generalized sorting helper
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

  // Apply search filtering (case-insensitive)
  const filteredSales = useMemo(() => {
    return reportsData.sales.filter(({ product, month }) =>
      product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      month.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredUsers = useMemo(() => {
    return reportsData.users.filter(({ user, status }) =>
      user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredOrders = useMemo(() => {
    return reportsData.orders.filter(({ orderId, customer }) =>
      orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Apply sorting
  const sortedSales = useMemo(() => sortData(filteredSales, salesSortConfig), [filteredSales, salesSortConfig]);
  const sortedUsers = useMemo(() => sortData(filteredUsers, usersSortConfig), [filteredUsers, usersSortConfig]);
  const sortedOrders = useMemo(() => sortData(filteredOrders, ordersSortConfig), [filteredOrders, ordersSortConfig]);

  // Sort handler for a table
  const createSortHandler = (section, key) => () => {
    let config, setConfig;
    if (section === 'sales') {
      config = salesSortConfig;
      setConfig = setSalesSortConfig;
    } else if (section === 'users') {
      config = usersSortConfig;
      setConfig = setUsersSortConfig;
    } else {
      config = ordersSortConfig;
      setConfig = setOrdersSortConfig;
    }

    if (config.key === key) {
      setConfig({ key, direction: config.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setConfig({ key, direction: 'asc' });
    }
  };

  // File download helper for CSV export
  const downloadCSV = (data, filename) => {
    const csvStr = convertToCSV(data);
    const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', filename);
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 4, pt: 4 }}>
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
  {/* First row: Icon + Title in one line */}
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <IconClipboardDataFilled size={32} stroke={2} />
    <Typography variant="h3" fontWeight={700}>
      Reports
    </Typography>
  </Box>

  {/* Second row: Subtitle below */}
  <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
    Detailed reports on sales, user registrations, and orders. Use filter and sorting to find specific records.
  </Typography>
</Box>
        <Button variant="outlined" onClick={handleFilterToggle}>
          {filterOpen ? 'Close Filters' : 'Filter Data'}
        </Button>
      </Box>

      {/* Filter Panel */}
      <Collapse in={filterOpen} timeout="auto" unmountOnExit sx={{ mb: 4 }}>
        <TextField
          label="Search Reports"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: 300 }}
          placeholder="Search in reports..."
          autoFocus
        />
        <Divider sx={{ mt: 2 }} />
      </Collapse>

      {/* Sales Report */}
      <Box sx={{ mb: 6 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight={700}>
            Sales Report
          </Typography>
          <Button size="small" variant="outlined" onClick={() => downloadCSV(sortedSales, 'sales-report.csv')}>
            Export CSV
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="sales table" size="small">
            <TableHead>
              <TableRow>
                {['product', 'unitsSold', 'revenue', 'month'].map((col) => (
                  <TableCell key={col} sortDirection={salesSortConfig.key === col ? salesSortConfig.direction : false}>
                    <TableSortLabel
                      active={salesSortConfig.key === col}
                      direction={salesSortConfig.key === col ? salesSortConfig.direction : 'asc'}
                      onClick={createSortHandler('sales', col)}
                    >
                      {col === 'product' && 'Product'}
                      {col === 'unitsSold' && 'Units Sold'}
                      {col === 'revenue' && 'Revenue ($)'}
                      {col === 'month' && 'Month'}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedSales.map(({ id, product, unitsSold, revenue, month }) => (
                <TableRow key={id} hover tabIndex={-1}>
                  <TableCell>{product}</TableCell>
                  <TableCell>{unitsSold}</TableCell>
                  <TableCell>{revenue}</TableCell>
                  <TableCell>{month}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider sx={{ my: 3 }} />
      </Box>

      {/* Users Report */}
      <Box sx={{ mb: 6 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight={700}>
            User Registrations
          </Typography>
          <Button size="small" variant="outlined" onClick={() => downloadCSV(sortedUsers, 'users-report.csv')}>
            Export CSV
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="users table" size="small">
            <TableHead>
              <TableRow>
                {['user', 'signupDate', 'status'].map((col) => (
                  <TableCell key={col} sortDirection={usersSortConfig.key === col ? usersSortConfig.direction : false}>
                    <TableSortLabel
                      active={usersSortConfig.key === col}
                      direction={usersSortConfig.key === col ? usersSortConfig.direction : 'asc'}
                      onClick={createSortHandler('users', col)}
                    >
                      {col === 'user' && 'User'}
                      {col === 'signupDate' && 'Signup Date'}
                      {col === 'status' && 'Status'}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers.map(({ id, user, signupDate, status }) => (
                <TableRow key={id} hover tabIndex={-1}>
                  <TableCell>{user}</TableCell>
                  <TableCell>{signupDate}</TableCell>
                  <TableCell>{status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider sx={{ my: 3 }} />
      </Box>

      {/* Orders Report */}
      <Box sx={{ mb: 6 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight={700}>
            Orders Report
          </Typography>
          <Button size="small" variant="outlined" onClick={() => downloadCSV(sortedOrders, 'orders-report.csv')}>
            Export CSV
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="orders table" size="small">
            <TableHead>
              <TableRow>
                {['orderId', 'customer', 'total', 'date'].map((col) => (
                  <TableCell key={col} sortDirection={ordersSortConfig.key === col ? ordersSortConfig.direction : false}>
                    <TableSortLabel
                      active={ordersSortConfig.key === col}
                      direction={ordersSortConfig.key === col ? ordersSortConfig.direction : 'asc'}
                      onClick={createSortHandler('orders', col)}
                    >
                      {col === 'orderId' && 'Order ID'}
                      {col === 'customer' && 'Customer'}
                      {col === 'total' && 'Total ($)'}
                      {col === 'date' && 'Date'}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedOrders.map(({ id, orderId, customer, total, date }) => (
                <TableRow key={id} hover tabIndex={-1}>
                  <TableCell>{orderId}</TableCell>
                  <TableCell>{customer}</TableCell>
                  <TableCell>{total}</TableCell>
                  <TableCell>{date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
