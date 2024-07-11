import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useTheme } from "../context/ThemeContext";
import MainNavbar from "../components/common/MainNavbar";

// const variants = {
//   initial: {
//     x: 500,
//     opacity: 0,
//   },
//   animate: {
//     x: 0,
//     // y: 8,
//     opacity: 1,
//     transition: {
//       duration: 1,
//       staggerChildren: 0.1,
//     },
//   },
// };

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const Contact = () => {
  const ref = useRef();
  const formRef = useRef();
  const { theme, userType, student, admin } = useTheme();
  //   console.log(theme);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // const isInView = useInView(ref, { margin: "-100px" });
  const isInView = useInView(ref, { threshold: 0.5 });

  const notifyFailure = () => {
    toast.error("Unexpected error has occurred");
  };

  const notifySuccess = () => {
    toast.success("Mail sent Successfully!");
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_1vi1c8k",
        "template_rp7o058",
        formRef.current,
        "Shggdq3kVYsfyIhWu"
      )
      .then(
        (result) => {
          setSuccess(true);
          notifySuccess();
          console.log(result.text);
          setName("");
          setEmail("");
          setMessage("");
          setFormSubmitted(true);
        },
        (error) => {
          setError(true);
          notifyFailure(); // Show failure toast
          console.log(error.text);
        }
      );
  };

  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        // backgroundColor: "red",
      }}
      variants={variants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      ref={ref}
    >
      <MainNavbar
        userType={userType}
        userData={userType === "student" ? student : admin}
      />
      {/* Actual Contact Us Component */}
      <motion.div
        className="contact_container"
        style={{
          height: "100%",
          width: "100%",
          // backgroundColor:"green",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        variants={variants}
        initial="initial"
        whileInView="animate"
        ref={ref}
      >
        {/* first div Genral Info section */}
        <motion.div
          className="contact-first-div"
          style={{
            width: "50%",
            display: "flex",
            flex: 1,
            height: "500px",
            padding: "20px",
            textAlign: "center",
            flexDirection: "column",
            // backgroundColor: "red",
            gap: "10px",
          }}
          variants={variants}
        >
          <motion.h1
            style={{
              fontSize: "40px",
              lineHeight: "40px",
              fontFamily: "Gilroy",
            }}
            variants={variants}
          >
            Let's Work Together
          </motion.h1>
          <motion.div variants={variants}>
            <motion.h2 variants={variants}>Mail</motion.h2>
            <motion.span style={{ fontWeight: "bold" }} variants={variants}>
              llalitalondhe21@gmail.com
            </motion.span>
          </motion.div>

          <motion.div variants={variants}>
            <motion.h2 variants={variants}>Address</motion.h2>
            <motion.span variants={variants} style={{ fontWeight: "bold" }}>
              Walchand Institute Of Technology,Solapur
            </motion.span>
          </motion.div>

          <motion.div variants={variants}>
            <motion.h2 variants={variants}>Phone</motion.h2>
            <motion.span variants={variants} style={{ fontWeight: "bold" }}>
              +91 8805391589
            </motion.span>
          </motion.div>
        </motion.div>

        {/* second div containing svg and form */}
        <motion.div
          className="contact-second-div"
          style={{
            width: "50%",
            // backgroundColor: "green",
            padding: "20px",
            textAlign: "center",
            height: "500px",
            flex: 1,
            fontFamily: "Gilroy",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          variants={variants}
        >
          <motion.div
            style={{
              margin: "auto",
              position: "absolute",
              display: "flex",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 0 }}
            transition={{ delay: 3, duration: 1 }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-3.5 -3.5 42.00 42.00"
              width="450px"
              height="450px"
            >
              <motion.path
                strokeWidth="0.2"
                fill="none"
                stroke="#ffa500"
                d="M17.662,0.744V0l-1.465,1.062l1.465,1.062v-0.58c8.932,0.089,16.17,7.373,16.17,16.324 c0,9.005-7.326,16.332-16.332,16.332S1.168,26.873,1.168,17.868H0.369C0.369,27.314,8.053,35,17.5,35 c9.447,0,17.131-7.686,17.131-17.132C34.631,8.477,27.033,0.834,17.662,0.744z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isInView ? 1 : 0 }}
                transition={{ duration: 3 }}
              />
              <motion.path
                strokeWidth="0.2"
                fill="none"
                stroke="#ffa500"
                d="M17.441,32.789v0.73l1.469-1.062l-1.469-1.062v0.595c-7.76-0.031-14.064-6.354-14.064-14.12 c0-7.787,6.334-14.123,14.123-14.123c7.787,0,14.121,6.336,14.121,14.123h0.801c0-8.229-6.691-14.923-14.922-14.923 c-8.231,0-14.922,6.695-14.922,14.923C2.578,26.078,9.242,32.757,17.441,32.789z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isInView ? 1 : 0 }}
                transition={{ duration: 3 }}
              />
              <motion.path
                strokeWidth="0.2"
                fill="none"
                stroke="#ffa500"
                d="M14.355,21.012c0.022,0.023,0.045,0.047,0.065,0.07l0.004-0.005c0.853,0.821,1.861,2.03,3.502,3.127 c3.457,2.306,6.111,1.663,7.673,0.806c2.693-1.484,3.9-4.656,3.9-7.141c0-6.618-5.383-12.002-12-12.002 c-6.619,0-12.002,5.384-12.002,12.002c0,6.617,5.383,12,12.002,12c0.406,0,0.737-0.332,0.737-0.739s-0.331-0.739-0.737-0.739 c-5.803,0-10.522-4.721-10.522-10.521c0-5.802,4.721-10.522,10.522-10.522s10.52,4.72,10.52,10.522 c0,2.424-1.291,4.828-3.137,5.844c-0.67,0.369-1.398,0.553-2.174,0.561c0.465-0.278,0.869-0.652,1.17-1.127 c0.061-0.088,0.135-0.166,0.176-0.264c0.24-0.58,0.264-1.236,0.404-1.849c0.182-0.784-3.42-2.31-3.732-1.334 c-0.115,0.362-0.287,1.504-0.516,1.806c-0.199,0.27-0.697,0.141-1.012-0.124c-0.822-0.698-1.736-1.728-2.541-2.54l0.002-0.001 c-0.022-0.021-0.048-0.044-0.068-0.065c-0.022-0.022-0.047-0.047-0.067-0.068v0.001c-0.812-0.802-1.84-1.718-2.541-2.541 c-0.264-0.312-0.394-0.809-0.121-1.012c0.301-0.228,1.441-0.4,1.805-0.512c0.975-0.313-0.549-3.916-1.334-3.736 c-0.613,0.144-1.27,0.165-1.848,0.406c-0.101,0.041-0.178,0.118-0.266,0.176c-2.058,1.305-2.322,4.47-0.314,6.827 c0.768,0.9,1.564,1.774,2.385,2.625l-0.006,0.004C14.308,20.969,14.334,20.989,14.355,21.012z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isInView ? 1 : 0 }}
                transition={{ duration: 3 }}
              />
            </motion.svg>
          </motion.div>

          <motion.form
            className="contact-form-container"
            style={{
              position: "relative",
              display: "flex",
              width: "70%",
              boxShadow:
                "rgba(255,165,0) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
              borderRadius: "20px",
              height: "443px",
              fontWeight: "bolder",
              padding: "10px",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "center",
              pointerEvents: "auto",
            }}
            onSubmit={sendEmail}
            ref={formRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
          >
            <motion.input
              className="input"
              style={{
                padding: "20px",
                backgroundColor: "transparent",
                height: "10px",
                border: theme === "dark" ? "1px solid white" : "1px solid gray",
                color: "inherit",
                borderRadius: "5px",
                fontFamily: "Montserrat",
              }}
              variants={variants}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your Name"
              name="from_name"
              required
            />
            <motion.input
              className="input"
              style={{
                padding: "20px",
                backgroundColor: "transparent",
                border: theme === "dark" ? "1px solid white" : "1px solid gray",
                color: "inherit",
                height: "10px",
                borderRadius: "5px",
                fontFamily: "Montserrat",
              }}
              value={email}
              variants={variants}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Yor Email Address"
              name="email"
              required
            />
            <motion.textarea
              className="textarea"
              style={{
                padding: "20px",
                backgroundColor: "transparent",
                border: theme === "dark" ? "1px solid white" : "1px solid gray",
                color: "inherit",
                borderRadius: "5px",
                fontFamily: "Montserrat",
              }}
              value={message}
              rows={8}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message You want to give"
              name="message"
              variants={variants}
              required
            />
            <motion.button
              style={{
                cursor: "pointer",
                height: "40px",
                width: "100%",
                border: "none",
                borderRadius: "50px",
                backgroundColor: "orange",
                alignSelf: "center",
                fontWeight: 500,
                fontFamily: "Work Sans",
                fontWeight: "bolder",
              }}
              variants={variants}
            >
              {formSubmitted ? "Submit Another Response" : "Submit"}
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
      <ToastContainer position="top-right" />
    </motion.div>
  );
};

export default Contact;
