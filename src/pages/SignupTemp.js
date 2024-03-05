import React, { useState } from "react";
import { Box, Grid, Paper, Stack, Typography, Tab, Tabs } from "@mui/material";
import AdminRegistration from "../components/Authentication/AdminRegistration";
import StudentRegistration from "../components/Authentication/StudentRegistration";
import { Route, Routes } from "react-router-dom";

const SignupTemp = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: "28%",
    margin: "20px auto",
    borderWidth: "2px",
    // border: "1px solid black",
    borderRadius: "10px",
  };

  return (
    <Stack alignItems="center">
      <Paper elevation={4} style={paperStyle}>
        <Routes>
          <Route path="/admin" element={<AdminRegistration />} />
          <Route path="/student" element={<StudentRegistration />} />
        </Routes>
      </Paper>
    </Stack>
  );
};

export default SignupTemp;
