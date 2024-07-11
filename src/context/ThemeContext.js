import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [student, setStudent] = useState();
  const [admin, setAdmin] = useState();
  const [userType, setUserType] = useState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const toggleTheme = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  const theme = isDarkMode ? "dark" : "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode, navigate, theme]);

  useEffect(() => {
    if (location.pathname !== "/") {
      const studentInfo = Cookies.get("studentInfo");
      const adminInfo = Cookies.get("adminInfo");
      if (studentInfo) {
        try {
          const parsedStudentInfo = JSON.parse(studentInfo);
          setStudent(parsedStudentInfo);
          setUserType("student");
          setIsLoading(false);
        } catch (error) {
          console.error("Error parsing studentInfo:", error);
          navigate("/");
        }
      } else if (adminInfo) {
        try {
          const parsedAdminInfo = JSON.parse(adminInfo);
          setAdmin(parsedAdminInfo);
          setUserType("admin");
          setIsLoading(false);
        } catch (error) {
          console.error("Error parsing adminInfo:", error);
          navigate("/");
        }
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [location, navigate]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setStudent,
        student,
        admin,
        setAdmin,
        userType,
        setUserType,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
