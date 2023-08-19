import { Box, Stack } from "@mui/material";
import SideBar from "./SideBar";
import ChatSection from "./ChatSection";
function ChatBoard() {
  return (
    <Stack direction="row">
      <SideBar />
      <ChatSection />
    </Stack>
  );
}

export default ChatBoard;