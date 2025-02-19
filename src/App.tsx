import type React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { PrivateRoute } from "./components";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { AuthProvider, UIProvider } from "./contexts";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <UIProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              {/** Others public routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/home" element={<Home />} />
                {/* Others privated routes */}
              </Route>
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </UIProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
