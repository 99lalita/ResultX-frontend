import React from "react";
import MainNavbar from "../components/common/MainNavbar";
import AdminPanel from "../components/common/AdminPanel";
import InstructionsForAdmin from "../components/common/InstructionsForAdmin";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const AdminPage = () => {
  const { admin, userType } = useTheme();
  console.log(admin);
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
        <InstructionsForAdmin onClick={handleProceed} />
      ) : (
        <>
          {/* Navbar section */}
          <MainNavbar userType={userType} userData={admin} />
          {/* Admin panel */}
          <AdminPanel />
        </>
      )}
    </div>
  );
};

export default AdminPage;
