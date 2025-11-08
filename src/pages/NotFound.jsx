import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'


export default function NotFound() {
return (
<Box sx={{ textAlign: 'center', pt: 8 }}>
<Typography variant="h3">404</Typography>
<Typography variant="h6" sx={{ mb: 2 }}>Page not found</Typography>
<Button component={RouterLink} to="/">Go home</Button>
</Box>
)
}