"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Container,
} from "@mui/material";
import { axiosInstance } from "../../api";
import { setToken } from "../../store/slices/authSlice";
import { LoginLayout } from "./components";
import TenpoLogo from "../../assets/tenpo-logo.svg";
import "./css/Login.css";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post("https://reqres.in/api/login", {
        email,
        password,
      });

      if (response.data.token) {
        dispatch(setToken(response.data.token));
        navigate("/home");
      }
    } catch (error) {
      setError("Invalid email or password");
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
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
