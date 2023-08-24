import { useState, useEffect } from "react";
import { Box, Stack, Typography, Avatar, styled, Chip } from "@mui/material";
import { getUsers } from "../../utils/endpoints";

const SideBar = ({
  clickedUser,
  setClickedUser,
  socket,
  handleDrawerClose,
}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "280px",
          minWidth: "280px",
          height: "100%",
          backgroundColor: "#2B3445",
          color: "white",
          padding: "20px 0",
        }}
      >
        <Stack direction="row" px="20px" justifyContent="space-between">
          <Typography>chatMi</Typography>
          <Chip
            label={socket ? "Online" : "Offline"}
            sx={{
              height: "25px",
              color: socket ? "#33d067" : "#e94560",
              bgcolor: socket ? "#e7f9ed" : "#ffeaea",
            }}
          />
        </Stack>

        <Stack
          mt={3}
          sx={{
            borderTop: "1px solid #aeb4be",
          }}
        >
          {users.map((user) => (
            <Box
              onClick={() => {
                setClickedUser(user?._id);
                handleDrawerClose();
              }}
              sx={{
                cursor: "pointer",
                background:
                  clickedUser === user._id ? "#AEB4BE" : "transparent",
                borderBottom: "1px solid #aeb4be",
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                px="20px"
                py="10px"
              >
                <Avatar
                  alt={user.userName.toUpperCase()}
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 40, height: 40 }}
                />

                <Typography textTransform="capitalize">
                  {user.userName}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default SideBar;
