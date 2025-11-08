const getTheme = () => ({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
    background: {
      default: "#fff",
      paper: "#f3f6fb",
    },
    text: {
      primary: "#0d2149",
      secondary: "#3f51b5",
    },
    grey: {
      100: "#e3f2fd",
      300: "#90caf9",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: { elevation: 1 },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: "#e3f2fd",
          backgroundImage:
            "linear-gradient(90deg, #e3f2fd 25%, #90caf9 37%, #e3f2fd 63%)",
          animationDuration: "1.5s",
        },
      },
    },
  },
});

export default getTheme;
