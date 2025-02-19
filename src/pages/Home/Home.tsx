"use client";

import type React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Box,
  Container,
} from "@mui/material";
import { LoadingSpinner } from "../../components";
import { ArtCard, HomeLayout } from "./components";
import { useAuth, useFetchAndLoad, useUI } from "../../hooks";
import { articApiService } from "../../services";
import { Artwork } from "../../models";
import { createArtworkAdapter } from "../../adapters";

export const Home: React.FC = () => {
  const { logout } = useAuth();
  const { loading, callEndpoint } = useFetchAndLoad();
  const { showLoading, hideLoading, showError } = useUI();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [loading2, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastArtworkElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading2) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading2, hasMore]
  );

  useEffect(() => {
    if (loading) {
      // show global loading (snackbar)
      showLoading("loading more artworks...", false);
    } else {
      // hide global loading (snackbar)
      hideLoading();
    }
  }, [loading]);

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const response = await callEndpoint(articApiService(page));
        const data = response.data.data || [];
        const artworks = data.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (elem: any): Artwork => createArtworkAdapter(elem)
        );
        setArtworks((prevArtworks) => [...prevArtworks, ...artworks]);
        setHasMore(response.data.pagination.total_pages > page);
      } catch (error) {
        console.error("Error fetching artworks:", error);
        showError("Error fetching artworks");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [page]);

  const handleLogout = () => {
    logout();
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
          {(loading || loading2) && <LoadingSpinner />}
        </Box>
      </Container>
    </HomeLayout>
  );
};
