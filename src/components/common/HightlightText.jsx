import React from "react";

function HighlightText({ text }) {
  return (
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
      {text}
    </span>
  );
}

export default HighlightText;
