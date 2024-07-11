import { Container, Typography, CircularProgress, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTypingEffect } from "../hooks/typing-effect";
import axios from "axios";
import FirstThreeYearResultFormat from "../components/common/FirstThreeYearResultFormat";
import FinalYearResultFormat from "../components/common/FinalYearResultFormat";
import MainNavbar from "../components/common/MainNavbar";
import { useTheme } from "../context/ThemeContext";
import BackendEndpoints from "../utils/BackendEndpoints";
import Cookies from "js-cookie";

const ResultPage = () => {
  const { batchYear, resultYear } = useParams();
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { admin, theme } = useTheme();
  const navigate = useNavigate();

  // Setting tokens
  const [tokens, setTokens] = useState({
    accessToken: Cookies.get(BackendEndpoints.AUTH_ADMIN_ACCESS_TOKEN),
    refreshToken: Cookies.get(BackendEndpoints.AUTH_ADMIN_REFRESH_TOKEN),
  });

  const yearNames = {
    0: "First",
    1: "Second",
    2: "Third",
    3: "Final",
  };

  const yearName = yearNames[resultYear];

  const heading = useTypingEffect(
    ` Displaying Result for Batch ${batchYear} - ${yearName} Year SEM-II`,
    10
  );

  // Function to refresh token
  const refresh = (refreshToken) => {
    console.log("Refreshing token!");
    axios
      .post(BackendEndpoints.REACT_APP_GET_REFRESH_AUTH_ADMIN_TOKEN_API, {
        token: tokens.refreshToken,
      })
      .then((res) => {
        if (res.data.success === false) {
          console.log("Login again");
          navigate("/");

          return;
        } else {
          const { accessToken } = res.data;
          Cookies.set(BackendEndpoints.AUTH_ADMIN_ACCESS_TOKEN, accessToken);
          setTokens({ ...tokens, accessToken: accessToken });
        }
      });
  };

  // Function to fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:9000/api/v2/admin/account/result/${batchYear}/${resultYear}`,
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        }
      );

      if (response.data.message === "Access token expired") {
        refresh(tokens.refreshToken);
      } else if (response.data.success === false) {
        // console.log(response.data.message);
        setError(response.data.message || "Failed to fetch result data");
      } else {
        setResultData(response.data);
      }
    } catch (error) {
      console.error("Error fetching result data:", error);
      setError("Failed to fetch result data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [batchYear, resultYear]);

  useEffect(() => {
    console.log(resultData);
  }, [resultData]);

  return (
    <>
      <MainNavbar userData={admin} userType={"admin"} />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          transition: "all linear 0.4s",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            marginTop: "100px",
            fontFamily: "Work Sans",
            fontWeight: "bold",
            fontSize: "30px",
          }}
          className="admin-result-heading"
        >
          {heading}
        </Typography>
        {/* Render loading state */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        )}
        {/* Render error state */}
        {/* {error && <Typography>Error: {error}</Typography>} */}

        {error && (
          <Typography
            sx={{
              marginTop: "50px",
              marginBottom: 2,
              padding: 2,
              background:
                theme === "dark"
                  ? "linear-gradient(135deg, #1f1e1e, #000814)"
                  : "linear-gradient(135deg, #f5e8dd, #ffffff)",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              alignSelf: "center",
              color: "#FF6347",
              fontWeight: "bold",
              fontSize: "1.25rem",
            }}
          >
            No student has entered data till now for this year.Please ask
            students to enter their data.
          </Typography>
        )}

        {resultData && (
          <>
            {resultYear < 3 ? (
              <FirstThreeYearResultFormat
                resultData={resultData}
                resultYear={resultYear}
                batchYear={batchYear}
              />
            ) : (
              <FinalYearResultFormat
                resultData={resultData}
                batchYear={batchYear}
                resultYear={resultYear}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default ResultPage;
