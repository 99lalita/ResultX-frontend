import {
  Avatar,
  Button,
  CircularProgress,
  Input,
  Stack,
  TextField,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import BackendEndpoints from "../../utils/BackendEndpoints";
import { studentPRN } from "../../constants/StudentDataVerificarion";

const StudentRegistration = () => {
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [account_password, setAccountPassword] = useState();
  const [enrollment_id, setEnrollmentId] = useState();
  const [profileImageURI, setProfileImageURI] = useState();
  const [show, setShow] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const [current_year, setCurrentyear] = useState();
  const [admission_year, setAdmission_year] = useState("");
  const [graduation_year, setGraduation_year] = useState("");
  const [isDSY, setIsDSY] = useState(false);
  let navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setIsDSY(event.target.checked);
  };

  const handleClick = () => {
    setShow(!show);
  };

  const commonToastOptions = {
    position: "top-right",
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
      !enrollment_id ||
      !first_name ||
      !last_name ||
      !profileImageURI ||
      !current_year ||
      !admission_year ||
      !graduation_year
    ) {
      toast.warn("Please Fill all the Feilds", {
        ...commonToastOptions,
      });
      setPicLoading(false);
      return;
    }
    const year = parseInt(admission_year);
    setGraduation_year(year + 4);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");

      return;
    }
    //  if (!verifyPRN(enrollment_id)) {
    //    toast.warn("Invalid PRN Number", {
    //      ...commonToastOptions,
    //    });

    //    return;
    //  }
    if (account_password !== confirmpassword) {
      toast.warn("Passwords Do Not Match", {
        ...commonToastOptions,
      });
      return;
    }
    // console.log(email, account_password, profileImageURI);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        BackendEndpoints.REACT_APP_STUDENT_REGISTRATION_API,
        {
          enrollment_id,
          first_name,
          last_name,
          email,
          admission_year,
          current_year,
          account_password,
          graduation_year,
          isDSY,
          profileImageURI,
        },
        config
      );

      if (data.status === 401) {
        toast.error("Signup Failed ! User already exists", {
          ...commonToastOptions,
        });
        setPicLoading(false);
        navigate("/");
      }
      if (data.status === 201) {
        console.log(data);
        toast.success("Registration Successful", {
          ...commonToastOptions,
        });

        // setting up the data
        Cookies.set("studentInfo", JSON.stringify(data.user));
        Cookies.set(
          BackendEndpoints.AUTH_STUDENT_ACCESS_TOKEN,
          data.loginAuthToken
        );
        Cookies.set(
          BackendEndpoints.AUTH_STUDENT_REFRESH_TOKEN,
          data.refreshAuthToken
        );

        setPicLoading(false);
        navigate(`/student/${data.user.enrollment_id}`);
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      navigate("/");
    }
  };
  const verifyPRN = (prn) => {
    console.log("Verifying PRN:", prn);
    const exists = studentPRN.some((student) => student.student_id === prn);
    console.log("PRN exists:", exists);
    return exists;
  };

  function generateYearOptions() {
    const current_year = new Date().getFullYear();
    const maxYear = current_year + 4;
    const minYear = 2020;
    const yearOptions = [];

    for (let year = maxYear; year >= minYear; year--) {
      yearOptions.push(year.toString());
    }

    return yearOptions;
  }

  return (
    <>
      <Stack>
        <Stack alignItems={"center"}>
          <Avatar style={{ background: "#1bbd7e" }}>
            <AddCircleOutlineIcon />
          </Avatar>
          <h2 style={{ fontFamily: "Work sans" }}>Student SignUp</h2>
        </Stack>

        <TextField
          id="standard-basic"
          label="PRN No"
          variant="standard"
          placeholder="Enter Your PRN Number"
          value={enrollment_id}
          onChange={(e) => {
            const input = e.target.value;
            if (/^\d{0,10}$/.test(input)) {
              setEnrollmentId(input);
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
            const input = e.target.value.replace(/[^A-Za-z]/gi, "");
            setFirstName(input);
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
            const input = e.target.value.replace(/[^A-Za-z]/gi, "");
            setLastName(input);
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
          label="Moodle Password"
          placeholder="Enter your Moodle password"
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

        {/* Dropdown menu for Admission Year */}
        <FormControl
          variant="standard"
          style={{ marginTop: 15 }}
          fullWidth
          required
        >
          <InputLabel id="admission-year-label">Admission Year</InputLabel>
          <Select
            labelId="admission-year-label"
            id="admission-year"
            value={admission_year}
            onChange={(e) => setAdmission_year(e.target.value)}
          >
            {generateYearOptions().map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          variant="standard"
          style={{ marginTop: 15 }}
          fullWidth
          required
        >
          <InputLabel id="graduation-year-label">Graduation Year</InputLabel>
          <Select
            labelId="graduation-year-label"
            id="graduation-year"
            value={graduation_year}
            onChange={(e) => setGraduation_year(e.target.value)}
          >
            {generateYearOptions().map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Dropdown menu for Current Year */}
        <FormControl
          variant="standard"
          style={{ marginTop: 15 }}
          fullWidth
          required
        >
          <InputLabel id="current-year-label">
            Enter Your Current Year
          </InputLabel>
          <Select
            labelId="current-year-label"
            id="current-year"
            value={current_year}
            onChange={(e) => setCurrentyear(e.target.value)}
          >
            <MenuItem key={1} value={1}>
              First Year
            </MenuItem>
            <MenuItem key={1} value={2}>
              Second Year
            </MenuItem>
            <MenuItem key={1} value={3}>
              Third Year
            </MenuItem>
            <MenuItem key={1} value={4}>
              Fourth Year
            </MenuItem>
          </Select>
        </FormControl>

        {/* Dropdown menu for Graduation Year
        <FormControl
          variant="standard"
          style={{ marginTop: 15 }}
          fullWidth
          required
        >
          <InputLabel id="graduation-year-label">Graduation Year</InputLabel>
          <Select
            labelId="graduation-year-label"
            id="graduation-year"
            value={graduation_year}
            onChange={(e) => setGraduation_year(e.target.value)}
          >
            {generateYearOptions().map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

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
              checked={isDSY}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label="is DSY"
        />

        <Button
          variant="contained"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          loading={picLoading}
        >
          {picLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Sign Up"
          )}
        </Button>
        {/* <ToastContainer /> */}
      </Stack>
    </>
  );
};

export default StudentRegistration;
