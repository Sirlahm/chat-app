import { useState, useEffect } from "react";
import { Box, Stack, Typography, Avatar, Divider, styled } from "@mui/material";
import { getUsers } from "../../utils/endpoints";
const CustomDivider = styled(Divider)`
  margin: 10px 0px 10px;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: #aeb4be;
`;
const SideBar = () => {
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
        <Typography px="20px">chatMi</Typography>

        <Stack mt={3}>
          <CustomDivider />
          {users.map((user) => (
            <Box>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                px="20px"
              >
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 40, height: 40 }}
                />

                <Typography textTransform="capitalize">
                  {user.userName}
                </Typography>
              </Stack>
              <CustomDivider />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default SideBar;
