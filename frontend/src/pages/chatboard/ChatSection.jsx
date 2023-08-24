import { useState, useEffect } from "react";
import {
  Box,
  OutlinedInput,
  InputAdornment,
  Tooltip,
  IconButton,
  Typography,
  Stack,
  useMediaQuery
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import TopBar from "./TopBar";
import { getUser } from "../../utils/endpoints";

const ChatSection = ({
  socket,
  clickedUser,
  messages,
  setMessages,
  handleDrawerOpen,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [receiverer, setReceiverer] = useState(null);
  const isNotMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    getUser(clickedUser).then(setReceiverer);
  }, [clickedUser]);

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("receive-message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      return () => {
        socket.off("receive-message");
      };
    }
  }, [messages]);

  const handleSendMessage = () => {
    const messageData = {
      senderId: JSON.parse(localStorage.getItem("user"))._id,
      receiverId: clickedUser,
      content: newMessage,
    };
    socket.emit("send-message", messageData);
    setNewMessage("");
  };
  return (
    <Box
      sx={{
        flex: 1,
        position: "relative",
        background: "#F6F9FC",
      }}
    >
      <TopBar handleDrawerOpen={handleDrawerOpen} />
      {clickedUser && (
        <Typography
          textAlign="center"
          display={{ xs: "block", sm: "none" }}
          sx={{
            background: "teal",
            color: "white",
            p: 0.5,
          }}
          fontSize="14px"
        >
          You are currently chatting with {receiverer?.userName.toUpperCase()}{" "}
        </Typography>
      )}

      {clickedUser ? (
        <>
          <Stack
            spacing={1}
            pt={2}
            px={3}
            pb={10}
            id="scroll-container"
            sx={{
              height: "80vh",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#AEB4BE",
                borderRadius: "100px",
              },
            }}
          >
            {messages.map((m) => (
              <Box
                width="80%"
                display="flex"
                justifyContent={
                  m.senderId === JSON.parse(localStorage.getItem("user"))._id
                    ? "end"
                    : "start"
                }
                alignSelf={
                  m.senderId === JSON.parse(localStorage.getItem("user"))._id
                    ? "end"
                    : "start"
                }
              >
                <Typography
                  display="inline-block"
                  sx={{
                    background:
                      m.senderId ===
                      JSON.parse(localStorage.getItem("user"))._id
                        ? "#2B3445"
                        : "#AEB4BE",
                    color: "white",
                    borderRadius: "15px",
                    px: 2,
                    py: 1,
                  }}
                >
                  {m.content}
                </Typography>
              </Box>
            ))}
          </Stack>
          <Box
            sx={{
              position: "absolute",
              bottom: "0",
              mb: 3,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <OutlinedInput
              fullWidth
              placeholder="Send a message"
              multiline
              rows={2}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              endAdornment={
                newMessage.length > 0 && (
                  <InputAdornment position="end">
                    <Tooltip title="Send Message">
                      <IconButton onClick={handleSendMessage}>
                        <SendIcon
                          sx={{
                            color: "#AEB4BE",
                            cursor: "pointer",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }
              sx={{
                borderRadius: "12px",
                paddingRight: 0,
                bgcolor: "white",
                width: isNotMobile ? "80%" : "90%" ,
                paddingX: "15px",

                "& .MuiInputBase-input": {
                  fontSize: "15px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                  boxShadow:
                    "0 0 transparent,0 0 transparent,0 0 15px rgba(0,0,0,.1)",
                },
              }}
            />
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "calc(100vh - 75px)",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            textAlign="center"
            color="text.primary"
            variant="h5"
            fontSize="35px"
          >
            chatMi
          </Typography>
          <Typography mt={1} color="#AEB4BE">
            Click on any user to start chat!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatSection;
