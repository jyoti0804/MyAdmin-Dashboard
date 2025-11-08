import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';


export default function Login({ onLogin, authenticated }) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');


if (authenticated) return <Navigate to="/" replace />;


function handleSubmit(e) {
e.preventDefault();
// Simple mock: accept any non-empty
if (email && password) {
onLogin();
} else {
setError('Enter email and password');
}
}


return (
<Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
<Paper sx={{ width: 360, p: 4 }}>
<Typography variant="h6" sx={{ mb: 2 }}>Admin sign in</Typography>
<form onSubmit={handleSubmit}>
<TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
<TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
{error && <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>}
<Button type="submit" variant="contained" fullWidth>Sign in</Button>
</form>
</Paper>
</Box>
);
}