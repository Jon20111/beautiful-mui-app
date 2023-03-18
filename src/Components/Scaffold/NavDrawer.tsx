import { useEffect, useState } from "react";
import { AppBar, Drawer, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material"
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import ContactForm from "../Form/ContactForm";
import ContactCardGrid from "../Grid/ContactCardGrid";
import ContactTable from "../Table/ContactTable";
import ContactDataGrid from "../DataGrid/ContactDataGrid";
import { useTheme, Theme, ThemeProvider } from "@mui/material/styles";
import { BeautifulTheme } from "../../Theme/BeautifulTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;
const transitionDuration = 1000;

const themedStyles = (theme: Theme, responsiveDrawerWidth: number | string) => {
  return {
    menuButton: {
      marginRight: 2
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
      width: responsiveDrawerWidth,
      "& .MuiBackdrop-root": {
        display: "none"
      }
    },
    drawerPaper: {
      width: responsiveDrawerWidth,
      backgroundColor: "rgba(120,120,120,0.2)"
    },
    content: {
      marginLeft: 0,
      padding: 3,
      maxWidth: 720,
      minWidth: 375,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: transitionDuration
      })
    },
    contentShift: {
      marginLeft: responsiveDrawerWidth,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: transitionDuration
      })
    }
  }
}

export default function NavDrawer() {
  const theme = useTheme();
  const greaterThan375 = useMediaQuery("(min-width: 376px)");
  const [open, setOpen] = useState(greaterThan375);
  const responsiveDrawerWidth = greaterThan375 ? drawerWidth : "100%";

  useEffect(() => {
    setOpen(greaterThan375);
  }, [greaterThan375])

  return (
    <BrowserRouter>
      <div>
        <AppBar position="fixed" sx={themedStyles(theme, responsiveDrawerWidth).appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => { setOpen(!open) }}
              sx={{ ...themedStyles(theme, responsiveDrawerWidth).menuButton, display: greaterThan375 ? "none" : "" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Advanced Material UI Styling
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          disableEnforceFocus
          variant="temporary"
          open={open}
          sx={themedStyles(theme, responsiveDrawerWidth).drawer}
          PaperProps={{
            sx: themedStyles(theme, responsiveDrawerWidth).drawerPaper,
            elevation: 9
          }}
          transitionDuration={{
            enter: transitionDuration,
            exit: transitionDuration
          }}
        >
          <Toolbar />
          <List>
            {[{ text: "Input Form", route: "/form" }, { text: "Contact Card Grid", route: "/grid" }, { text: "Contact Table", route: "/table" }, { text: "Contact Data Grid", route: "/datagrid" }].map((nav, index) => (
              <ListItem sx={{ borderBottom: "1px solid black", borderBottomColor: "primary.main" }} key={nav.text}><Link to={nav.route}>{nav.text}</Link></ListItem>
            ))}
          </List>
        </Drawer>
        <main style={{ ...themedStyles(theme, responsiveDrawerWidth).content, ...(open ? themedStyles(theme, responsiveDrawerWidth).contentShift : {}) }}>
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
      </div>
    </BrowserRouter>
  )
}