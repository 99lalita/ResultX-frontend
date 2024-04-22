import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  const commonToastOptions = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.warn("Please fill all the fields!", {
        ...commonToastOptions,
      });
      setLoading(false);
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      toast.error("Please enter a valid Gmail address", {
        ...commonToastOptions,
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/auth/student/login",
        { email, password },
        config
      );
      // Extract the tokens from the response data
      const { loginAuthToken, refreshAuthToken } = data;

      // Set the tokens in cookies
      document.cookie = `loginAuthToken=${loginAuthToken}; path=/`;
      document.cookie = `refreshAuthToken=${refreshAuthToken}; path=/`;
      navigate("/aboutpage");
      toast.warn("Login Successfull!", {
        ...commonToastOptions,
      });
      setLoading(false);
      // navigate("/xyz");
    } catch (error) {
      toast.error("Error Occured!", {
        ...commonToastOptions,
      });
      setLoading(false);
    }
  };

  return (
    <Stack>
      <TextField
        id="standard-basic"
        label="Email"
        variant="standard"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        style={{ marginTop: 15 }}
        fullWidth
        required
      />

      <TextField
        id="standard-basic"
        variant="standard"
        label="Password"
        placeholder="Enter password"
        type={show ? "text" : "password"}
        value={password}
        style={{ marginTop: 15 }}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        fullWidth
        required
        InputProps={{
          endAdornment: (
            <>
              {show ? (
                <VisibilityOffIcon
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <VisibilityIcon
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                />
              )}
            </>
          ),
        }}
      />

      <Button
        variant="contained"
        width="100%"
        onClick={submitHandler}
        style={{ marginTop: 25 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>
      <Typography>
        <Link href="#" style={{ textDecoration: "none" }}>
          Forgot password ?
        </Link>
      </Typography>

      <p>
        Don't have an account?{" "}
        <NavLink to={`/signup/student`} style={{ textDecoration: "none" }}>
          Signup
        </NavLink>
      </p>
      <ToastContainer />
    </Stack>
  );
};

export default StudentLogin;
