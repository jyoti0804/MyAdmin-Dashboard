import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { IconBuildingStore } from "@tabler/icons-react";

// Sample 12 products with images and names
const initialProducts = [
  { id: 1, name: "Wireless Mouse", category: "Accessories", price: 29.99, stock: 50, image: "https://picsum.photos/seed/mouse/300/200" },
  { id: 2, name: "Mechanical Keyboard", category: "Accessories", price: 89.99, stock: 0, image: "https://picsum.photos/seed/keyboard/300/200" },
  { id: 3, name: "Gaming Laptop", category: "Electronics", price: 1299.99, stock: 15, image: "https://picsum.photos/seed/laptop/300/200" },
  { id: 4, name: "HD Monitor", category: "Electronics", price: 199.99, stock: 8, image: "https://picsum.photos/seed/monitor/300/200" },
  { id: 5, name: "USB-C Hub", category: "Accessories", price: 39.99, stock: 15, image: "https://picsum.photos/seed/hub/300/200" },
  { id: 6, name: "Office Chair", category: "Furniture", price: 149.99, stock: 20, image: "https://picsum.photos/seed/chair/300/200" },
  { id: 7, name: "Desk Lamp", category: "Furniture", price: 49.99, stock: 10, image: "https://picsum.photos/seed/lamps/300/200" },
  { id: 8, name: "External Hard Drive", category: "Electronics", price: 79.99, stock: 0, image: "https://picsum.photos/seed/hdd/300/200" },
  { id: 9, name: "Webcam", category: "Electronics", price: 59.99, stock: 25, image: "https://picsum.photos/seed/webcam/300/200" },
  { id: 10, name: "Wireless Earbuds", category: "Accessories", price: 129.99, stock: 30, image: "https://picsum.photos/seed/earbuds/300/200" },
  { id: 11, name: "Laptop Sleeve", category: "Accessories", price: 34.99, stock: 20, image: "https://picsum.photos/seed/sleeve/300/200" },
  { id: 12, name: "Portable Charger", category: "Accessories", price: 49.99, stock: 35, image: "https://picsum.photos/seed/charger/300/200" },
];

export default function Products() {
  const [products] = useState(initialProducts);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={4} sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={1} gap={1}>
        <IconBuildingStore size={36} stroke={2.5} />
        <Typography variant="h4" fontWeight={700}>
          Products
        </Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Manage all products in your catalog.
      </Typography>

      {/* Search */}
      <Box mb={4}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search products..."
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

      {/* Product Grid */}
      <Grid container spacing={3}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={product.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6, transform: "translateY(-5px)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack spacing={0.5}>
                    <Typography variant="h6" fontWeight={600}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.category}
                    </Typography>
                    <Typography variant="body1" fontWeight={700}>
                      ${product.price}
                    </Typography>
                    <Chip
                      label={product.stock > 0 ? "In Stock" : "Out of Stock"}
                      size="small"
                      color={product.stock > 0 ? "success" : "error"}
                      sx={{ mt: 1 }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography>No products found.</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
