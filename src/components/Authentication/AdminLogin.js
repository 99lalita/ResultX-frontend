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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import BackendEndpoints from "../../utils/BackendEndpoints";

const AdminLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.warn("Please fill all the fields!");
      setLoading(false);
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        BackendEndpoints.REACT_APP_ADMIN_LOGIN_API,
        {
          email,
          account_password: password,
        }
      );

      if (data.status === 200) {
        // Set user information and tokens in cookies
        console.log(data);
        Cookies.set("adminInfo", JSON.stringify(data.result));
        Cookies.set(
          BackendEndpoints.AUTH_ADMIN_ACCESS_TOKEN,
          data.loginAuthToken
        );
        Cookies.set(
          BackendEndpoints.AUTH_ADMIN_REFRESH_TOKEN,
          data.refreshAuthToken
        );

        toast.success("Login Successful!");
        setLoading(false);
        navigate(`/admin/${data.result.admin_id}`);
      } else {
        toast.error(data.message);
        setEmail("");
        setPassword("");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error Occurred!");
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <Stack>
      <TextField
        id="standard-basic"
        variant="standard"
        label="Email"
        placeholder={"Enter Your Email"}
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
        placeholder={"Enter password"}
        type={show ? "text" : "password"}
        value={password}
        style={{ marginTop: 20 }}
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
        style={{ marginTop: "15px", marginBottom: "10px" }}
      >
        {loading ? <CircularProgress /> : "Login"}
      </Button>

      <Typography>
        <Link href="#" style={{ textDecoration: "none" }}>
          Forgot password ?
        </Link>
      </Typography>

      <p>
        Don't have an account?{" "}
        <NavLink to={`/signup/admin`} style={{ textDecoration: "none" }}>
          Signup
        </NavLink>
      </p>
    </Stack>
  );
};

export default AdminLogin;
