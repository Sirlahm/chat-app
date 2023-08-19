import { Box, Stack } from "@mui/material";
import SideBar from "./SideBar";
import ChatSection from "./ChatSection";
function App() {
  return (
    <Stack direction="row">
      <SideBar />
      <ChatSection />
    </Stack>
  );
}

export default App;
