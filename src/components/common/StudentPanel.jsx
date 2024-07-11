import {
  Box,
  Button,
  Container,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useTypingEffect } from "../../hooks/typing-effect";
import { makeStyles } from "@mui/styles";
import BackendEndpoints from "../../utils/BackendEndpoints";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  disabledAccordion: {
    backgroundColor: "#F1F1F1",
    color: "black",
    "& .MuiAccordionSummary-root": {
      backgroundColor: "#F1F1F1",
    },
  },
}));
const StudentPanel = () => {
  const { theme, student } = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();

  const [firstYearResult, setFirstYearResult] = useState(null);
  const [secondYearResult, setSecondYearResult] = useState(null);
  const [thirdYearResult, setThirdYearResult] = useState(null);
  const [finalYearResult, setFinalYearResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Make sure student is defined before accessing its properties
  // console.log(student);
  // console.log(student.enrollment_id);
  // console.log(student.isDSY);
  // console.log(student.graduation_year);
  const firstName = student ? student.first_name : "";
  const lastName = student ? student.last_name : "";
  const currentYear = student ? student.current_year : "";

  // Animation
  const infoText = useTypingEffect(
    `Welcome Back ${firstName} ${lastName}...`,
    10
  );

  let currentYearMapping =
    currentYear === 1
      ? "First Year"
      : currentYear === 2
      ? "Second Year"
      : currentYear === 3
      ? "Third Year"
      : "Final Year";
  // Animation
  const currentYearText = useTypingEffect(
    `Current Year : ${currentYearMapping}`,
    200
  );

  // Function to check if a year is in the future based on current year of the student
  const isFutureYear = (year) => {
    // console.log(year);
    // console.log(student?.current_year);
    return year > student?.current_year;
  };

  const viewResultURL = `/student/${student?.enrollment_id}/view-result`;

  const firstYearResultUploadURL = `/student/${student?.enrollment_id}/upload-first-year-result`;
  const secondYearResultUploadURL = `/student/${student?.enrollment_id}/upload-second-year-result`;
  const thirdYearResultUploadURL = `/student/${student?.enrollment_id}/upload-third-year-result`;
  const finalYearResultUploadURL = `/student/${student?.enrollment_id}/upload-fourth-year-result`;

  // Setting tokens
  const [tokens, setTokens] = useState({
    accessToken: Cookies.get(BackendEndpoints.AUTH_STUDENT_ACCESS_TOKEN),
    refreshToken: Cookies.get(BackendEndpoints.AUTH_STUDENT_REFRESH_TOKEN),
  });

  // console.log(tokens.accessToken);
  // console.log(tokens.refreshToken);

  // code to generate Refresh Token
  const refresh = (refreshToken) => {
    console.log("Refreshing token!");
    axios
      .post(BackendEndpoints.REACT_APP_GET_REFRESH_AUTH_STUDENT_TOKEN_API, {
        token: tokens.refreshToken,
      })
      .then((res) => {
        if (res.data.success === false) {
          console.log("Login again");
          navigate("/");
          // set message and return.
          return;
        } else {
          const { accessToken } = res.data;
          Cookies.set(BackendEndpoints.AUTH_STUDENT_ACCESS_TOKEN, accessToken);
          setTokens({ ...tokens, accessToken: accessToken });
        }
      });
  };

  // Request to backend to fetch Data for all Years for a particular student
  const fetchYearResult = async (year) => {
    if (!navigator.onLine) {
      alert("You are offline. Please connect to the internet to fetch data.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:9000/api/v2/student/result/retrieve/${year}`,
        {
          enrollment_id: student.enrollment_id,
          graduation_year: student.graduation_year,
        },
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        }
      );

      if (response.data.message === "Access token expired") {
        refresh(tokens.refreshToken);
      } else {
        // console.log(response);
        return response.data;
      }
    } catch (error) {
      // Handle errors
      console.error("Error fetching year result:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // fetch result data for each year when component mounts
    const fetchData = async () => {
      try {
        if (student) {
          const firstYearData = await fetchYearResult(1);
          setFirstYearResult(firstYearData);
          const secondYearData = await fetchYearResult(2);
          setSecondYearResult(secondYearData);
          const thirdYearData = await fetchYearResult(3);
          setThirdYearResult(thirdYearData);
          const finalYearData = await fetchYearResult(4);
          setFinalYearResult(finalYearData);
        }
      } catch (error) {
        console.error("Error fetching result data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [student]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        marginTop: "80px",
        // backgroundColor: "red",
        transition: "all linear 0.2s",
      }}
    >
      {/* General Text */}
      <Box
        className="student-panel-GeneralText"
        sx={{
          marginTop: "20px",
          marginBottom: "30px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // backgroundColor: "red",
        }}
      >
        <Box
          sx={{ fontSize: "30px", fontWeight: "bold" }}
          className="student-panel-GeneralTextHeading"
        >
          {/* <ReactTypingEffectDemo
            first_name={useData.first_name}
            last_name={useData.last_name}
            current_year={useData.current_year}
          ></ReactTypingEffectDemo> */}
          {infoText}
        </Box>
        <Box
          sx={{ fontSize: "30px", fontWeight: "bold" }}
          className="student-panel-GeneralTextHeading"
        >
          {currentYearText}
        </Box>
      </Box>
      {/* first Year Accordian */}
      {student?.isDSY === true ? (
        <Tooltip title="You are not supposed to Upload Result for First Year">
          <Accordion
            disabled
            className={classes.disabledAccordion}
            sx={{
              width: "100%",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                sx={{
                  backgroundImage:
                    "linear-gradient(to bottom, #200E3A, #163020, #F6D6D6)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  fontSize: "20px",
                  color: "transparent",
                  fontFamily: "Be Vietnam Pro",
                }}
              >
                First Year Result
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {firstYearResult ? (
                <Typography>{/* Render result data */}</Typography>
              ) : (
                <Typography>No result uploaded for first year</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Tooltip>
      ) : (
        <Accordion
          disabled={isFutureYear(1)}
          className={isFutureYear(1) ? classes.disabledAccordion : ""}
          sx={{
            marginTop: "50px",
            width: "100%",
            bgcolor: theme === "dark" ? "#B5C0D0" : "#f5e8dd",
            color: theme === "dark" ? "#222" : "#333333",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography
              sx={{
                backgroundImage:
                  "linear-gradient(to bottom, #200E3A, #163020, #F6D6D6)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                fontSize: "20px",
                color: "transparent",
                fontFamily: "Be Vietnam Pro",
              }}
            >
              First Year Result
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Typography>
                {firstYearResult && firstYearResult.result ? (
                  // Render result data if available
                  <Box
                    className="Accordian-status-container"
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>
                      You have Uploaded the Data for First Year
                    </Typography>
                    <Link
                      to={viewResultURL}
                      state={{
                        resultData: firstYearResult,
                        resultName: "First Year Result",
                      }}
                    >
                      <Button variant="contained">View</Button>
                    </Link>
                  </Box>
                ) : (
                  // Render upload result page if no result data

                  <Box
                    className="Accordian-status-container"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      //   flexDirection: "column",
                    }}
                  >
                    <Typography>
                      You have not uploaded Your First Year Result
                    </Typography>
                    <Link
                      to={firstYearResultUploadURL}
                      state={{
                        resultData: firstYearResult,
                        resultName: "First Year Result",
                      }}
                    >
                      <Button variant="contained">Upload</Button>
                    </Link>
                  </Box>
                )}
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      )}
      {/* second Year Accordian */}
      <Accordion
        disabled={isFutureYear(2)}
        className={isFutureYear(2) ? classes.disabledAccordion : ""}
        sx={{
          marginTop: "10px",
          width: "100%",
          bgcolor: theme === "dark" ? "#B5C0D0" : "#f5e8dd",
          color: theme === "dark" ? "#222" : "#333333",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography
            sx={{
              backgroundImage:
                "linear-gradient(to bottom, #200E3A, #163020, #F6D6D6)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              fontSize: "20px",
              color: "transparent",
              fontFamily: "Be Vietnam Pro",
            }}
          >
            Second Year Result
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Typography>
              {secondYearResult && secondYearResult.result ? (
                // Render result data if available
                <Box
                  className="Accordian-status-container"
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>
                    You have Uploaded the Data for Second Year
                  </Typography>
                  <Link
                    to={viewResultURL}
                    state={{
                      resultData: secondYearResult,
                      previousResultData: firstYearResult,
                      resultName: "Second Year Result",
                    }}
                  >
                    <Button variant="contained">View</Button>
                  </Link>
                </Box>
              ) : (
                // Render upload result page if no result data

                <Box
                  className="Accordian-status-container"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    //   flexDirection: "column",
                  }}
                >
                  <Typography>
                    You have not uploaded Your Second Year Result
                  </Typography>
                  <Link
                    to={secondYearResultUploadURL}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="contained">Upload</Button>
                  </Link>
                </Box>
              )}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
      {/* third Year Accordian */}
      <Accordion
        disabled={isFutureYear(3)}
        className={isFutureYear(3) ? classes.disabledAccordion : ""}
        sx={{
          marginTop: "10px",
          width: "100%",
          bgcolor: theme === "dark" ? "#B5C0D0" : "#f5e8dd",
          color: theme === "dark" ? "#222" : "#333333",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography
            sx={{
              backgroundImage:
                "linear-gradient(to bottom, #200E3A, #163020, #F6D6D6)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              fontSize: "20px",
              color: "transparent",
              fontFamily: "Be Vietnam Pro",
            }}
          >
            Third Year Result
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Typography>
              {thirdYearResult && thirdYearResult.result ? (
                // Render result data if available
                <Box
                  className="Accordian-status-container"
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>
                    You have Uploaded the Data for Third Year
                  </Typography>
                  <Link
                    to={viewResultURL}
                    state={{
                      resultData: thirdYearResult,
                      previousResultData: secondYearResult,
                      resultName: "Third Year Result",
                    }}
                  >
                    <Button variant="contained">View</Button>
                  </Link>
                </Box>
              ) : (
                // Render upload result page if no result data

                <Box
                  className="Accordian-status-container"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    //   flexDirection: "column",
                  }}
                >
                  <Typography>
                    You have not uploaded Your Third Year Result
                  </Typography>
                  <Link
                    to={thirdYearResultUploadURL}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="contained">Upload</Button>
                  </Link>
                </Box>
              )}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
      {/* Final Year Accordian */}
      <Tooltip
        title={
          isFutureYear(4) ? `You are currently in ${currentYearMapping}.` : ""
        }
      >
        <Accordion
          disabled={isFutureYear(4)}
          className={isFutureYear(4) ? classes.disabledAccordion : ""}
          sx={{
            marginTop: "10px",
            width: "100%",
            bgcolor: theme === "dark" ? "#B5C0D0" : "#f5e8dd",
            color: theme === "dark" ? "#222" : "#333333",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography
              sx={{
                backgroundImage:
                  "linear-gradient(to bottom, #200E3A, #163020, #F6D6D6)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                fontSize: "20px",
                color: "transparent",
                fontFamily: "Be Vietnam Pro",
              }}
            >
              Final Year Result
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Typography>
                {finalYearResult && finalYearResult.result ? (
                  // Render result data if available
                  <Box
                    className="Accordian-status-container"
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>
                      You have Uploaded the Data for Final Year
                    </Typography>
                    <Link
                      to={viewResultURL}
                      state={{
                        resultData: finalYearResult,
                        previousResultData: thirdYearResult,
                        resultName: "Final Year Result",
                      }}
                    >
                      <Button variant="contained">View</Button>
                    </Link>
                  </Box>
                ) : (
                  // Render upload result page if no result data

                  <Box
                    className="Accordian-status-container"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      //   flexDirection: "column",
                    }}
                  >
                    <Typography>
                      You have not uploaded Your Final Year Result
                    </Typography>
                    <Link
                      to={finalYearResultUploadURL}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained">Upload</Button>
                    </Link>
                  </Box>
                )}
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      </Tooltip>
    </Container>
  );
};

export default StudentPanel;
