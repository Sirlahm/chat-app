import { useState } from "react";
import {
  Box,
  Stack,
  Button,
  SvgIcon,
  Container,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Avatar,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
// import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";

const TopBar = ({ handleDrawerOpen }) => {
  const isNotMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box
      bgcolor="white"
      justifyContent={{ xs: "space-between", sm: "end" }}
      p={2}
      px={{ xs: 1.5, sm: 4 }}
      sx={{
        boxShadow: " 0px 4px 16px rgba(43, 52, 69, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconButton
        onClick={handleDrawerOpen}
        sx={{
          background: "#F6F9FC",
          display: isNotMobile ? "none" : "inline-flex",
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography display={{ xs: "block", sm: "none" }} variant="body2" fontSize="17px">
        chatMi
      </Typography>

      <Stack direction="row" justifyContent="end" alignItems="center">
        {/* <Stack direction="row" spacing={{ xs: 2, lg: 0 }}>
          <IconButton
            onClick={handleDrawerOpen}
            sx={{
              background: "#F6F9FC",
              display: bigScreen ? "none" : "inline-flex",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Button
            sx={{
              textTransform: "none",
              bgcolor: "background.paper",
              paddingY: "9px",
              paddingX: "20px",
              borderRadius: "8px",
              justifyContent: "space-between",

              "&:hover": {
                backgroundColor: "background.paper",
              },
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <SvgIcon
                sx={{
                  fontSize: "25px",
                  color: "text.primary",
                }}
              >
                <Browse />
              </SvgIcon>

              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Typography variant="subtitle1" color="text.primary">
                  Browse Website
                </Typography>
              </Link>
            </Stack>
          </Button>
        </Stack> */}

        <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} alignItems="center">
          {/* <OutlinedInput
            placeholder="Search anything"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{
              borderRadius: "12px",
              paddingRight: 0,
              bgcolor: "background.paper",

              "& .MuiInputBase-input": {
                padding: "10px",
                fontSize: "14px",
              },
            }}
          /> */}

          <NotificationsIcon
            sx={{
              color: "#AEB4BE",
              fontSize: "25px"
            }}
          />
          <Avatar
            alt={JSON.parse(localStorage.getItem("user")).userName.toUpperCase()}
            src="/static/images/avatar/1.jpg"
            sx={{ width: 30, height: 30 }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default TopBar;
