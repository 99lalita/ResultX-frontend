import { Avatar, Button, Input, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const AdminRegistration = () => {
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [prn, setPrn] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [picLoading, setPicLoading] = useState(false);

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
  const postDetails = async (pics) => {
    setPicLoading(true);
    console.log(pic);
    if (pic === undefined) {
      toast.warn("Please Select an Image!", {
        ...commonToastOptions,
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      //code
    } else {
      toast.warn("Please Select an Image!", {
        ...commonToastOptions,
      });
      setPicLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setPicLoading(true);
    if (!email || !password || !confirmpassword || !prn) {
      toast.warn("Please Fill all the Feilds", {
        ...commonToastOptions,
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast.warn("Passwords Do Not Match", {
        ...commonToastOptions,
      });
      return;
    }
    console.log(email, password, pic);
  };

  return (
    <>
      <Stack>
        <Stack alignItems={"center"}>
          <Avatar style={{ background: "#1bbd7e" }}>
            <AddCircleOutlineIcon />
          </Avatar>
          <h2 style={{ fontFamily: "Work sans" }}>Admin SignUp</h2>
        </Stack>

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
        <TextField
          id="standard-basic"
          variant="standard"
          label="Confirm Password"
          placeholder="Confirm password"
          type={show ? "text" : "password"}
          value={confirmpassword}
          style={{ marginTop: 15 }}
          onChange={(e) => {
            setConfirmpassword(e.target.value);
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

        {/* <Typography
          variant="h8"
          style={{ paddingLeft: 0, marginTop: 15, marginLeft: 0 }}
        >
          Upload Your Picture
        </Typography> */}
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          placeholder="Enter Your Email"
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
          style={{ marginTop: 28 }}
          fullWidth
          required
        />

        <Button
          variant="contained"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
        >
          Sign Up
        </Button>
        <ToastContainer />
      </Stack>
    </>
  );
};

export default AdminRegistration;
