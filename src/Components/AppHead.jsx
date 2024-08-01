import React from "react";
import {
  AppBar,
  Box,
  Typography,
  Toolbar,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#64bfb7",
    },
    secondary: {
      main: "#008080",
    },
  },
  typography: {
    fontFamily: "Avenir",
  },
});

const AppHead = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ margin: "0%", height: "55px" }}>
          <Toolbar sx={{}}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                textAlign: "center",
              }}
            >
              Envision
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default AppHead;
