import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Container from "@mui/material/Container";

const InstructionsForStudents = ({ onClick }) => {
  return (
    <Container maxWidth="lg">
      <div
        className="instruction-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h2
          style={{
            textAlign: "center",
            fontFamily: "Montserrat",
            fontSize: "30px",
          }}
        >
          Welcome to ResultX
        </h2>
        <h3
          style={{
            textAlign: "center",
            fontFamily: "Montserrat",
            fontSize: "20px",
          }}
        >
          Instructions for Students
        </h3>
        <VerticalTimeline lineColor="black">
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3
              className="vertical-timeline-element-title"
              style={{ fontSize: "19px", fontWeight: "bolder" }}
            >
              Read the Guidelines
            </h3>
            <p style={{ color: "white", fontWeight: "bold", fontSize: "17px" }}>
              Take a moment to read through the guidelines and instructions
              carefully.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3
              style={{ fontSize: "19px", fontWeight: "bolder" }}
              className="vertical-timeline-element-title"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            >
              😎 Explore the Features 😎
            </h3>
            <p style={{ fontWeight: "bold", fontSize: "17px" }}>
              1. Explore the features available in the student panel to
              familiarize yourself with the platform. <br />
              2. For the best experience, it's recommended to use the desktop
              version, although it's mobile-responsive. <br />
              3.It is PWA (Progressive Web Application) ability to install on
              the device's home screen.
              <br />
              4. This Application requires Internet.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3
              className="vertical-timeline-element-title"
              style={{ fontSize: "19px", fontWeight: "bolder" }}
            >
              ⚠️ Regarding Result Uplodation ⚠️
            </h3>
            <p style={{ fontWeight: "bold", fontSize: "17px" }}>
              1. You have enter result only for SEM-II for each Year.Kindy Don't
              upload result for SEM-I for any year.Otherwise you will be
              responsible for any loss.
              <br />
              2. If you upload any wrong result data, then you will be
              responsible. You have to contact our team, and it will be a long
              process.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3
              className="vertical-timeline-element-title"
              style={{ fontSize: "19px", fontWeight: "bolder" }}
            >
              ☠️ Regarding Uploading the Result ☠️
            </h3>
            <p style={{ fontWeight: "bold", fontSize: "17px" }}>
              1. While uploading the result, you can enter the result details
              only once. Be careful while uploading the result.
              <br />
              2. If you upload any wrong result data, then you will be
              responsible. You have to contact our team, and it will be a long
              process.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3
              className="vertical-timeline-element-title"
              style={{ fontSize: "19px", fontWeight: "bolder" }}
            >
              ⚠️ Regarding Result PDF Upload ⚠️
            </h3>
            <p style={{ fontWeight: "bold", fontSize: "17px" }}>
              1. It is recommended to give a proper name to your result PDF,
              e.g.,
              <i style={{ color: "#1C1678" }}>
                {" "}
                2102111129_second_year_scorecard
              </i>{" "}
              <br />
              2. The file format should be PDF only.
              <br />
              3. If you attempt to upload tampered data, strict actions will be
              taken against the student. Tampering is detectable by the
              application.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            className="vertical-timeline-element--work"
          >
            <h3
              className="vertical-timeline-element-title"
              style={{ fontSize: "19px", fontWeight: "bolder" }}
            >
              💀 Regarding Result Status 💀
            </h3>
            <p style={{ fontWeight: "bold", fontSize: "17px" }}>
              1. Students with no ATKT in complete 4 years are considered in the
              count of successfully passed student count.
              <br />
              2. Students having 3 ATKT in one semester will be considered as
              FAIL.
              <br />
              3. Fail students do not have access to this ResultX Application.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3
              className="vertical-timeline-element-title"
              style={{ fontSize: "19px", fontWeight: "bolder" }}
            >
              📞 Regarding Any Issues,Contact Us 📞
            </h3>
            <p style={{ fontWeight: "bold", fontSize: "17px" }}>
              1. Regarding any issues like authentication issues, incorrect
              personal details, and result discrepancies, you can contact us
              from the Contact Us page. <br />
              2. For any suggestions, please feel free to contact us. Your
              valuable input is highly appreciated.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3
              className="vertical-timeline-element-title"
              style={{ fontSize: "19px", fontWeight: "bolder" }}
            >
              🎓 Regarding DSY students 🎓
            </h3>
            <p style={{ fontWeight: "bold", fontSize: "17px" }}>
              1. DSY students can't enter Data for first Year. They can upload
              their data from second Year SEM-II onwards
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3
              className="vertical-timeline-element-title"
              style={{ fontSize: "19px", fontWeight: "bolder" }}
            >
              Get Started
            </h3>
            <p style={{ fontWeight: "bold", fontSize: "17px" }}>
              Click the button to unlock and experience the full range of
              features offered by the application.
              <br />
              <br />
              All The Best!👍
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
        <button
          onClick={onClick}
          className="btn-62"
          style={{
            alignSelf: "center",
            fontFamily: "Montserrat",
            fontWeight: "bolder",
            margin: "20px",
            width: "40%",
          }}
        >
          <span>Proceed to Student Panel</span>
        </button>
      </div>
    </Container>
  );
};

export default InstructionsForStudents;
