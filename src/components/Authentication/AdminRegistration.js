import {
  Avatar,
  Button,
  CircularProgress,
  Input,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import axios from "axios";
import { Checkbox, FormControlLabel } from "@mui/material";

const AdminRegistration = () => {
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [account_password, setAccountPassword] = useState();
  const [admin_id, setAdminId] = useState();
  const [profileImageURI, setProfileImageURI] = useState();
  const [show, setShow] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const [isHOD, setisHOD] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };
  const handleCheckboxChange = (event) => {
    setisHOD(event.target.checked);
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
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dcr0wpqcw");
      fetch("https://api.cloudinary.com/v1_1/dcr0wpqcw/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setProfileImageURI(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
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
    if (
      !email ||
      !account_password ||
      !confirmpassword ||
      !admin_id ||
      !first_name ||
      !last_name ||
      !profileImageURI
    ) {
      toast.warn("Please Fill all the Feilds", {
        ...commonToastOptions,
      });
      setPicLoading(false);
      return;
    }
    if (account_password !== confirmpassword) {
      toast.warn("Passwords Do Not Match", {
        ...commonToastOptions,
      });
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      toast.error("Please enter a valid Gmail address", {
        ...commonToastOptions,
      });
      return;
    }
    console.log(email, account_password, profileImageURI);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/auth/admin/signup",
        {
          admin_id,
          first_name,
          last_name,
          account_password,
          email,
          profileImageURI,
          isHOD,
        },
        config
      );
      console.log(data);
      toast.warn("Registration Successful", {
        ...commonToastOptions,
      });
      setPicLoading(false);
      // history.push("/chats");
    } catch (error) {
      toast.warn("Error Occured!", {
        ...commonToastOptions,
      });
      setPicLoading(false);
    }
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
          value={admin_id}
          onChange={(e) => {
            const input = e.target.value;
            if (/^\d{0,10}$/.test(input)) {
              // Check if the input contains only digits and is at most 10 characters long
              setAdminId(input);
            }
          }}
          inputProps={{ maxLength: 10 }} // Limit the maximum input length to 10 characters
          style={{ marginTop: 0 }}
          fullWidth
          required
        />
        <TextField
          id="standard-basic"
          label="First Name"
          variant="standard"
          placeholder="Enter Your First Name"
          value={first_name}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          style={{ marginTop: 15 }}
          fullWidth
          required
        />
        <TextField
          id="standard-basic"
          label="Last Name"
          variant="standard"
          placeholder="Enter Your Last Name"
          value={last_name}
          onChange={(e) => {
            setLastName(e.target.value);
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
          value={account_password}
          style={{ marginTop: 15 }}
          onChange={(e) => {
            setAccountPassword(e.target.value);
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
        <FormControlLabel
          control={
            <Checkbox
              checked={isHOD}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label="Head of Department"
        />

        <Button
          variant="contained"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
        >
          {picLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "SignUp"
          )}
        </Button>
        <ToastContainer />
      </Stack>
    </>
  );
};

export default AdminRegistration;
