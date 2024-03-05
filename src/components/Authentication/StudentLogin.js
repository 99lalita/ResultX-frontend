import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, NavLink } from "react-router-dom";

const StudentLogin = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [prn, setPrn] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
    }
  };

  return (
    <Stack>
      <TextField
        id="standard-basic"
        label="PRN No"
        variant="standard"
        placeholder="Enter Your PRN Number"
        value={prn}
        onChange={(e) => {
          setPrn(e.target.value);
        }}
        style={{ marginTop: 15 }}
        fullWidth
        required
      />
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
        onClick={submitHandler}
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

      <Button variant="contained" width="100%" style={{ marginTop: 25 }}>
        Login
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
    </Stack>
  );
};

export default StudentLogin;
