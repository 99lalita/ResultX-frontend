import React, { useState } from "react";
import { Button, IconButton, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "../../context/ThemeContext";

const ProfileModal = ({ userData, children }) => {
  const { theme } = useTheme();
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const handleOpenProfileModal = () => setOpenProfileModal(true);
  const handleCloseProfileModal = () => setOpenProfileModal(false);


  // If userData is not available, render nothing
  if (!userData) {
    return null;
  }

  return (
    <>
      {/* Button or element to open the profile modal */}
      <span onClick={handleOpenProfileModal}>{children}</span>

      {/* Profile Modal */}
      <Modal
        open={openProfileModal}
        onClose={handleCloseProfileModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            "@media (min-width: 780px)": {
              width: "400px",
            },
            background: `linear-gradient(to bottom, ${
              theme === "dark" ? "#303030" : "#f5e8dd"
            }, ${theme === "dark" ? "#1a1a1a" : "#ffffff"})`,
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
            borderRadius: "12px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Close button */}
          <IconButton
            onClick={handleCloseProfileModal}
            sx={{
              position: "absolute",
              top: "5px",
              right: "5px",
              color: theme === "dark" ? "#fff" : "#000",
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* User profile image */}
          <img
            src={userData.profileImageURI}
            alt={userData.first_name}
            style={{
              height: "120px",
              width: "120px",
              borderRadius: "50%",
              alignSelf: "center",
            }}
          />

          {/* User information */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              textAlign: "center",
              fontFamily: "Work Sans",
              color: theme === "dark" ? "#fff" : "#000",
              marginTop: "10px",
            }}
          >
            {`${userData.first_name} ${userData.last_name}`}
            <br />
            Email: {userData.email}
            <br />
            {userData?.enrollment_id && userData?.graduation_year && (
              <>
                PRN: {userData?.enrollment_id}
                <br />
                Graduation Year: {userData?.graduation_year}
              </>
            )}
          </Typography>

          <Button
            size="medium"
            variant="contained"
            onClick={handleCloseProfileModal}
            sx={{ width: "100%", marginTop: "20px" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileModal;
