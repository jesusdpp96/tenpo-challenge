import { createTheme, ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#42c268",
    },
    secondary: {
      main: "#ffffff",
    },
  },
};

export const theme = createTheme(themeOptions);
