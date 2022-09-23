import { useEffect, useState } from "react";
import { AppBar, Drawer, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Theme, useTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import {
  BrowserRouter,
  Link,
  Routes,
  Route
} from "react-router-dom";
import ContactForm from "../Form/ContactForm";
import ContactCardGrid from "../Grid/ContactCardGrid";
import ContactTable from "../Table/ContactTable";
import ContactDataGrid from "../DataGrid/ContactDataGrid";
import { BeautifulTheme } from "../../Theme/BeautifulTheme";

const drawerWidth = 240;
const transitionDuration = 1000;

const themedStyles = (theme: Theme, mobileResponsiveWidth: string | number) => {
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
      width: mobileResponsiveWidth,
      "& .MuiBackdrop-root": {
        display: "none"
      }
    },
    menuButton: {
      marginRight: 2
    },
    drawerPaper: {
      width: mobileResponsiveWidth,
      backgroundColor: "rgba(120, 120, 120, 0.2)"
    },
    content: {
      padding: 4,
      minWidth: mobileResponsiveWidth,
      marginLeft: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: transitionDuration
      })
    },
    contentShift: {
      minWidth: mobileResponsiveWidth,
      marginLeft: mobileResponsiveWidth,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: transitionDuration
      })
    }
  }
}

export default function NavDrawer() {
  const theme = useTheme();
  const greaterThan375 = useMediaQuery("(min-width:376px)");
  const [open, setOpen] = useState(greaterThan375);
  const responsiveDrawerWidth = greaterThan375 ? drawerWidth: "100%";

  useEffect(() => {
    setOpen(greaterThan375);
  }, [greaterThan375]);

  const handleMenuClick = () => {
    setOpen(!open);
  }
  
  return (
    <div>
      <BrowserRouter>
        <AppBar position="fixed" sx={themedStyles(theme, responsiveDrawerWidth).appBar}>
          <Toolbar>
            <IconButton
              onClick={handleMenuClick}
              edge="start"
              sx={{ ...themedStyles(theme, responsiveDrawerWidth).menuButton, display: greaterThan375 ? "none" : ""}}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Advanced Material-UI Styling
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          disableEnforceFocus
          variant="temporary"
          open={open}
          sx={themedStyles(theme, responsiveDrawerWidth).drawer}
          PaperProps={{ elevation: 9, sx: themedStyles(theme, responsiveDrawerWidth).drawerPaper }}
        >
          <Toolbar />
          <div>
            <List>
              {
                [{ text: "Contact Form", route: "/form" }, { text: "Card Grid", route: "/grid" }, { text: "Table", route: "/table" }, { text: "Data Grid", route: "/datagrid" }].map((nav, index) => (
                  <ListItem key={nav.text} sx={{borderBottom: '1px solid', borderBottomColor: "primary.main"}}>
                    <Link to={nav.route}>{nav.text}</Link>
                  </ListItem>
                ))
              }
            </List>
          </div>
        </Drawer>
        <main style={{ ...themedStyles(theme, responsiveDrawerWidth).content, ...(open ? themedStyles(theme, responsiveDrawerWidth).contentShift: {}) }}>
          <Toolbar />
          <ThemeProvider theme={BeautifulTheme}>
            <Routes>
              <Route path={"/"} element={<ContactForm />} />
              <Route path={"/form"} element={<ContactForm />} />
              <Route path={"/grid"} element={<ContactCardGrid />} />
              <Route path={"/table"} element={<ContactTable />} />
              <Route path={"/datagrid"} element={<ContactDataGrid />} />
            </Routes>
          </ThemeProvider>
        </main>
      </BrowserRouter>
    </div>
  )
}