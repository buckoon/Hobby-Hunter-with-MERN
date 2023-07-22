import { useState } from "react";
import { indigo } from '@mui/material/colors';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";



const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
 /* lastName: yup.string().required("required"),*/
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  /*location: yup.string().required("required"),*/
  /*occupation: yup.string().required("required"),*/
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
 /* lastName: "",*/
  email: "",
  password: "",
  /*location: "",*/
  /*occupation: "",*/
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [hasClickedSignUp, setHasClickedSignUp] = useState(false);

  const handleEmailFocus = () => {
    if (!hasClickedSignUp) {
      alert(
        "Feel free to sign in using the email: drake@gmail.com and password: abcabc if you prefer not to register with your own email. Please note that the application is hosted on a free deployment service, and there might be a brief delay of up to 15 seconds after submitting the login form while the page loads. Thank you for your understanding!"
      );
      setHasClickedSignUp(true);
    }
  };

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
  
    const savedUserResponse = await fetch(
      "https://hobby-hunter-api.onrender.com/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
  
    if (savedUser) {
      setPageType("login");
    }
  };
  
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      "https://hobby-hunter-api.onrender.com/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };
  

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <TextField
                sx={{ width: "60%", marginTop: "", marginBottom: "0.5rem", background: "white" }}
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                required
              />

              <TextField
                sx={{ width: "60%", marginTop: "", marginBottom: "0.5rem", background: "white" }}
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
               
              />
              
              <Box
                gridColumn="span 4"
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                p="1rem"
                sx={{ height: "4rem", width: "60%", marginBottom: "0.5rem", background: "white", border: "none" }}
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("picture", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border="2px dashed #4F46E5"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "2rem",
                        "&:hover": { cursor: "pointer" },
                      }}
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <p>Add Picture Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{values.picture.name}</Typography>
                          <EditOutlinedIcon />
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
            </>
          )}

          <TextField
            sx={{ width: "60%", marginTop: "", marginBottom: "0.5rem", background: "white" }}
          
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name="email"
            required
          />

          <TextField
            sx={{ width: "60%", marginTop: "", marginBottom: "0.5rem", background: "white" }}
            type="password"
            label="Password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            name="password"
            required
          />

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
          <Button
            sx={{
              width: "60%",
              height: "12",
              backgroundColor: "rgb(79 70 229)",
              border: "2px solid #3f51b5",
              borderRadius: "4px",
              color: "#ffffff",
              
              marginBottom: "0.75rem",
              "&:hover": {
                backgroundColor: "#8c9eff",
                borderColor: "#8c9eff",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              },
            }}
            type="submit"
          >
            {isLogin ? "Login" : "Register"}
          </Button>
            <Typography
              onClick={() => {
                handleEmailFocus();
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
