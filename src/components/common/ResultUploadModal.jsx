import { Typography, Button, Modal, Box } from "@mui/material";
import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ResultUploadModal = ({
  open,
  handleClose,
  message,
  buttonLabel,
  buttonAction,
}) => {
  const { theme } = useTheme();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          background: `linear-gradient(to bottom, ${
            theme === "dark" ? "#303030" : "#f5e8dd"
          }, ${theme === "dark" ? "#1a1a1a" : "#ffffff"})`,
          color: theme === "dark" ? "white" : "black",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Work Sans",
            fontSize: "24px",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {message}
        </Typography>

        <Button
          size="medium"
          variant="contained"
          onClick={buttonAction}
          sx={{ width: "150px", fontFamily: "Work Sans" }}
        >
          {buttonLabel}
        </Button>
      </Box>
    </Modal>
  );
};

export default ResultUploadModal;
