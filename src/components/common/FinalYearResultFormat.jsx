// import React from "react";
// import { Container, Button, Typography, Box } from "@mui/material";
// import * as XLSX from "xlsx";
// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";

// // const variants = {
// //   initial: {
// //     opacity: 0,
// //   },
// //   animate: {
// //     opacity: 1,
// //     transition: {
// //       duration: 1,
// //       staggerChildren: 0.1,
// //     },
// //   },
// // };

// // const variants = {
// //   initial: {
// //     x: 500,
// //     opacity: 0,
// //   },
// //   animate: {
// //     x: 0,
// //     // y: 8,
// //     opacity: 1,
// //     transition: {
// //       duration: 1,
// //       staggerChildren: 0.1,
// //     },
// //   },
// // };

// const variants = {
//   initial: {
//     opacity: 0,
//     scale: 0.8,
//     rotate: -45,
//   },
//   animate: {
//     opacity: 1,
//     scale: 1,
//     rotate: 0,
//     transition: {
//       duration: 0.5,
//       ease: "easeInOut",
//     },
//   },
// };

// const FinalYearResultFormat = ({ resultData, resultYear, batchYear }) => {
//   console.log(resultData.data.results);
//   const ref = useRef();
//   const isInView = useInView(ref, { threshold: 0.5 });
//   const yearNames = {
//     0: "First Year ",
//     1: "Second Year",
//     2: "Third Year ",
//     3: "Final Year ",
//   };

//   const yearName = yearNames[resultYear];
//   const handleDownloadExcel = () => {
//     // Check if resultData exists and is an array
//     if (resultData && Array.isArray(resultData.data.results)) {
//       const data = resultData.data.results;

//       // Proceed with generating the Excel sheet
//       const sheet = XLSX.utils.json_to_sheet(data);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, sheet, "Results");
//       const filename = `results_Batch_${batchYear}_${yearName}.xlsx`;
//       XLSX.writeFile(workbook, filename);
//     } else {
//       console.error("Invalid data format for Excel download");
//     }
//   };

//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <motion.div
//         style={{
//           marginTop: "150px",
//           textAlign: "center",
//           display: "flex",
//           flexDirection: "column",
//           gap: "10px",
//         }}
//         ref={ref}
//         initial="initial"
//         animate={isInView ? "animate" : "initial"}
//         variants={variants}
//       >
//         <Button
//           variant="contained"
//           onClick={handleDownloadExcel}
//           sx={{ width: "50%", fontFamily: "Gilroy", alignSelf: "center" }}
//           variants={variants}
//         >
//           Download Result
//         </Button>

//         {resultData && resultData.data.numberOfStudents && (
//           <Typography
//             variant="body1"
//             mt={2}
//             sx={{
//               fontSize: "20px",
//               fontFamily: "Montserrat",
//               fontWeight: "bold",
//             }}
//             variants={variants}
//           >
//             Number of Students with Backlog:
//             {resultData.data.numberOfStudents.withBacklog}
//           </Typography>
//         )}

//         {resultData && resultData.data.numberOfStudents && (
//           <Typography
//             variant="body1"
//             sx={{
//               fontSize: "20px",
//               fontFamily: "Montserrat",
//               fontWeight: "bold",
//             }}
//             variants={variants}
//           >
//             Number of Students without Backlog:
//             {resultData.data.numberOfStudents.withoutBacklog}
//           </Typography>
//         )}
//         {resultData && resultData.data.numberOfStudents && (
//           <Typography
//             variant="body1"
//             sx={{
//               fontSize: "20px",
//               fontFamily: "Montserrat",
//               fontWeight: "bold",
//             }}
//             variants={variants}
//           >
//             Total Number Of Students in:
//             {resultData.data.numberOfStudents.totalStudents}
//           </Typography>
//         )}
//         {resultData && resultData.data.numberOfStudents && (
//           <Typography
//             variant="body1"
//             sx={{
//               fontSize: "20px",
//               fontFamily: "Montserrat",
//               fontWeight: "bold",
//             }}
//             variants={variants}
//           >
//             Number of Fail Students:{" "}
//             {resultData.data.numberOfStudents.failStudents}
//           </Typography>
//         )}
//         {resultData && resultData.data.numberOfStudents && (
//           <Typography
//             variant="body1"
//             sx={{
//               fontSize: "20px",
//               fontFamily: "Montserrat",
//               fontWeight: "bold",
//             }}
//             variants={variants}
//           >
//             API for {yearName} : {resultData.data.numberOfStudents.API}
//           </Typography>
//         )}
//       </motion.div>
//     </Container>
//   );
// };

// export default FinalYearResultFormat;

import React from "react";
import {
  Container,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Paper,
  Divider,
  Tooltip,
  Grid,
} from "@mui/material";
import * as XLSX from "xlsx";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import SchoolIcon from "@mui/icons-material/School";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const variants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 10,
      duration: 0.5,
      delay: 0.1,
    },
  },
};

const FourthYearResultFormat = ({ resultData, resultYear, batchYear }) => {
  const ref = useRef();
  const isInView = useInView(ref, { threshold: 0.5 });

  const handleDownloadExcel = () => {
    if (resultData && Array.isArray(resultData.data.results)) {
      const data = resultData.data.results;

      const sheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, sheet, "Results");
      const filename = `results_Batch_${batchYear}_FourthYear.xlsx`;
      XLSX.writeFile(workbook, filename);
    } else {
      console.error("Invalid data format for Excel download");
    }
  };

  // const chartData = {
  //   labels: ["With Backlog", "Without Backlog", "Total Students"],
  //   datasets: [
  //     {
  //       label: "Number of Students",
  //       data: [
  //         resultData.data.numberOfStudents.withBacklog,
  //         resultData.data.numberOfStudents.withoutBacklog,
  //         resultData.data.numberOfStudents.totalStudents,
  //       ],
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(54, 162, 235, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Student Distribution for Fourth Year",
  //     },
  //   },
  // };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, transition: "all linear 0.4s" }}>
      <motion.div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
        ref={ref}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={variants}
      >
        <Tooltip title="Download the results as an Excel file" arrow>
          <Button
            variant="contained"
            onClick={handleDownloadExcel}
            sx={{
              width: "30%",
              fontFamily: "Gilroy",
              alignSelf: "center",
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#115293" },
            }}
          >
            Download Result
          </Button>
        </Tooltip>

        <Box sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4, backgroundColor: "#f5f5f5" }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                color: "#3f51b5",
              }}
            >
              Result Overview
            </Typography>
            <Divider sx={{ mb: 4 }} />

            <Grid container spacing={3}>
              {resultData && resultData.data.numberOfStudents && (
                <>
                  <Grid item xs={12} md={6}>
                    <motion.div variants={variants}>
                      <Card
                        variant="outlined"
                        sx={{
                          boxShadow: 3,
                          background:
                            "linear-gradient(45deg, #29b6f6 30%, #0288d1 90%)",
                          color: "white",
                          "&:hover": {
                            transform: "scale(1.05)",
                            transition: "transform 0.3s ease-in-out",
                          },
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{
                              fontFamily: "Montserrat",
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <SchoolIcon sx={{ mr: 1 }} />
                            Total Number Of Students
                          </Typography>
                          <Typography variant="body1">
                            {resultData.data.numberOfStudents.totalStudents}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                  {/* <Grid item xs={12} md={6}>
                    <motion.div variants={variants}>
                      <Card
                        variant="outlined"
                        sx={{
                          boxShadow: 3,
                          background:
                            "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                          color: "white",
                          "&:hover": {
                            transform: "scale(1.05)",
                            transition: "transform 0.3s ease-in-out",
                          },
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{
                              fontFamily: "Montserrat",
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <ErrorIcon sx={{ mr: 1 }} />
                            Students with Backlog
                          </Typography>
                          <Typography variant="body1">
                            {resultData.data.numberOfStudents.withBacklog}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid> */}
                  <Grid item xs={12} md={6}>
                    <motion.div variants={variants}>
                      <Card
                        variant="outlined"
                        sx={{
                          boxShadow: 3,
                          background:
                            "linear-gradient(45deg, #66bb6a 30%, #43a047 90%)",
                          color: "white",
                          "&:hover": {
                            transform: "scale(1.05)",
                            transition: "transform 0.3s ease-in-out",
                          },
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{
                              fontFamily: "Montserrat",
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <CheckCircleIcon sx={{ mr: 1 }} />
                            Successfully Passed Students
                          </Typography>
                          <Typography variant="body1">
                            {
                              resultData.data.numberOfStudents
                                .sucessfullyPassedStudents
                            }
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <motion.div variants={variants}>
                      <Card
                        variant="outlined"
                        sx={{
                          boxShadow: 3,
                          background:
                            "linear-gradient(45deg, #ff7043 30%, #ff5722 90%)",
                          color: "white",
                          "&:hover": {
                            transform: "scale(1.05)",
                            transition: "transform 0.3s ease-in-out",
                          },
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{
                              fontFamily: "Montserrat",
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <ErrorIcon sx={{ mr: 1 }} />
                            Fail Students(among all year)
                          </Typography>
                          <Typography variant="body1">
                            {resultData.data.numberOfStudents.failStudents}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                </>
              )}
            </Grid>

            {/* <Box sx={{ mt: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  color: "#3f51b5",
                }}
              >
                Yearly Student Distribution
              </Typography>
              <Bar data={chartData} options={chartOptions} />
            </Box> */}
          </Paper>
        </Box>
      </motion.div>
    </Container>
  );
};

export default FourthYearResultFormat;
