import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Stack, Zoom } from "@mui/material";
import { GiBloodyStash } from "react-icons/gi";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { themeChange } from "../store/slices/themeSlice";
import { useTheme } from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { Link } from "react-router-dom";

const pages = ["home", "request", /*"about"*/];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const store = useSelector((store) => store);
  const { userData } = store;
  // console.log(userData)


  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    e === "Logout" ? Logout() : setAnchorElUser(null);
  };

  const Logout = () => {
    setAnchorElUser(null);
    // dispatch(stopCheckUser(true));
    signOut(auth).then((res) => {
      console.log('Signed out');
      // dispatch(stopCheckUser(false));

    })
      .catch((error) => {
        console.log('Error signing out: ', error.message);
      });
  };
  // navigate("/");

  let darkLight = localStorage.getItem("theme");
  let themeTooltip =
    darkLight === "light" || darkLight == null ? "Light Mode" : "Dark Mode";
  let themeIcon =
    darkLight === "light" || darkLight == null ? (
      <MdLightMode />
    ) : (
      <MdDarkMode />
    );

  const handelTheme = () => {
    if (darkLight === "dark") {
      localStorage.setItem("theme", "light");
      dispatch(themeChange("light"));
    } else {
      localStorage.setItem("theme", "dark");
      dispatch(themeChange("dark"));
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: primary.main,
        color: "black",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGO sm flex */}
          <GiBloodyStash className="cursor-pointer text-2xl mr-1 items-center hidden customScr:flex" />
          <Typography
            variant="h6"
            noWrap
            sx={{
              cursor: "pointer",
              mr: 2,
              display: { xs: "none", sm: "flex" },
              fontFamily: "arial",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            BLOODY
          </Typography>

          {/* Heading xs flex */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              {pages.map((page) => (
                <Link key={page} to={`/${page}`}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography sx={{ textTransform: "capitalize" }} textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* LOGO xs flex */}
          <GiBloodyStash className="cursor-pointer text-xl mr-1 items-center flex customScr:hidden" />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 1,
              cursor: "pointer",
              display: { xs: "flex", sm: "none" },
              flexGrow: 1,
              fontFamily: "arial",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "black",
              textDecoration: "none",
              fontSize: "larger",
            }}
          >
            BLOODY
          </Typography>

          {/* Heading sm flex */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {pages.map((page) => (
              <Link key={page} to={`/${page}`}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    fontWeight: "bold",
                  }}
                >
                  {page}
                </Button>
              </Link>

            ))}
          </Box>

          {/* Theme Mode*/}
          <Tooltip
            title={themeTooltip}
            TransitionComponent={Zoom}
            arrow
            slotProps={{
              popper: {
                sx: {
                  [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                  {
                    bgcolor: "black",
                    fontWeight: "bold",
                  },
                },
              },
            }}
          >
            <IconButton onClick={handelTheme} sx={{ p: 0, mr: 0.5 }}>
              {themeIcon}
            </IconButton>
          </Tooltip>

          {/* Avatar*/}
          <Box sx={{ flexGrow: 0, }}>
            <Tooltip
              title="Open settings"
              TransitionComponent={Zoom}
              arrow
              slotProps={{
                popper: {
                  sx: {
                    [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                    {
                      bgcolor: "black",
                      fontWeight: "bold",
                    },
                  },
                },
              }}
            >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Stack alignItems={"center"}>
                  <Avatar alt={userData.username} src="" />
                  <Typography sx={{ textOverflow: "ellipsis" }}>{userData.username}</Typography>
                </Stack>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export { Navbar };
