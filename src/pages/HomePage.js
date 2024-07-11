import React, { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import StudentLogin from "../components/Authentication/StudentLogin";
import AdminLogin from "../components/Authentication/AdminLogin";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="HomePage">
      <Typography
        variant="h4"
        noWrap
        align="center"
        style={{
          fontSize: "45px",
          fontFamily: "cursive",
          letterSpacing: ".1rem",
          fontWeight: 900,
          color: "#527853",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",

          paddingTop: "100px",
        }}
      >
        Result X
      </Typography>
      <Stack alignItems="center" maxW="md">
        <Box
          sx={{
            bgcolor: "background.paper",

            borderRadius: "5px",
            position: "relative",
            marginTop: "1%",
            width: "80%",
            maxWidth: "400px",
            zIndex: 1,
            height: "3em",
          }}
        >
          <AppBar
            position="static"
            sx={{
              bgcolor: "#75A47F",
              marginBottom: "10px",
              borderRadius: "5px",
              height: "60px",
              border: "1px solid #4F6F52",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              height="60px"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Student" {...a11yProps(0)} />
              <Tab label="Admin" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <Stack
            sx={{
              border: "1px solid #BACD92",
              borderRadius: "9px",
              bgcolor: "#FEFDED",
            }}
          >
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <StudentLogin />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <AdminLogin />
              </TabPanel>
            </SwipeableViews>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
