import React from "react";
import { useTheme } from "../../context/ThemeContext";

const Quote = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        fontSize: "2rem",
        "@media (min-width: 768px)": {
          fontSize: "2.25rem",
        },
        fontWeight: "600",
        margin: "auto",
        paddingTop: "1.25rem",
        paddingBottom: "5rem",
        textAlign: "center",
        color: theme === "dark" ? "#fff" : "black",
      }}
    >
      At ResultX, we're committed to revolutionizing result analysis.{" "}
      <span
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #1FA2FF, #12D8FA, #A6FFCB)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          fontWeight: "bold",
        }}
      >
        Through our innovative platform, we blend technology,
      </span>
      <span
        style={{
          backgroundImage: "linear-gradient(to bottom, #FF512F, #F09819)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          fontWeight: "bold",
        }}
      >
        {" "}
        deep-rooted expertise,
      </span>
      and collaborative engagement
      <span
        style={{
          backgroundImage: "linear-gradient(to bottom, #FF512F, #F09819)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          fontWeight: "bold",
        }}
      >
        {" "}
        to empower users with actionable insights and clarity.
      </span>
    </div>
  );
};

export default Quote;
