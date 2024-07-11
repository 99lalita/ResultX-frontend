import React, { useRef } from "react";
import { useInView, motion } from "framer-motion";
import HighlightText from "../components/common/HightlightText";
import Quote from "../components/common/Quote";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import { useTheme } from "../context/ThemeContext";
import MainNavbar from "../components/common/MainNavbar";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1, staggerChildren: 0.1 } },
};

const About = () => {
  const ref = useRef();
  const isInView = useInView(ref, { threshold: 0.5 });
  const { theme, student, userType, admin } = useTheme();

  return (
    <div
      className="about-container"
      style={{
        backgroundColor: theme === "dark" ? "#000814" : "#fff",
        color: theme === "dark" ? "#fff" : "black",
        fontWeight: "bold",
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
      {/* Section 1 */}
      <motion.section
        className="section-1"
        style={{ backgroundColor: theme === "dark" ? "#2C333F" : "#2C333F" }}
      >
        <div className="section-1-content">
          <header className="section-1-header">
            Driving Innovation in Education for a
            <HighlightText text={" Brighter Future"} />
            <p className="section-1-description">
              Embark on a journey of discovery with ResultX, where innovation
              meets education to unlock limitless possibilities. Join ResultX in
              shaping the future of education, where traditional boundaries
              dissolve, and new horizons emerge. Discover a new dimension of
              result analysis with ResultX, where every data point tells a story
              of growth and achievement.
            </p>
          </header>
          <div className="section-1-images">
            <img src={BannerImage1} alt="Banner 1" />
            <img src={BannerImage2} alt="Banner 2" />
            <img src={BannerImage3} alt="Banner 3" />
          </div>
        </div>
      </motion.section>
      {/* Section 2 */}
      <motion.section
        className="section-2"
        style={{ backgroundColor: theme === "dark" ? "#000814" : "#fff" }}
      >
        <div
          className="section-2-content"
          style={{
            position: "relative",
            textAlign: "center",
            padding: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            id="colon1"
            src="https://eiwgew27fhz.exactdn.com/wp-content/themes/puttosaurus/img/quote-left.svg"
            alt=""
          ></img>
          <Quote />

          <img
            id="colon2"
            src="https://eiwgew27fhz.exactdn.com/wp-content/themes/puttosaurus/img/quote-right.svg"
            alt=""
          />
        </div>
      </motion.section>

      {/* Section 3 */}
      <motion.section
        className="section-3"
        style={{
          backgroundColor: theme === "dark" ? "#000814" : "#fff",
          marginTop: "-100px",
        }}
      >
        <div className="section-3-content">
          <div className="section-3-content-block">
            <div className="section-3-text">
              <h1 className="gradient-text">Our Founding Story</h1>
              <p className="section-3-p">
                In the summer of 2022, a small group of passionate educators and
                tech enthusiasts came together with a shared vision: to
                revolutionize the way students and teachers interact with
                academic results. Frustrated by the outdated, inefficient
                systems that were prevalent in educational institutions, we knew
                there had to be a better way.
              </p>
              <p className="section-3-p">
                We started in a modest garage, brainstorming and sketching out
                ideas late into the night. With a clear goal and an unwavering
                commitment, we transformed those ideas into a robust platform.
                This is how ResultX was born—a result of hard work, dedication,
                and a belief in the power of technology to improve education.
              </p>
            </div>
            <div className="section-3-image">
              <img src={FoundingStory} alt="Founding Story" />
            </div>
          </div>

          <div id="scroller">
            <div id="scroller-in">
              <h4>
                🧑‍🎓ResultX: Empowering Students, Supporting Educators, Enhancing
                Education 🧑‍🎓
              </h4>
            </div>
          </div>

          {/* Centering Container for Mission and Vision */}
          <div className="center-container">
            <div
              className="centered-content"
              style={{
                background: `radial-gradient(circle, ${
                  theme === "dark" ? "#303030" : "#f5e8dd"
                }, ${theme === "dark" ? "#1a1a1a" : "#ffffff"})`,
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
                borderRadius: "12px",
              }}
            >
              <h1 className="gradient-text">Our Vision</h1>
              <span style={{ fontSize: "35px" }}>🚀</span>
              <p className="section-3-p">
                At ResultX, our vision is to create a seamless and efficient
                educational ecosystem where students and educators can access,
                analyze, and utilize academic results effortlessly. We believe
                in leveraging technology to bridge gaps, enhance transparency,
                and promote a culture of continuous improvement in education. We
                envision a future where every student has instant access to
                their academic performance, every teacher can easily track
                progress, and every educational institution operates with
                unparalleled efficiency. Our platform aims to empower all
                stakeholders in the education system, ensuring that academic
                success is within reach for everyone.
              </p>
            </div>

            <div
              className="centered-content"
              style={{
                background: `radial-gradient(circle, ${
                  theme === "dark" ? "#303030" : "#f5e8dd"
                }, ${theme === "dark" ? "#1a1a1a" : "#ffffff"})`,
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
                borderRadius: "12px",
              }}
            >
              <h1 className="gradient-text">Our Mission</h1>
              <span style={{ fontSize: "35px" }}>🎯</span>
              <p className="section-3-p">
                Our mission at ResultX is to provide an innovative and
                user-friendly platform that transforms the way academic results
                are managed and communicated.
                <br />
                <br />
                We are dedicated to:
                <br />
                <br />
                1. Empowering Students: Giving students quick and easy access to
                their academic performance, enabling them to take charge of
                their learning journey.
                <br />
                <hr />
                2. Supporting Educators: Providing teachers with powerful tools
                to monitor student progress, identify areas for improvement, and
                tailor their teaching strategies.
                <br />
                <hr />
                3. Enhancing Transparency: Ensuring that academic results are
                accurate, accessible, and transparent for all stakeholders.
                <br />
                <hr />
                4. Promoting Efficiency: Streamlining administrative processes
                for educational institutions, reducing the burden of manual
                tasks, and allowing more focus on teaching and learning.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
