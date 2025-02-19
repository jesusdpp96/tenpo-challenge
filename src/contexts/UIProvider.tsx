import React, { useState, useCallback } from "react";
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import { UIContext } from "./UIContext";

interface UIProviderProps {
  children: React.ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<{
    isLoading: boolean;
    message?: string;
    fullscreen: boolean;
  }>({
    isLoading: false,
    message: "",
    fullscreen: false,
  });

  const showError = useCallback((message: string) => {
    setError(message);
  }, []);

  const showLoading = useCallback(
    (message?: string, fullscreen: boolean = false) => {
      setLoading({
        isLoading: true,
        message,
        fullscreen,
      });
    },
    []
  );

  const hideLoading = useCallback(() => {
    setLoading({
      isLoading: false,
      message: "",
      fullscreen: false,
    });
  }, []);

  return (
    <UIContext.Provider value={{ showError, showLoading, hideLoading }}>
      {children}
      {/* Error Snackbar */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      {/* Loading Indicator */}
      {loading.isLoading &&
        (loading.fullscreen ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <div style={{ textAlign: "center" }}>
              <CircularProgress color="inherit" />
              {loading.message && (
                <div style={{ marginTop: "1rem", color: "white" }}>
                  {loading.message}
                </div>
              )}
            </div>
          </Backdrop>
        ) : (
          <Snackbar
            open={true}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              icon={<CircularProgress size={20} />}
              severity="info"
              sx={{ width: "100%" }}
            >
              {loading.message || "Loading..."}
            </Alert>
          </Snackbar>
        ))}
    </UIContext.Provider>
  );
};
