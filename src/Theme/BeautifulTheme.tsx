import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    grid: { main: string, dark: string }
  }

  interface PaletteOptions {
    grid?: { main: string, dark: string }
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    beautiful: true
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true,
    sm: true,
    md: true,
    lg: true,
    sl: true,
    xl: false
  }
}

const BeautifulTheme = createTheme({
  palette: {
    primary: {
      main: "#18842c",
      light: "#3aab58",
      dark: "darkgreen"
    },
    grid: {
      main: "rgba(0,0,0,0.1)",
      dark: "rgba(0,0,0,0.2)"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: "1px solid orange"
        }
      },
      variants: [
        {
          props: { variant: "beautiful" },
          style: {
            fontStyle: "italic",
            border: "4px solid lightpink",
            color: "fuchsia"
          }
        }
      ]
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      sl: 1500
    }
  },
  zIndex: {
    appBar: 1150
  }
});

export { BeautifulTheme };