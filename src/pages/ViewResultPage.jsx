import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Link,
  Box,
  CircularProgress,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useTypingEffect } from "../hooks/typing-effect";
import { useTheme } from "../context/ThemeContext";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import MainNavbar from "../components/common/MainNavbar";
import InsightComponent from "../components/common/Insights";

const ViewResultPage = () => {
  const { theme, student } = useTheme();
  const location = useLocation();
  const { resultData, resultName, previousResultData } = location.state;
  // console.log(previousResultData);
  // console.log(previousResult);
  // console.log(resultName);

  const previousResult = previousResultData?.result || null;
  const result = resultData?.result[0];

  const HeadingText = useTypingEffect(resultName, 50);

  const [insights, setInsights] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    setDataLoaded(true);
    if (result && result?.ResultPDF) {
      setPdfUrl(result?.ResultPDF);
    } else {
      toast.warning("PDF is Unable to Fetch!");
    }
    analyzeResults(previousResult);
    // eslint-disable-next-line
  }, [result]);

  const handlePDFClick = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    } else {
      toast.error("No PDF Available");
    }
  };

  const analyzeResults = (previousResult) => {
    if (resultName === "First Year Result") {
      setInsights("All the best");
      return;
    }

    if (!previousResult || previousResult.length === 0) {
      setInsights("Fill previous year data");
      return;
    }

    const currentPercentage = parseFloat(result?.percentage);
    const previousPercentage = parseFloat(
      previousResult[previousResult.length - 1]?.percentage
    );

    let insightMessage = "";

    if (currentPercentage > previousPercentage) {
      insightMessage = "Great improvement compared to last year!";
    } else if (currentPercentage < previousPercentage) {
      insightMessage =
        "Your performance has declined compared to last year. Keep pushing!";
    } else {
      insightMessage = "Your performance is consistent with last year.";
    }

    setInsights(insightMessage);
  };

  const renderTableContent = () => {
    if (!dataLoaded) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      );
    }

    return (
      <Table
        className="view-result-table"
        style={{
          border: theme === "dark" ? "1px solid white" : "1px solid black",
          borderRadius: "12px",
          background: theme === "dark" ? "#1f1e1e" : "#f5e8dd",
        }}
      >
        <Thead>
          <Tr
            className="view-result-table-head-row"
            style={{
              display: "flex",
              gap: "1.25rem",
              borderRadius: "0.375rem 0.375rem 0 0",
              borderBottom: "1px solid #1F2937",
              padding: "0.75rem 1.5rem",
              background: theme === "dark" ? "#333" : "#ddd",
            }}
          >
            <Th
              style={{
                flex: "1",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "bolder",
                textTransform: "uppercase",
              }}
            >
              Result Id
            </Th>
            <Th
              style={{
                flex: "1",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "bolder",
                textTransform: "uppercase",
              }}
            >
              Student Id
            </Th>
            <Th
              style={{
                flex: "1",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "bolder",
                textTransform: "uppercase",
              }}
            >
              Graduation Year
            </Th>
            <Th
              style={{
                flex: "1",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "bolder",
                textTransform: "uppercase",
              }}
            >
              Percentage
            </Th>
            <Th
              style={{
                flex: "1",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "bolder",
                textTransform: "uppercase",
              }}
            >
              CGPA
            </Th>
            <Th
              style={{
                flex: "1",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "bolder",
                textTransform: "uppercase",
              }}
            >
              Marks Obtained
            </Th>
            <Th
              style={{
                flex: "1",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "bolder",
                textTransform: "uppercase",
              }}
            >
              Result Status
            </Th>
            {pdfUrl && (
              <Th
                style={{
                  flex: "1",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  fontWeight: "bolder",
                  textTransform: "uppercase",
                }}
              >
                Result PDF
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          <Tr
            className="view-result-table-body-row"
            style={{
              display: "flex",
              gap: "1.25rem",
              borderRadius: "0.375rem 0.375rem 0 0",
              borderBottom: "1px solid #1F2937",
              padding: "0.75rem 1.5rem",
            }}
          >
            <Td
              style={{
                flex: "1",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "bold",
              }}
            >
              {result?.ResultID}
            </Td>
            <Td
              style={{
                flex: "1",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "bold",
              }}
            >
              {result?.StudentID}
            </Td>
            <Td
              style={{
                flex: "1",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "bold",
              }}
            >
              {result?.Graduation_Year}
            </Td>
            <Td
              style={{
                flex: "1",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "bold",
              }}
            >
              {result?.percentage}
            </Td>
            <Td
              style={{
                flex: "1",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "bold",
              }}
            >
              {result?.CGPA}
            </Td>
            <Td
              style={{
                flex: "1",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "bold",
              }}
            >
              {result?.Marks_Obtained}
            </Td>
            <Td
              style={{
                flex: "1",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "bold",
              }}
            >
              {result?.resultStatus}
            </Td>
            <Td
              style={{
                flex: "1",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "bold",
              }}
            >
              {pdfUrl && (
                <Link onClick={handlePDFClick} style={{ cursor: "pointer" }}>
                  Click Here
                </Link>
              )}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    );
  };

  return (
    <>
      <MainNavbar userType={"student"} userData={student} />
      <Container
        className="view-result-container"
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          margin: "auto",
          transition: "all linear 0.3s",
          mt: "100px",
          background:
            theme === "dark"
              ? "linear-gradient(135deg, #1f1e1e, #000814)"
              : "linear-gradient(135deg, #f5e8dd, #ffffff)",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: theme === "dark" ? "0 0 10px #000" : "0 0 10px #ddd",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Work Sans",
            color: theme === "dark" ? "#ffffff" : "#333333",
            transition: "all linear 0.4s",
            fontWeight: "600",
          }}
          className="view-result-heading"
        >
          {HeadingText}
        </Typography>

        {renderTableContent()}
        {/* <Typography variant="h6">{insights}</Typography> */}
      </Container>

      <Container
        className="view-result-container"
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          margin: "auto",
          transition: "all linear 0.3s",
          mt: "100px",
          background:
            theme === "dark"
              ? "linear-gradient(135deg, #1f1e1e, #000814)"
              : "linear-gradient(135deg, #f5e8dd, #ffffff)",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: theme === "dark" ? "0 0 10px #000" : "0 0 10px #ddd",
        }}
      >
        <InsightComponent insights={insights} />
      </Container>
    </>
  );
};

export default ViewResultPage;
