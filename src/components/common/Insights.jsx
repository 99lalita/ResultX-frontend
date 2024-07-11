import { Grid, Typography, Button } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "../../context/ThemeContext";

const InsightComponent = ({ insights }) => {
  const { theme, student } = useTheme();
  return (
    <Grid container alignItems="center" justifyContent="center" spacing={1}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Work Sans",
            color: theme === "dark" ? "#ffffff" : "#333333",
            transition: "all linear 0.4s",
            textAlign: "center",
            fontWeight: "700",
            marginBottom: "20px",
          }}
          className="view-result-heading"
        >
          Comparative Analysis (With Previous Year)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" style={{ marginTop: "0.5rem" }}>
          {insights === "Great improvement compared to last year!" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <TrendingUpIcon
                style={{
                  marginRight: "8px",
                  fontSize: "2rem",
                  color: "green",
                  fontWeight: "bold",
                }}
              />
              <span
                style={{
                  color: "green",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                }}
              >
                Great improvement compared to last year!Your hard work has
                shown, seeds you've sown, Progress made, your efforts have
                grown.
              </span>
            </div>
          )}
          {insights ===
            "Your performance has declined compared to last year. Keep pushing!" && (
            <>
              <TrendingDownIcon
                style={{
                  marginRight: "8px",
                  fontSize: "2rem",
                  color: "#FF6347",
                  fontWeight: "bold",
                }}
              />
              <span
                style={{
                  color: "#FF6347",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                }}
              >
                Your performance has declined compared to last year. Keep
                pushing!Though setbacks may appear, don't fear, Keep pushing,
                keep striving, year by year.
              </span>
            </>
          )}
          {insights === "Your performance is consistent with last year." && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <CheckCircleIcon
                style={{
                  marginRight: "7px",
                  fontSize: "2rem",
                  color: "green",
                  fontWeight: "bold",
                }}
              />
              <span
                style={{
                  color: "green",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                }}
              >
                Your performance is consistent with last year. Steady progress,
                year by year, Your efforts stay the same. Consistency leads the
                way, In your academic game.
              </span>
            </div>
          )}
          {insights === "Fill previous year data" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  color: "#3763ab",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  display: "flex",
                }}
              >
                {" "}
                <InfoOutlinedIcon
                  style={{
                    marginRight: "8px",
                    fontSize: "2rem",
                    color: "#3763ab",
                    fontWeight: "bold",
                  }}
                />
                Please fill previous year data for analysis
              </span>

              <Button
                variant="contained"
                href={`/student/${student.enrollment_id}/`}
              >
                Click Here to upload
              </Button>
            </div>
          )}
          {insights === "All the best" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "green",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <ThumbUpAltIcon
                  style={{
                    marginRight: "8px",
                    fontSize: "2rem",
                    color: "green",
                    fontWeight: "bold",
                  }}
                /> */}
                Congratulations on your achievements so far! Keep up the good
                work and maintain this excellent performance.{" "}
              </span>
            </div>
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default InsightComponent;
