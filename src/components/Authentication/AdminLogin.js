import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Link, NavLink } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [prn, setPrn] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = React.useState(true);

  const handleChange1 = (event) => {
    setChecked(event.target.checked);
    console.log(checked);
  };
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
      <FormControl component="fieldset">
        <FormControlLabel
          value="end"
          control={<Checkbox onChange={handleChange1} />}
          label="Remember Me"
          labelPlacement="end"
        />
      </FormControl>

      <Button variant="contained" width="100%" style={{ marginTop: "15px" }}>
        Login
      </Button>

      <Button
        variant="contained"
        width="100%"
        isLoading={loading}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
        style={{ marginTop: 5, backgroundColor: "#D24545" }}
      >
        Get Guest User Credentials
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
