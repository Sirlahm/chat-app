import { useState, useEffect } from "react";
import { Box, Stack, Typography, Drawer } from "@mui/material";
import SideBar from "./SideBar";
import ChatSection from "./ChatSection";
import { getMessages } from "../../utils/endpoints";

function ChatBoard({ socket }) {
  const [clickedUser, setClickedUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    if (clickedUser) {
      getMessages(
        JSON.parse(localStorage.getItem("user"))._id,
        clickedUser
      ).then(setMessages);
    }
  }, [clickedUser]);
  return (
    <Stack direction="row" height="100vh">
      <Box display={{ xs: "none", sm: "block" }}>
        <SideBar
          clickedUser={clickedUser}
          setClickedUser={setClickedUser}
          socket={socket}
        />
      </Box>

      <ChatSection
        socket={socket}
        clickedUser={clickedUser}
        messages={messages}
        setMessages={setMessages}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        anchor="left"
        sx={{
          zIndex: "1200",
          "& .MuiPaper-root": {
            backgroundColor: "#2B3445",
          },
        }}
      >
        <SideBar
          clickedUser={clickedUser}
          setClickedUser={setClickedUser}
          socket={socket}
          handleDrawerClose={handleDrawerClose}
        />
      </Drawer>
    </Stack>
  );
}

export default ChatBoard;
