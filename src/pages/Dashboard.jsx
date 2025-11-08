import { Box, Grid, Card, CardContent, Typography, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 600 },
  { name: 'Mar', users: 800 },
  { name: 'Apr', users: 700 },
  { name: 'May', users: 900 },
];

const stats = [
  {
    label: 'Active Users',
    value: '1,234',
    icon: <PeopleIcon fontSize="large" color="primary" />,
  },
  {
    label: 'Orders Today',
    value: '78',
    icon: <ShoppingCartIcon fontSize="large" color="primary" />,
  },
  {
    label: 'Revenue',
    value: '$12,345',
    icon: <AttachMoneyIcon fontSize="large" color="primary" />,
  },
  {
    label: 'New Signups',
    value: '56',
    icon: <PersonAddIcon fontSize="large" color="primary" />,
  },
];

export default function Dashboard() {
  return (
    <Box sx={{ width: '100%', mt: 4, px: 3 }}>
      
      {/* Quick Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {stats.map(({ label, value, icon }) => (
          <Grid item xs={12} sm={6} md={3} key={label}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3, boxShadow: 4, borderRadius: 3 }}>
              <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>{icon}</Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  {label}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {value}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Users Growth Chart */}
      <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Users Growth
          </Typography>
          <Box sx={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 8, boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Line type="monotone" dataKey="users" stroke="#1976d2" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
