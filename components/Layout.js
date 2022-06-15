import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import RuleIcon from "@mui/icons-material/Rule";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WorkIcon from "@mui/icons-material/Work";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ExpandLess from "@mui/icons-material/ExpandLess";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMore from "@mui/icons-material/ExpandMore";
import BadgeIcon from "@mui/icons-material/Badge";
import StorageIcon from "@mui/icons-material/Storage";
import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useRouter } from "next/router";
const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

export default function Layout({ children }) {
  const [open, setOpen] = React.useState(true);
  const [openList, setListOpen] = React.useState(false);
  const [openSurveyList, setSurveyListOpen] = React.useState(false);
  const [openUAMList, setUAMListOpen] = React.useState(false);
  const [openRegisterContentList, setRegisterContentList] =
    React.useState(false);
  const [openDatabaseList, setDatabaseList] = React.useState(false);
  React.useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === undefined || loggedIn === "false" || loggedIn === null) {
      router.push("/login");
    }
  }, []);
  const handleClick = () => {
    setListOpen(!openList);
  };

  const router = useRouter();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
              <Button
                variant="outlined"
                style={{ color: "white", borderColor: "white" }}
                onClick={() => {
                  localStorage.setItem("loggedIn", "false");
                  router.push("/login");
                }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <ListItemButton
                onClick={() => router.push("/dashboard/verify-employer")}
              >
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText primary="Verify Employer" />
              </ListItemButton>
              <ListItemButton
                onClick={() => router.push("/dashboard/rule-engine")}
              >
                <ListItemIcon>
                  <RuleIcon />
                </ListItemIcon>
                <ListItemText primary="Rule Engine" />
              </ListItemButton>
              <ListItemButton onClick={() => router.push("/login-content")}>
                <ListItemIcon>
                  <InsertPhotoIcon />
                </ListItemIcon>
                <ListItemText primary="Login Content" />
              </ListItemButton>

              <ListItemButton
                onClick={() => router.push("/register-content/employee")}
              >
                <ListItemIcon>
                  <InsertPhotoIcon />
                </ListItemIcon>
                <ListItemText primary="Register Content" />
              </ListItemButton>
              <ListItemButton onClick={() => router.push("/uam/employee")}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="UAM" />
              </ListItemButton>
              <ListItemButton onClick={() => router.push("/survey/employee")}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Survey" />
              </ListItemButton>
              <ListItemButton onClick={() => router.push("/database/employee")}>
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText primary="Database" />
              </ListItemButton>
              <ListItemButton onClick={() => router.push("/jobs")}>
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText primary="Jobs" />
              </ListItemButton>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText primary={`On-boarding Process`} />
                {openList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => router.push("/dashboard/add-location")}
                  >
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Location" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => router.push("/dashboard/add-qualification")}
                  >
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Qualification" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => router.push("/dashboard/add-industry")}
                  >
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Industry" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => router.push("/dashboard/add-domain")}
                  >
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Domain" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => router.push("/dashboard/add-subdomain")}
                  >
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="SubDomain" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => router.push("/dashboard/add-skill")}
                  >
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Skill" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => router.push("/dashboard/add-benefit")}
                  >
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Benefit" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          ></Box>
          {children}
        </Box>
      </ThemeProvider>
    </>
  );
}
