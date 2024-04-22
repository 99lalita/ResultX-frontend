import React, { useState } from "react";
import { Box, Grid, Paper, Stack, Typography, Tab, Tabs } from "@mui/material";
import AdminRegistration from "../components/Authentication/AdminRegistration";
import StudentRegistration from "../components/Authentication/StudentRegistration";
import { Route, Routes } from "react-router-dom";

const SignupTemp = () => {
  const paperStyle = {
    padding: 20,
    height: "85vh",
    width: "28%",
    margin: "60px auto",
    borderWidth: "2px",
    // border: "1px solid black",
    borderRadius: "10px",
  };

  return (
    <Stack alignItems="center">
      <Box
        sx={{
          position: "relative",
          marginTop: "2%",
          // transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "400px",
          zIndex: 1,
          height: "auto",
          backgroundColor: "white",
          padding: 3,
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
