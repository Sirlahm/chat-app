import { Box, Stack } from "@mui/material";
const SideBar = () => {
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
      ></Box>
    </Box>
  );
};

export default SideBar;
