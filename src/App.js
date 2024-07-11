import "./App.css";
import HomePage from "./pages/HomePage";
import SignupTemp from "./pages/SignupTemp";
import { Route, Routes } from "react-router-dom";
import StudentPage from "./pages/StudentPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cursor from "./components/miscellaneous/Cursor";
import ViewResultPage from "./pages/ViewResultPage";
import FirstYearResultUpload from "./pages/FirstYearResultUpload";
import SecondYearResultUpload from "./pages/SecondYearResultUpload";
import ThirdYearResultUpload from "./pages/ThirdYearResultUpload";
import FinalYearResultUpload from "./pages/FinalYearResultUpload";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "./pages/AdminPage";
import AdminResultPage from "./pages/AdminResultPage";
import TeamPage from "./pages/TeamPage";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const handleOffline = () => {
      alert(
        "No internet connection detected. Please connect to the internet to access all functionalities. Without internet, you may receive incorrect or incomplete results."
      );
    };

    const handleOnline = () => {
      alert("You are back online.");
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

 
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <div className="App">
      <Cursor />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/signup/*" element={<SignupTemp />} />{" "}
        {/* student Routes */}
        <Route path="/student/:id" element={<StudentPage />} />
        <Route path="/student/:id/about" element={<About />} />
        <Route path="/admin/:id/about" element={<About />} />
        <Route path="/student/:id/contact" element={<Contact />} />
        <Route path="/admin/:id/contact" element={<Contact />} />
        <Route
          path="/student/:id/upload-first-year-result"
          element={<FirstYearResultUpload />}
        />
        <Route
          path="/student/:id/upload-second-year-result"
          element={<SecondYearResultUpload />}
        />
        <Route
          path="/student/:id/upload-third-year-result"
          element={<ThirdYearResultUpload />}
        />
        <Route
          path="/student/:id/upload-fourth-year-result"
          element={<FinalYearResultUpload />}
        />
        <Route path="/student/:id/view-result" element={<ViewResultPage />} />
        <Route path="/admin/:id" element={<AdminPage />} />
        <Route
          path="/admin/:id/result/:batchYear/:resultYear"
          element={<AdminResultPage />}
        />
        <Route path="/student/:id/teamPage" element={<TeamPage />} />
        <Route path="/admin/:id/teamPage" element={<TeamPage />} />
        {/* Catch-all route for unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
