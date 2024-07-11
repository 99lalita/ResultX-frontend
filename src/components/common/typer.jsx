import React from "react";
import ReactTypingEffect from "react-typing-effect";

const ReactTypingEffectDemo = ({ first_name, last_name, current_year }) => {
  console.log(first_name, last_name);
  console.log(current_year);
  return (
    <>
      <br />

      <ReactTypingEffect
        text={[
          `Welcome Back ${first_name}` +
            ` ` +
            `${last_name} ` +
            ` \n` +
            `Current Year is ${current_year}`,
        ]}
        cursorRenderer={(cursor) => (
          <h2 style={{ color: "black" }}>{cursor}</h2>
        )}
        displayTextRenderer={(text, i) => {
          return (
            <h2>
              {text.split("").map((char, i) => {
                const key = `${i}`;
                return (
                  <span key={key} style={{ color: "#222" }}>
                    {char}
                  </span>
                );
              })}
            </h2>
          );
        }}
        speed={30}
        typingDelay={50}
        eraseDelay={5}
      />
    </>
  );
};

export default ReactTypingEffectDemo;
