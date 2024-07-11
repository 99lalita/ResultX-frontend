import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container, Box } from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { useTypingEffect } from "../../hooks/typing-effect";


const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: ["Montserrat"].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,0.5)",
  },
  "&:disabled": {
    backgroundColor: "#e8e8e8", // Background color for disabled state
    color: "black",
    boxShadow: "none",
  },
  // Media queries
  "@media (max-width: 600px)": {
    fontSize: 14,
    width: "100%",
  },
  "@media (max-width: 400px)": {
    fontSize: 12,
    width: "100%",
  },
});

export default function AdminPanel() {
  const { theme, admin } = useTheme();
  const firstName = admin?.first_name;
  const lastName = admin?.last_name;
  // Animation
  const infoText = useTypingEffect(
    `Welcome Back ${firstName} ${lastName}...`,
    10
  );

  // Function to determine if a button should be disabled
  const isButtonDisabled = (batchYear, buttonYear) => {
    // console.log(batchYear);
    // console.log(buttonYear);
    const admissionYear = batchYear - 4;
    // console.log("Admission Year", admissionYear);
    buttonYear = admissionYear + buttonYear;
    // console.log("Button Year", buttonYear);
    // console.log(buttonYear);
    const currentYear = new Date().getFullYear();
    // console.log("current Year", currentYear);
    if (buttonYear <= currentYear) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Container
      maxwidth="lg"
      sx={{
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      <Typography
        sx={{
          fontSize: "30px",
          fontWeight: "bold",
          fontFamily: "Work Sans",
          textAlign: "center",
        }}
        className="admin-panel-GeneralTextHeading"
      >
        {infoText}
      </Typography>
      {[2024, 2025, 2026, 2027, 2028, 2029].map((batchYear) => (
        <Accordion
          key={batchYear}
          sx={{
            bgcolor: theme === "dark" ? "#B5C0D0" : "#f5e8dd",
            color: theme === "dark" ? "#222" : "#333333",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${batchYear}-content`}
            id={`panel-${batchYear}-header`}
          >
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Graduation Batch {batchYear}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              className="admin-panel-accordian-box"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {[0, 1, 2, 3].map((year) => (
                <Tooltip
                  title={
                    isButtonDisabled(batchYear, year)
                      ? `Batch Currently in ${year} year`
                      : ""
                  }
                  key={year}
                >
                  <BootstrapButton
                    key={year}
                    variant="contained"
                    disableRipple
                    disabled={isButtonDisabled(batchYear, year)}
                    sx={{ width: "40%", margin: "auto" }}
                    component={Link}
                    to={`/admin/${admin?.admin_id}/result/${batchYear}/${year}`}
                  >
                    {year === 0
                      ? "First "
                      : year === 1
                      ? "Second "
                      : year === 2
                      ? "Third "
                      : year === 3
                      ? "Final "
                      : " "}
                    Year Result
                  </BootstrapButton>
                </Tooltip>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
