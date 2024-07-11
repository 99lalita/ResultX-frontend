import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useTypingEffect } from "../../hooks/typing-effect";
import { useTheme } from "../../context/ThemeContext";
import { toast } from "react-toastify";
import { useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { motion, useInView } from "framer-motion";
import MainNavbar from "./MainNavbar";

// const variants = {
//   initial: {
//     opacity: 0,
//   },
//   animate: {
//     opacity: 1,
//     transition: {
//       duration: 1,
//       staggerChildren: 0.1,
//     },
//   },
// };
const variants = {
  initial: {
    opacity: 0,
    x: -20,
    y: 20,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

// const variants = {
//   initial: {
//     x: 500,
//     opacity: 0,
//   },
//   animate: {
//     x: 0,
//     // y: 8,
//     opacity: 1,
//     transition: {
//       duration: 1,
//       staggerChildren: 0.1,
//     },
//   },
// };

function ResultUploadForm({ year, onSubmit }) {
  const ref = useRef();
  const { theme, student } = useTheme();
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB, adjust as needed
  const heading = useTypingEffect(`Upload Data for ${year}`, 90);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    studentId: "",
    graduation_year: "",
    CGPA: "",
    percentage: "",
    resultStatus: "PASS",
    marks_obtained: "",
  });

  useEffect(() => {
    // Set initial form data with student's data
    setFormData({
      studentId: student?.enrollment_id,
      graduation_year: student?.graduation_year,
      CGPA: "",
      percentage: "",
      resultStatus: "PASS",
      marks_obtained: "",
    });
  }, [student]);

  const [buttonClicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [PDF, setPDF] = useState("");
  const isInView = useInView(ref, { threshold: 0.5 });
  let pdfUrl;

  const handleDisabledFieldClick = (fieldName) => {
    toast.warning(`You cannot edit ${fieldName}.`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  function changeHandler(event) {
    const { name, value } = event.target;

    // Check if the value is blank
    if (!value.trim()) {
      toast.warning(`Please enter a value for ${name}.`);
    }

    // Update formData with the selected value
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const postDetails = (pdf) => {
    return new Promise((resolve, reject) => {
      setLoading(true);

      // Check if PDF is selected
      if (!pdf) {
        setLoading(false);
        reject("Please upload the PDF.");
      }

      // Check if file type is PDF
      if (pdf.type !== "application/pdf") {
        setLoading(false);
        reject("Please upload a file in PDF Format only.");
      }

      // Check file size
      if (pdf.size > MAX_FILE_SIZE) {
        // Define MAX_FILE_SIZE as per your requirement
        setLoading(false);
        reject("File size exceeds the limit.");
      }

      // Upload PDF to Cloudinary
      const data = new FormData();
      data.append("file", pdf);
      data.append("upload_preset", "ResultX-app");
      data.append("cloud_name", "dmzkwpg4y");

      fetch("https://api.cloudinary.com/v1_1/dmzkwpg4y/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setLoading(false);
          console.log(data);
          console.log(data.url);
          pdfUrl = data.url.toString();
          setPDF(pdfUrl);
          console.log(pdfUrl);

          // Update resultPDFURI in formData
          setFormData((prevFormData) => ({
            ...prevFormData,
            resultPDFURI: pdfUrl,
          }));

          toast.success("PDF uploaded successfully.");
          resolve();
        })
        .catch((err) => {
          setLoading(false);
          console.error("Error uploading PDF:", err);
          toast.error("Failed to upload PDF. Please try again later.");
          reject(err); // Reject the Promise if upload fails
        });
    });
  };

  function submitHandler(event) {
    event.preventDefault();

    // Check if any field is blank
    for (const key in formData) {
      const value = formData[key];
      if (typeof value === "string" && !value.trim()) {
        toast.warning(`Please enter a value for ${key}.`);
        return;
      }
    }

    if (!selectedFile) {
      toast.warning("Please upload the PDF.");
      return;
    }

    // Proceed with uploading the selected file
    postDetails(selectedFile)
      .then(() => {
        // PDF upload successful, now submit the form
        if (buttonClicked) {
          toast.error("Form already submitted");
          return;
        }

        // Update resultPDFURI in the formData object to the value of PDFURI
        const updatedFormData = {
          StudentID: formData.studentId,
          Graduation_Year: formData.graduation_year,
          Marks_Obtained: formData.marks_obtained,
          CGPA: formData.CGPA,
          percentage: formData.percentage,
          resultStatus: formData.resultStatus,
          resultPDF: pdfUrl, // Use the correct field name as expected by the backend
        };

        console.log("Submitting the following data:", updatedFormData);

        // Submit the form
        setButtonClicked(true);
        onSubmit(updatedFormData);
      })
      .catch((error) => {
        // PDF upload failed, display error message
        console.error("Error uploading PDF:", error);
        toast.error("Failed to upload PDF. Please try again later.");
      });
  }

  return (
    <>
      <MainNavbar userType={"student"} userData={student} />
      <motion.Container
        className="result-Upload-Container"
        maxWidth="xl"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "70px",
          width: "50%",
          gap: "20px",
          transition: "all linear 0.4s",
        }}
        ref={ref}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={variants}
      >
        <Typography
          variant="h4"
          className="result-Upload-Heading"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: "400",
            fontSize: "40px",
            transition: "all ease 2s",
          }}
        >
          {heading}
        </Typography>
        <motion.form
          onSubmit={submitHandler}
          style={{
            display: "flex",
            width: "70%",
            boxShadow:
              "rgba(255,165,0) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
            borderRadius: "20px",
            fontWeight: "500",
            padding: "10px",
            flexDirection: "column",
            gap: "15px",
            justifyContent: "center",
          }}
          className="result-upload-form"
          variants={variants}
        >
          <motion.div className="result-form-div" variants={variants}>
            <motion.label
              htmlFor="student-id"
              className="result-form-label"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "2px",
              }}
              variants={variants}
            >
              Student ID
            </motion.label>
            <motion.input
              type="text"
              name="studentId"
              id="student-id"
              value={formData.studentId}
              placeholder="Enter Valid PRN"
              onClick={() => handleDisabledFieldClick("Student ID")}
              className="outline"
              style={{
                padding: "10px",
                backgroundColor: "transparent",
                height: "15px",
                border:
                  theme === "dark" ? "1px solid #e8e8e8" : "1px solid #535C91",
                color: "inherit",
                borderRadius: "5px",
                fontFamily: "Montserrat",
              }}
              variants={variants}
              disabled
              required
            />
          </motion.div>
          <motion.div className="result-form-div" variants={variants}>
            {" "}
            <motion.label
              htmlFor="graduation_year"
              className="result-form-label"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "2px",
              }}
              variants={variants}
            >
              Graduation Year
            </motion.label>
            <motion.input
              type="text"
              name="graduation_year"
              id="graduation_year"
              value={formData.graduation_year}
              onClick={() => handleDisabledFieldClick("Graduation Year")}
              placeholder="Enter Graduation Year"
              className="outline"
              style={{
                padding: "10px",
                backgroundColor: "transparent",
                height: "15px",
                border:
                  theme === "dark" ? "1px solid #e8e8e8" : "1px solid #535C91",
                color: "inherit",
                borderRadius: "5px",
                fontFamily: "Montserrat",
              }}
              disabled
              variants={variants}
              required
            />
          </motion.div>
          <motion.div className="result-form-div" variants={variants}>
            <motion.label
              htmlFor="cgpa"
              className="result-form-label"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "2px",
              }}
              variants={variants}
            >
              CGPA
            </motion.label>
            <motion.input
              type="text"
              name="CGPA"
              id="cgpa"
              value={formData.CGPA}
              onChange={changeHandler}
              placeholder="Enter CGPA"
              className="outline"
              style={{
                padding: "10px",
                backgroundColor: "transparent",
                height: "15px",
                border:
                  theme === "dark" ? "1px solid #e8e8e8" : "1px solid #535C91",
                color: "inherit",
                borderRadius: "5px",
                fontFamily: "Montserrat",
              }}
              variants={variants}
              required
            />
          </motion.div>
          <motion.div className="result-form-div" variants={variants}>
            <motion.label
              className="result-form-label"
              htmlFor="percentage"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "2px",
              }}
              variants={variants}
            >
              Percentage
            </motion.label>
            <motion.input
              type="text"
              name="percentage"
              id="percentage"
              value={formData.percentage}
              onChange={changeHandler}
              placeholder="Enter Percentage"
              className="outline"
              style={{
                padding: "10px",
                backgroundColor: "transparent",
                height: "15px",
                border:
                  theme === "dark" ? "1px solid #e8e8e8" : "1px solid #535C91",
                color: "inherit",
                borderRadius: "5px",
                fontFamily: "Montserrat",
              }}
              variants={variants}
              required
            />
          </motion.div>
          <motion.div className="result-form-div" variants={variants}>
            <motion.label
              htmlFor="marks"
              className="result-form-label"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "2px",
              }}
              variants={variants}
            >
              Marks Obtained
            </motion.label>
            <motion.input
              type="text"
              name="marks_obtained"
              id="marks"
              value={formData.marks_obtained}
              onChange={changeHandler}
              placeholder="Enter Total Marks"
              className="outline"
              style={{
                padding: "10px",
                backgroundColor: "transparent",
                height: "15px",
                border:
                  theme === "dark" ? "1px solid #e8e8e8" : "1px solid #535C91",
                color: "inherit",
                borderRadius: "5px",
                fontFamily: "Montserrat",
              }}
              variants={variants}
              required
            />
          </motion.div>
          <motion.div className="result-form-div" variants={variants}>
            <motion.label
              htmlFor="resultStatus"
              className="result-form-label"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "2px",
              }}
              variants={variants}
            >
              Result Status
            </motion.label>
            <motion.select
              name="resultStatus"
              id="resultStatus"
              value={formData.resultStatus}
              onChange={changeHandler}
              className="outline"
              required
              style={{
                width: "60%",
                padding: "10px",
                backgroundColor: theme === "dark" ? "#222" : "transparent",
                color: theme === "dark" ? "#fff" : "inherit",
                borderRadius: "5px",
                fontFamily: "Montserrat",
                alignSelf: "flex-start",
                fontWeight: "bolder",
              }}
              variants={variants}
            >
              <motion.option value="PASS">PASS</motion.option>
              <motion.option value="FAIL">FAIL</motion.option>
              <motion.option value="ATKT">ATKT</motion.option>
            </motion.select>
          </motion.div>
          <motion.div className="result-form-div" variants={variants}>
            {" "}
            <motion.label
              htmlFor="resultPDF"
              className="result-form-label"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "2px",
              }}
              variants={variants}
            >
              Result PDF
            </motion.label>
            <motion.input
              type="file"
              accept="application/pdf"
              name="resultPDFURI"
              id="resultPDF"
              onChange={handleFileChange}
              placeholder="Enter Your Result PDF"
              className="outline"
              style={{
                padding: "10px",
                backgroundColor: "transparent",
                height: "15px",
                border:
                  theme === "dark" ? "1px solid #e8e8e8" : "1px solid #535C91",
                color: "inherit",
                borderRadius: "5px",
                fontFamily: "Montserrat",
              }}
              variants={variants}
              required
            />
          </motion.div>

          <motion.button
            className="result-Upload-button"
            disabled={buttonClicked}
            onClick={submitHandler}
          >
            {loading ? "Uploading..." : "Upload"}
          </motion.button>
        </motion.form>
      </motion.Container>
    </>
  );
}

export default ResultUploadForm;
