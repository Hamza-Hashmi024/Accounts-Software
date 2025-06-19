import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  IconButton,
  Badge,
  useMediaQuery,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  ClickAwayListener,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import {
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaChartLine,
  FaBell,
} from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineSearch, MdDashboard } from "react-icons/md";
import { colors } from "../../Globle/colors";

// Styled components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[200], 1),
  marginLeft: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  padding: "2px 10px",
  transition: "all 0.3s ease",
  "&:focus-within": {
    backgroundColor: alpha(theme.palette.grey[300], 1),
    boxShadow: `0 0 0 2px ${alpha(colors.SOLUTYICS_PURPLE, 0.2)}`,
  },
  [theme.breakpoints.up("md")]: {
    width: "400px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  color: theme.palette.grey[600],
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 0),
  },
}));

const NotificationBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

const NavBar = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);

  const profileOpen = Boolean(profileAnchor);
  const notifOpen = Boolean(notifAnchor);

  const handleProfileMenu = (event) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleNotifMenu = (event) => {
    setNotifAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setProfileAnchor(null);
    setNotifAnchor(null);
  };

  // Mock notifications data
  const notifications = [
    { id: 1, text: "New report generated", time: "2 hours ago", read: false },
    { id: 2, text: "System update available", time: "1 day ago", read: true },
    { id: 3, text: "New user registered", time: "2 days ago", read: true },
  ];

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "black",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 16px",
        }}
      >
        {/* Left: Logo */}
        <Box display="flex" alignItems="center">
          <MdDashboard
            size={24}
            color={colors.SOLUTYICS_PURPLE}
            style={{ marginRight: 12 }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 700,
              color: colors.SOLUTYICS_PURPLE,
              letterSpacing: "-0.5px",
            }}
          >
            Solutyics
          </Typography>
        </Box>

        {/* Center: Search Bar */}
        {isMdUp && (
          <Search>
            <SearchIconWrapper>
              <MdOutlineSearch size={20} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search analytics, reports, users..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        )}

        {/* Right: Icons + Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Notifications dropdown */}
          <IconButton
            size="large"
            onClick={handleNotifMenu}
            sx={{ color: theme.palette.grey[700] }}
          >
            <NotificationBadge badgeContent={3} color="error">
              <IoMdNotificationsOutline size={22} />
            </NotificationBadge>
          </IconButton>

          <Menu
            anchorEl={notifAnchor}
            open={notifOpen}
            onClose={handleClose}
            PaperProps={{
              sx: {
                width: 350,
                maxHeight: 400,
                mt: 1.5,
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6">Notifications</Typography>
              <Typography variant="body2" color="text.secondary">
                3 new notifications
              </Typography>
            </Box>
            {notifications.map((notif) => (
              <MenuItem
                key={notif.id}
                sx={{
                  py: 1.5,
                  bgcolor: !notif.read ? alpha(colors.SOLUTYICS_PURPLE, 0.05) : "inherit",
                }}
              >
                <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                  <Box
                    sx={{
                      bgcolor: alpha(colors.SOLUTYICS_PURPLE, 0.1),
                      p: 1,
                      borderRadius: "50%",
                    }}
                  >
                    <FaBell color={colors.SOLUTYICS_PURPLE} />
                  </Box>
                  <Box>
                    <Typography variant="body1">{notif.text}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notif.time}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
            ))}
            <Divider />
            <MenuItem sx={{ justifyContent: "center", color: colors.SOLUTYICS_PURPLE }}>
              View All Notifications
            </MenuItem>
          </Menu>

          {/* Profile dropdown */}
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            onClick={handleProfileMenu}
            sx={{
              cursor: "pointer",
              padding: "6px 10px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <Avatar
              sx={{
                bgcolor: alpha(colors.SOLUTYICS_PURPLE, 0.1),
                color: colors.SOLUTYICS_PURPLE,
                width: 32,
                height: 32,
              }}
            >
              A
            </Avatar>
            {isMdUp && (
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  Admin User
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Administrator
                </Typography>
              </Box>
            )}
          </Box>

          <Menu
            anchorEl={profileAnchor}
            open={profileOpen}
            onClose={handleClose}
            PaperProps={{
              sx: {
                width: 250,
                mt: 1.5,
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Admin User
              </Typography>
              <Typography variant="body2" color="text.secondary">
                admin@solutyics.com
              </Typography>
            </Box>
            <MenuItem onClick={handleClose}>
              <FaUserCircle style={{ marginRight: 12, color: theme.palette.grey[600] }} />
              My Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <FaChartLine style={{ marginRight: 12, color: theme.palette.grey[600] }} />
              Analytics
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <FaCog style={{ marginRight: 12, color: theme.palette.grey[600] }} />
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose} sx={{ color: theme.palette.error.main }}>
              <FaSignOutAlt style={{ marginRight: 12 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
