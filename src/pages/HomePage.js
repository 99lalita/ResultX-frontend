import React, { useState } from "react";
import { Box, Grid, Paper, Stack, Typography, Tab, Tabs } from "@mui/material";
import { useTheme } from "@emotion/react";
import AdminLogin from "../components/Authentication/AdminLogin";
import StudentLogin from "../components/Authentication/StudentLogin";

const HomePage = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: "30%",
    // margin: "10px auto",
    borderRadius: "10px",
    display: { xs: "block", md: "none", lg: "block" },
  };

  return (
    <Stack alignItems="center" maxW="md">
      <Paper
        elevation={3}
        style={{
          height: "40px",
          width: "30%",
          padding: 20,
          display: "flex",
          justifyContent: "center",
          margin: "10px auto",
          textAlign: "center",
          borderRadius: "10px",
          background: "white",
        }}
      >
        {/* <Box> */}
        <Typography variant="h4" fontFamily="Work sans" fontSize="2.25rem">
          APPLICATION
        </Typography>
        {/* </Box> */}
      </Paper>
      {/* <Box> */}
      <Paper elevation={3} style={paperStyle}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          centered
        >
          <Tab label="Student" />
          <Tab label="Admin" />
        </Tabs>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <StudentLogin />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <AdminLogin />
        </TabPanel>
      </Paper>
      {/* </Box> */}
    </Stack>
  );
};

export default HomePage;
