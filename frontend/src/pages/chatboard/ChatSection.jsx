import {
  Box,
  OutlinedInput,
  InputAdornment,
  Tooltip,
  IconButton,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import TopBar from "./TopBar";

const ChatSection = () => {
  return (
    <Box
      sx={{
        flex: 1,
        position: "relative",

        background: "#F6F9FC",
      }}
    >
      <TopBar />

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
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title="Send Message">
                <SendIcon
                  sx={{
                    color: "#AEB4BE",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </InputAdornment>
          }
          sx={{
            borderRadius: "12px",
            paddingRight: 0,
            bgcolor: "white",
            width: "80%",
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
    </Box>
  );
};

export default ChatSection;
