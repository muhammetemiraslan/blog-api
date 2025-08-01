import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardMedia,
  Button,
  Grid,
} from "@mui/material";
import PostFilters from "./PostFilters";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  imageUrl: string;
  category: string;
}

function truncateText(text: string, maxLength: number = 10) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Postları çek
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "http://localhost:5201/api/Posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Gönderiler alınırken bir hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Kategorileri çek
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get<string[]>(
          "http://localhost:5201/api/categories"
        );
        setCategories(res.data);
      } catch (error) {
        console.error("Kategoriler alınırken hata oluştu:", error);
      }
    };

    fetchCategories();
  }, []);

  // Filtreleme: arama ve kategoriye göre
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === null || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box px={2}>
      <Typography variant="h4" gutterBottom textAlign="center" mt={2}>
        Blog Yazıları
      </Typography>

      {/* PostFilters'a kategorileri ve seçili kategori bilgisini gönderiyoruz */}
      <PostFilters
        search={searchTerm}
        onSearchChange={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Post listesi */}
      <Grid container spacing={3}>
        {filteredPosts.slice(0, 2).map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Card variant="outlined" sx={{ borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={post.imageUrl || "https://placehold.co/600x400"}
                alt="Blog görseli"
              />
              <CardContent>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  gutterBottom
                >
                  {new Date(post.createdAt).toLocaleDateString("tr-TR")}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {truncateText(post.title, 20)}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  <a href="#">{post.category}</a>
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  paragraph
                  sx={{ opacity: 0.9 }}
                >
                  {truncateText(post.content, 10)}
                </Typography>
                <Button
                  size="small"
                  component={Link}
                  to={`/posts/${post.id}`}
                  sx={{
                    textTransform: "none",
                    mt: 1,
                    px: 2,
                    fontWeight: 500,
                    color: "#1976d2",
                    border: "1px solid #1976d2",
                    borderRadius: 1,
                  }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Diğer postlar */}
      {Array.from({ length: Math.ceil((filteredPosts.length - 2) / 3) }).map(
        (_, i) => (
          <Grid container spacing={3} mt={1} key={`row-${i}`}>
            {filteredPosts
              .slice(2 + i * 3, 2 + (i + 1) * 3)
              .map((post) => (
                <Grid item xs={12} md={4} key={post.id}>
                  <Card variant="outlined" sx={{ borderRadius: 3 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.imageUrl || "https://placehold.co/600x400"}
                      alt="Blog görseli"
                    />
                    <CardContent>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        gutterBottom
                      >
                        {new Date(post.createdAt).toLocaleDateString("tr-TR")}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {truncateText(post.title, 20)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                        sx={{ opacity: 0.9 }}
                      >
                        {truncateText(post.content, 28)}
                      </Typography>
                      <Button
                        size="small"
                        component={Link}
                        to={`/posts/${post.id}`}
                        sx={{
                          textTransform: "none",
                          mt: 1,
                          px: 2,
                          fontWeight: 500,
                          color: "#1976d2",
                          border: "1px solid #1976d2",
                          borderRadius: 1,
                        }}
                      >
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        )
      )}
    </Box>
  );
}
