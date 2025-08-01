import { Container, Typography, Box, Chip } from "@mui/material";
import PostList from "./components/PostList";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import PostDetails from "./pages/PostDetail";

export default function App() {
  return (
    <>
      <div className="hero">
        <Navbar />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          px={2}
        >
          <Chip
            label="Blog"
            size="small"
            sx={{
              mb: 2,
              backgroundColor: "white",
              color: "#a2a2a2ff",
              fontWeight: "bold",
              border: "1px solid #ddd",
              px: 1.5,
            }}
          />

          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Insight and Updates
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
            perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque.
          </Typography>
        </Box>
      </div>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetails /> } />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}
