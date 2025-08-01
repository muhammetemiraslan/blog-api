import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  imageUrl: string;
  category: string;
}

export default function PostDetails() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchPostAndRelated = async () => {
      try {
        const postRes = await axios.get<Post>(
          `http://localhost:5201/api/Posts/${id}`
        );
        setPost(postRes.data);

        // Diğer postları çek, mevcut postu hariç tut
        const allPostsRes = await axios.get<Post[]>(
          "http://localhost:5201/api/Posts"
        );
        const others = allPostsRes.data.filter((p) => p.id !== postRes.data.id);
        setRelatedPosts(others);
      } catch (err) {
        console.error("Gönderi alınırken hata:", err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndRelated();
  }, [id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (!post)
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6">Gönderi bulunamadı.</Typography>
        <Button component={Link} to="/" sx={{ mt: 2 }}>
          Geri Dön
        </Button>
      </Box>
    );

  return (
    <Box maxWidth="lg" mx="auto" mt={4} px={2}>
      {/* Resim ve tarih */}
      <Box position="relative" width="100%">
        <Box
          component="img"
          src={post.imageUrl || "https://placehold.co/1200x400"}
          alt="Blog görseli"
          width="100%"
          height="auto"
          sx={{ borderRadius: 2 }}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            position: "absolute",
            top: 8,
            right: 16,
            backgroundColor: "rgba(255,255,255,0.7)",
            px: 1,
            borderRadius: 1,
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {new Date(post.createdAt).toLocaleDateString("tr-TR")}
        </Typography>
      </Box>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Kategori: {post.category}
      </Typography>

      <Box display="flex" gap={4} mt={3}>
        <Box flex={7}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body1" whiteSpace="pre-line">
            {post.content}
          </Typography>
          <Button
            variant="outlined"
            component={Link}
            to="/"
            sx={{ mt: 3, textTransform: "none" }}
          >
            Geri Dön
          </Button>
        </Box>

        <Box flex={3}>
          <Typography variant="h6" gutterBottom>
            Diğer Yazılar
          </Typography>
          {relatedPosts.map((p) => (
            <Card
              key={p.id}
              component={Link}
              to={`/posts/${p.id}`}
              sx={{
                display: "flex",
                mb: 2,
                textDecoration: "none",
                borderRadius: 2,
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: 100,
                  objectFit: "cover",
                  borderRadius: "8px 0 0 8px",
                }}
                image={post.imageUrl || "https://placehold.co/600x400"}
                alt={p.title}
              />
              <CardContent sx={{ p: 1.5 }}>
                <Typography variant="subtitle2" color="text.secondary" noWrap>
                  {new Date(p.createdAt).toLocaleDateString("tr-TR")}
                </Typography>
                <Typography variant="body2" fontWeight="600" noWrap>
                  {p.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
