import { Typography } from "@mui/material";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Button, Modal, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResultUploadSuccessfulpage = ({ open, handleClose }) => {
  const { student, theme } = useTheme();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/student/${student.enrollment_id}/`);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          backgroundColor: theme === "dark" ? "#fff" : "black",
          padding: "20px",
          borderRadius: "8px",
          width: "500px",
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
            color: theme === "dark" ? "black" : "#ffa500",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          You have successfully uploaded your result!!
        </Typography>
        <Typography
          sx={{
            fontFamily: "Work Sans",
            fontSize: "18px",
            color: theme === "dark" ? "black" : "#ffa500",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Go to the home page to see the uploaded result.
        </Typography>

        <Button
          size={"medium"}
          variant="contained"
          onClick={handleButtonClick}
          sx={{ width: "150px", fontFamily: "Work Sans" }}
        >
          Home Page
        </Button>
      </Box>
    </Modal>
  );
};

export default ResultUploadSuccessfulpage;
