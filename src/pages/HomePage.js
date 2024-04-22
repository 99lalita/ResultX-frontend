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
    // display: { xs: "block", md: "none", lg: "block" },
    marginTop: 50,
    position: "absolute",
    top: "50%",
    left: "80%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
  };

  return (
    <Stack alignItems="center" maxW="md">
      {/* <Paper
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
        <Typography variant="h4" fontFamily="Work sans" fontSize="2.25rem">
          APPLICATION
        </Typography>
      </Paper> */}
      <Box
        sx={{
          position: "relative",
          marginTop: "5%",
          // transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "400px",
          height: "auto",
          zIndex: 1,
          height: "3em",
        }}
      >
        {/* <Paper elevation={3} style={paperStyle}> */}
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
        {/* </Paper> */}
      </Box>
    </Stack>
  );
};

export default HomePage;
