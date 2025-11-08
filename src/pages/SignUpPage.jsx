import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { SignUp } from '@clerk/clerk-react'


export default function SignUpPage() {
return (
<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f5f7fb' }}>
<Paper sx={{ width: 420, p: 4 }} elevation={3}>
<Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>Create admin account</Typography>
<SignUp routing="path" path="/sign-up" redirectUrl="/dashboard" />
</Paper>
</Box>
)
}