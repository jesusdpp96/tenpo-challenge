"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Container,
} from "@mui/material";
import { axiosInstance } from "../../api";
import { LoginLayout } from "./components";
import TenpoLogo from "../../assets/tenpo-logo.svg";
import "./css/Login.css";
import { useAuth, useFetchAndLoad } from "../../hooks";
import { loginService } from "../../services";

export const Login: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const { loading, callEndpoint } = useFetchAndLoad();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir si ya está autenticado
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // Executing login service with fake service
      const response = await callEndpoint(loginService(email, password));
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      if (response.data.token) {
        login(response.data.token);
        navigate("/home");
      }
    } catch (error) {
      // if fake API fails, use fake local login
      if (email === "jesus@reqres.in" && password === "strongpassword") {
        const fakeToken = "QpwL5tke4Pnpja7X4";
        login(fakeToken);
        navigate("/home");
      } else {
        setError("Invalid email or password");
      }
    }
  };

  return (
    <LoginLayout>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          position: "relative",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={TenpoLogo}
              className="logo"
              alt="Tenpo Logo"
              style={{ width: "150px" }}
            />
            <Typography component="h2" variant="h4" align="center">
              Tenpo Challenge
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 3,
                backgroundColor: "background.paper",
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ width: "100%" }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {loading ? (
                  <>Loading...</>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                )}
                {error && (
                  <Typography color="error" align="center">
                    {error}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </LoginLayout>
  );
};
