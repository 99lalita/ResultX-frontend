import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  MenuItem,
  Menu,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import BackendEndpoints from "../../utils/BackendEndpoints";
import InfoIcon from "@mui/icons-material/Info";

const MainNavbar = ({ userType, userData }) => {
  const { theme, toggleTheme } = useTheme();
  // console.log(userData);

  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const userHomeLink =
    userType === "student"
      ? `/student/${userData?.enrollment_id}`
      : `/admin/${userData?.admin_id}`;

  const userAboutLink =
    userType === "student"
      ? `/student/${userData?.enrollment_id}/about`
      : `/admin/${userData?.admin_id}/about`;

  const userContactLink =
    userType === "student"
      ? `/student/${userData?.enrollment_id}/contact`
      : `/admin/${userData?.admin_id}/contact`;

  const userTeamPageLink =
    userType === "student"
      ? `/student/${userData?.enrollment_id}/teamPage`
      : `/admin/${userData?.admin_id}/teamPage`;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    localStorage.removeItem("instructionsShown");

    if (userType === "student") {
      Cookies.remove("studentInfo");
      Cookies.remove(BackendEndpoints.STUDENT);
      Cookies.remove(BackendEndpoints.AUTH_STUDENT_ACCESS_TOKEN);
      Cookies.remove(BackendEndpoints.AUTH_STUDENT_REFRESH_TOKEN);
      navigate("/");
    }
    if (userType === "admin") {
      Cookies.remove("adminInfo");
      Cookies.remove(BackendEndpoints.ADMIN);
      Cookies.remove(BackendEndpoints.AUTH_ADMIN_ACCESS_TOKEN);
      Cookies.remove(BackendEndpoints.AUTH_ADMIN_REFRESH_TOKEN);
      navigate("/");
    }
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        // flex: 1,
        bgcolor: theme === "dark" ? "#1f1e1e" : "#f5e8dd",
        color: theme === "dark" ? "#ffffff" : "#333333",
        // width: "100%",
      }}
    >
      <Container maxWidth="xl" className="nav">
        <Toolbar variant="regular">
          {/* Application name */}
          <Typography
            variant="h4"
            noWrap
            component={NavLink}
            to={userHomeLink}
            className="navbar-app-name"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 900,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ResultX
          </Typography>

          {/* Navbar menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", gap: "5px" },
            }}
          >
            <NavLink
              to={userHomeLink}
              style={{
                textDecoration: "none",
                color: "inherit",
                fontWeight:
                  location.pathname === userHomeLink ? "bold" : "normal",
                borderBottom:
                  location.pathname === userHomeLink
                    ? "4px solid #ffa500"
                    : "none",
              }}
              className="nav-link"
            >
              <MenuItem style={{ fontSize: "18px", fontWeight: "500" }}>
                Home
              </MenuItem>
            </NavLink>
            <NavLink
              to={userAboutLink}
              style={{ textDecoration: "none", color: "inherit" }}
              activeClassName="active"
              className="nav-link"
            >
              <MenuItem style={{ fontSize: "18px", fontWeight: "500" }}>
                About Us
              </MenuItem>
            </NavLink>
            <NavLink
              to={userContactLink}
              style={{ textDecoration: "none", color: "inherit" }}
              activeClassName="active"
              className="nav-link"
            >
              <MenuItem style={{ fontSize: "18px", fontWeight: "500" }}>
                Contact Us
              </MenuItem>
            </NavLink>

            <NavLink
              to={userTeamPageLink}
              style={{ textDecoration: "none", color: "inherit" }}
              activeClassName="active"
              className="nav-link"
            >
              <MenuItem style={{ fontSize: "18px", fontWeight: "500" }}>
                Team
              </MenuItem>
            </NavLink>
          </Box>

          {/* Navbar menu for mobile devices */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon style={{ fontSize: "36px" }} />
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
                display: { xs: "block", md: "none" },
              }}
            >
              <NavLink
                to={userHomeLink}
                style={{ textDecoration: "none", color: "inherit" }}
                activeClassName="active"
                className="nav-link"
              >
                <MenuItem>Home</MenuItem>
              </NavLink>
              <NavLink
                to={userAboutLink}
                style={{ textDecoration: "none", color: "inherit" }}
                activeClassName="active"
                className="nav-link"
              >
                <MenuItem>About Us</MenuItem>
              </NavLink>
              <NavLink
                to={userContactLink}
                style={{ textDecoration: "none", color: "inherit" }}
                activeClassName="active"
                className="nav-link"
              >
                <MenuItem>Contact Us</MenuItem>
              </NavLink>
              <NavLink
                to={userTeamPageLink}
                activeClassName="active"
                className="nav-link"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>Team</MenuItem>
              </NavLink>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to={userHomeLink}
            className="navbar-app-name"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              textAlign: "center",
              margin: "0px auto",
            }}
          >
            ResultX
          </Typography>

          {/* Light/Dark mode switch */}
          <Tooltip title="Change Mode">
            {theme === "light" ? (
              <DarkModeIcon
                onClick={toggleTheme}
                style={{
                  fontSize: "36px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              />
            ) : (
              <LightModeIcon
                onClick={toggleTheme}
                style={{
                  fontSize: "30px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              />
            )}
          </Tooltip>

          {/* User profile and logout */}
          {/* Avatar Component and Light-Dark Mode Switch */}

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  src={userData && userData.profileImageURI}
                  // src={studentInfo.profileImageURI}
                  alt={userData && userData.first_name}
                  sx={{
                    bgcolor: theme === "dark" ? "#f5f5f5" : "black",
                    color: theme === "dark" ? "black" : "white",
                    width: 36,
                    height: 36,
                    border: "2px solid lightgreen",
                  }}
                />
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
              <ProfileModal userData={userData}>
                <MenuItem
                  divider={"true"}
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  My Profile
                  <img
                    src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg"
                    alt=""
                    height="25px"
                    style={{ color: "#ffa500" }}
                  />
                </MenuItem>
              </ProfileModal>

              <MenuItem
                onClick={logoutHandler}
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {" "}
                Logout
                <img
                  src="https://cdn.iconscout.com/icon/premium/png-256-thumb/logout-2030711-1713351.png"
                  alt=""
                  height={"25px"}
                />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainNavbar;
