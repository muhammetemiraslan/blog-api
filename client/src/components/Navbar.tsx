import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  // Aktif path ile butonun hedefi eşleşirse active stili uygula
  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        mt: 2,
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 900,
          mx: "auto",
          backgroundColor: "white",
          borderRadius: 3,
          border: "1px solid #e0e0e0",
          minHeight: 56,
          px: 3,
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "black", cursor: "pointer" }}
        >
          BlogApi
        </Typography>

        <Box display="flex" gap={3} alignItems="center" sx={{ flexShrink: 0 }}>
          <Button
            component={Link}
            to="/"
            disableRipple
            sx={{
              border: "none",
              textTransform: "none",
              color: "black",
              fontWeight: isActive("/") ? "bold" : "normal",
              borderBottom: isActive("/") ? "2px solid black" : "none",
              borderRadius: 0,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            Home
          </Button>

          <Button
            disableRipple
            sx={{
              border: "none",
              textTransform: "none",
              color: "black",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            Browse <SearchIcon fontSize="small" />
          </Button>

          <Button
            disableRipple
            sx={{ border: "none", textTransform: "none", color: "black" }}
          >
            All Blogs
          </Button>
        </Box>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#f0f0f0",
            color: "black",
            textTransform: "none",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          What’s happening
        </Button>
      </Toolbar>
    </AppBar>
  );
}
