import { Box, Button, Stack, TextField } from "@mui/material";

interface PostFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (value: string | null) => void;
}

export default function PostFilters({
  search,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: PostFiltersProps) {
  return (
    <Box my={4}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="stretch"
        flexWrap="wrap"
      >
        <Box sx={{ flex: 1 }}>
          <TextField
            label="Ara..."
            variant="outlined"
            fullWidth
            size="small"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                height: 40,
              },
            }}
          />
        </Box>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          sx={{ alignItems: "center" }}
        >
          <Button
            variant={selectedCategory === null ? "contained" : "outlined"}
            onClick={() => onCategoryChange(null)}
            sx={{ textTransform: "none" }}
          >
            Tüm Kategoriler
          </Button>

          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "contained" : "outlined"}
              sx={{ textTransform: "none" }}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
