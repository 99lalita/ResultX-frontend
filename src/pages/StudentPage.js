import React from "react";
import MainNavbar from "../components/common/MainNavbar";
import StudentPanel from "../components/common/StudentPanel";
import { useState, useEffect } from "react";
import InstructionsForStudents from "../components/common/InstructionsForStudents";
import { useTheme } from "../context/ThemeContext";

const StudentPage = () => {
  const { student, userType } = useTheme();
  console.log(student);
  // const firstName = student ? student.first_name : "";
  // console.log(firstName);
  // const profileImageURI = student ? student.profileImageURI : "";
  // console.log(profileImageURI);
  // console.log(student.first_name);
  // console.log(useData);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const instructionsShown = localStorage.getItem("instructionsShown");
    if (!instructionsShown) {
      setShowInstructions(true);
      localStorage.setItem("instructionsShown", "true");
    }
  }, []);

  const handleProceed = () => {
    setShowInstructions(false);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {showInstructions ? (
        <InstructionsForStudents onClick={handleProceed} />
      ) : (
        <>
          {/* Navbar section */}
          <MainNavbar userType={userType} userData={student} />
          {/* student panel */}
          <StudentPanel studentInfo={student} />
        </>
      )}
    </div>
  );
};

export default StudentPage;
