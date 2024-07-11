import React from "react";
import { Box, Stack } from "@mui/material";
import AdminRegistration from "../components/Authentication/AdminRegistration";
import StudentRegistration from "../components/Authentication/StudentRegistration";
import { Route, Routes } from "react-router-dom";

const SignupTemp = () => {
  const paperStyle = {
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#d4e7c5",
  };

  return (
    <Stack alignItems="center" style={paperStyle}>
      <Box
        sx={{
          position: "relative",
          marginTop: "2%",
          width: "100%",
          maxWidth: "500px",
          zIndex: 1,
          height: "auto",
          backgroundColor: "#FEFDED",
          padding: 4,
          borderRadius: "10px",
        }}
      >
        <Routes>
          <Route path="/admin" element={<AdminRegistration />} />
          <Route path="/student" element={<StudentRegistration />} />
        </Routes>
      </Box>
    </Stack>
  );
};

export default SignupTemp;
