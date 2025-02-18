"use client";

import type React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Container,
} from "@mui/material";
import { axiosInstance } from "../../api";
import { clearToken } from "../../store/slices/authSlice";
import { LoadingSpinner } from "../../components";
import { ArtCard, HomeLayout } from "./components";

interface Artwork {
  id: number;
  title: string;
  image_id: string;
}

export const Home: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastArtworkElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `https://api.artic.edu/api/v1/artworks?page=${page}&limit=30`
        );
        setArtworks((prevArtworks) => [...prevArtworks, ...response.data.data]);
        setHasMore(response.data.pagination.total_pages > page);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [page]);

  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/login");
  };

  return (
    <HomeLayout>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Tenpo Challange - Art Gallery
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar /> {/* This empty Toolbar acts as a spacer */}
        <Box sx={{ padding: 2, width: "100%", marginTop: "100px" }}>
          <Grid container spacing={2}>
            {artworks.map((artwork, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={`${artwork.id}-${index}`}
                ref={
                  index === artworks.length - 1 ? lastArtworkElementRef : null
                }
              >
                <ArtCard data={artwork} counter={index + 1} />
              </Grid>
            ))}
          </Grid>
          {loading && <LoadingSpinner />}
        </Box>
      </Container>
    </HomeLayout>
  );
};
