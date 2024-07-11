import { Container, Typography, Box } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import SamruddhiImage from "../assets/UserAssets/SamruddhiImage.jpeg";
import VishakahImage from "../assets/UserAssets/VishakahImage.jpeg";
import LalitaImage from "../assets/UserAssets/LalitaImage.jpg";
import PrachiImage from "../assets/UserAssets/PrachiImage.jpeg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import MainNavbar from "../components/common/MainNavbar";
// const variants = {
//   initial: {
//     opacity: 0,
//     x: -20,
//     y: 20,
//     scale: 0.8,
//   },
//   animate: {
//     opacity: 1,
//     x: 0,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.5,
//       ease: "easeOut",
//       when: "beforeChildren",
//       staggerChildren: 0.1,
//     },
//   },
// };

const variants1 = {
  initial: {
    x: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 8,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 3,
      staggerChildren: 0.1,
    },
  },
};
const TeamPage = () => {
  const ref = useRef();
  const isInView = useInView(ref, { threshold: 0.5 });
  const SamruddhilinkedInURL =
    "https://www.linkedin.com/in/samruddhi-lonkar-600013234/";
  const VishakhalinkedInURL =
    "https://www.linkedin.com/in/vishakha-shinde-39a832234/";
  const PrachilinkedURL = "https://www.linkedin.com/in/prachi-patil-145991237/";
  const LalitalinkedURL =
    "https://www.linkedin.com/in/lalita-londhe-3b200b234/";

  const { student, admin, userType, theme } = useTheme();
  return (
    <>
      <MainNavbar
        userType={userType}
        userData={userType === "student" ? student : admin}
      />
      <motion.div
        ref={ref}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={variants}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Container maxWidth="xl">
          <Typography
            sx={{
              fontSize: "50px",
              fontFamily: "outfit",
              textAlign: "center",
              color: "#ffa500",
            }}
          >
            Team
          </Typography>

          <motion.div
            style={{
              fontSize: "20px",
              fontFamily: "outfit",
              textAlign: "center",
            }}
            variants={variants1}
          >
            Powering ResultX with innovation and passion! Meet the extraordinary
            team behind the scenes. 🚀✨
          </motion.div>

          <Typography
            sx={{
              fontSize: "30px",
              fontFamily: "outfit",
              textAlign: "center",
              color: "#ffa500",
              fontWeight: "bold",
            }}
          >
            Development Team
          </Typography>

          {/* Development Team */}
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
            className="teamBox"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "50px",
              }}
              className="TeamBox1"
            >
              <Card
                sx={{
                  width: "400px",
                  borderRadius: "15px",
                  background: `linear-gradient(to bottom, ${
                    theme === "dark" ? "#303030" : "#f5e8dd"
                  }, ${theme === "dark" ? "#1a1a1a" : "#ffffff"})`,
                }}
                raised
              >
                <Avatar
                  alt="Lalita"
                  src={LalitaImage}
                  sx={{
                    width: 200,
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    margin: "auto",
                    border: "5px solid #ffa500",
                    transition: "all linear 0.5s",
                    marginTop: "7px",
                  }}
                  className="teamAvatar"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      textAlign: "center",
                      color: "#ffa500",
                      fontWeight: "bold",
                    }}
                  >
                    Lalita Londhe
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textAlign: "center",
                      fontWeight: "500",
                      color: theme === "dark" ? "#fff" : "black",
                      fontSize: "20px",
                      fontFamily: "Work Sans",
                    }}
                  >
                    Backend Developer,Frontend Developer
                  </Typography>
                </CardContent>
                <CardActions>
                  <a
                    href={LalitalinkedURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "auto", color: "#ffa500" }}
                  >
                    <LinkedInIcon fontSize="large" />
                  </a>
                </CardActions>
              </Card>
              <Card
                sx={{
                  width: "400px",
                  borderRadius: "15px",
                  background: `linear-gradient(to bottom, ${
                    theme === "dark" ? "#303030" : "#f5e8dd"
                  }, ${theme === "dark" ? "#1a1a1a" : "#ffffff"})`,
                }}
                raised
              >
                <Avatar
                  alt="Prachi"
                  src={PrachiImage}
                  sx={{
                    width: 200,
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    margin: "auto",
                    border: "5px solid #ffa500",
                    transition: "all linear 0.5s",
                    marginTop: "7px",
                  }}
                  className="teamAvatar"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      textAlign: "center",
                      color: "#ffa500",
                      fontWeight: "bold",
                    }}
                  >
                    Prachi Patil
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textAlign: "center",
                      fontWeight: "500",
                      color: "black",
                      fontSize: "20px",
                      fontFamily: "Work Sans",
                      color: theme === "dark" ? "#fff" : "black",
                    }}
                  >
                    Backend Developer,Frontend Developer
                  </Typography>
                </CardContent>
                <CardActions>
                  <a
                    href={PrachilinkedURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "auto", color: "#ffa500" }}
                  >
                    <LinkedInIcon fontSize="large" />
                  </a>
                </CardActions>
              </Card>
            </Box>
          </Box>

          {/* Management Team */}
          <Box
            sx={{
              marginTop: "40px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              gap: "20px",
            }}
            className="teamBox"
          >
            <Typography
              sx={{
                fontSize: "30px",
                fontFamily: "outfit",
                textAlign: "center",
                color: "#ffa500",
                fontWeight: "bold",
              }}
            >
              Management Team
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "50px",
                marginTop: "30px",
              }}
              className="TeamBox1"
            >
              <Card
                sx={{
                  width: "400px",
                  borderRadius: "15px",
                  background: `linear-gradient(to bottom, ${
                    theme === "dark" ? "#303030" : "#f5e8dd"
                  }, ${theme === "dark" ? "#1a1a1a" : "#ffffff"})`,
                }}
                raised
              >
                <Avatar
                  alt="Vishakha"
                  src={VishakahImage}
                  sx={{
                    width: 200,
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    margin: "auto",
                    border: "5px solid #ffa500",
                    transition: "all linear 0.5s",
                    marginTop: "7px",
                  }}
                  className="teamAvatar"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      textAlign: "center",
                      color: "#ffa500",
                      fontWeight: "bold",
                    }}
                  >
                    Vishakha Shinde
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textAlign: "center",
                      fontWeight: "500",
                      color: "black",
                      fontSize: "20px",
                      fontFamily: "Work Sans",
                      color: theme === "dark" ? "#fff" : "black",
                    }}
                  >
                    Report Coordinator and DB Design
                  </Typography>
                </CardContent>
                <CardActions>
                  <a
                    href={VishakhalinkedInURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "auto", color: "#ffa500" }}
                  >
                    <LinkedInIcon fontSize="large" />
                  </a>
                </CardActions>
              </Card>
              <Card
                sx={{
                  width: "400px",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "15px",
                  background: `linear-gradient(to bottom, ${
                    theme === "dark" ? "#303030" : "#f5e8dd"
                  }, ${theme === "dark" ? "#1a1a1a" : "#ffffff"})`,
                }}
                raised
              >
                <Avatar
                  alt="Samruddhi"
                  src={SamruddhiImage}
                  sx={{
                    width: 200,
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    margin: "auto",
                    border: "5px solid #ffa500",
                    transition: "all linear 0.5s",
                    marginTop: "7px",
                  }}
                  className="teamAvatar"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      textAlign: "center",
                      color: "#ffa500",
                      fontWeight: "bold",
                    }}
                  >
                    Samruddhi Lonkar
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textAlign: "center",
                      fontWeight: "500",
                      color: "black",
                      fontSize: "20px",
                      fontFamily: "Work Sans",
                      color: theme === "dark" ? "#fff" : "black",
                    }}
                  >
                    Leader,Project Reporting Manager
                  </Typography>
                </CardContent>
                <CardActions>
                  <a
                    href={SamruddhilinkedInURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "auto", color: "#ffa500" }}
                  >
                    <LinkedInIcon fontSize="large" />
                  </a>
                </CardActions>
              </Card>
            </Box>
          </Box>
        </Container>
      </motion.div>
    </>
  );
};

export default TeamPage;
