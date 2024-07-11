import React from "react";
import ResultUploadForm from "../components/common/ResultUploadForm";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import ResultUploadModal from "../components/common/ResultUploadModal";
import BackendEndpoints from "../utils/BackendEndpoints";
import Cookies from "js-cookie";

const ThirdYearResultUpload = () => {
  const { student } = useTheme();
  const navigate = useNavigate();
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [tokens, setTokens] = useState({
    accessToken: Cookies.get(BackendEndpoints.AUTH_STUDENT_ACCESS_TOKEN),
    refreshToken: Cookies.get(BackendEndpoints.AUTH_STUDENT_REFRESH_TOKEN),
  });

  const handleSuccessClose = () => setSuccessModalOpen(false);
  const handleErrorClose = () => setErrorModalOpen(false);

  const refreshPage = () => {
    window.location.reload();
  };
  const handleSubmit = async (formData) => {
    console.log("Form submitted for third year:", formData);

    try {
      const response = await axios.post(
        BackendEndpoints.STUDENT_ACCOUNT_THIRDYEARRESULT_UPLOAD,
        formData,
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        }
      );
      console.log("Backend response:", response.data);
      if (response.data.message === "Access token expired") {
        refresh(tokens.refreshToken);
      } else {
        if (response.status === 200) {
          // toast.success("Result Data submitted successfully. Go to home page");
          // navigate(`/student/${student?.enrollment_id}/resultSuccess`);
          setSuccessModalOpen(true);
        } else {
          toast.error(response.data.message || "Unexpected response status");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 400) {
        // Handle incorrect result uploaded
        // toast.error(
        //   "Incorrect result uploaded. Please check and refresh the page."
        // );
        setErrorModalOpen(true);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };
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
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ToastContainer />
      <ResultUploadForm year="Third Year" onSubmit={handleSubmit} />
      <ResultUploadModal
        open={successModalOpen}
        handleClose={handleSuccessClose}
        message="You have successfully uploaded your result!!"
        buttonLabel="Home Page"
        buttonAction={() => navigate(`/student/${student.enrollment_id}/`)}
      />
      <ResultUploadModal
        open={errorModalOpen}
        handleClose={handleErrorClose}
        message="Incorrect result uploaded. Please check and refresh the page."
        buttonLabel="Refresh Page"
        buttonAction={refreshPage}
      />
    </div>
  );
};

export default ThirdYearResultUpload;
