import { useEffect, useRef, useState } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
  Paper,
  TextField,
  styled,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

// import makeToast from "../../utils/toaster";
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "14px",
    height: "45px",
    "& fieldset": {},
    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {},
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
});

const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (isSuccess && user && loggedFlag) {
  //       makeToast("success", "Login Sucessful!");
  //       dispatch(resetLoggedInFlag());
  //       if (user.role === "admin") {
  //         navigate("/admin");
  //       } else {
  //         navigate("/");
  //       }
  //     }
  //     if (isError) {
  //       makeToast("error", message);
  //       dispatch(resetState());
  //     }
  //   }, [isSuccess, isLoading, user, loggedFlag]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#F6F9FC",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          bgcolor: "white",
          radius: "8px",
          width: isNonMobile ? "500px" : "95%",
          padding: isNonMobile ? "2rem 3rem" : "2rem 2rem",
          boxShadow: "rgba(3, 0, 71, 0.09) 0px 8px 45px",
        }}
      >
        <Formik
          onSubmit={(values, { resetForm }) => {}}
          initialValues={initialValues}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isValid,
            dirty,
          }) => (
            <form onSubmit={handleSubmit}>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Typography
                  textAlign="center"
                  color="text.primary"
                  variant="h5"
                  px="20px"
                >
                  chatMi
                </Typography>
              </Link>

              <Typography variant="body2" mt={1} mb={4} textAlign="center">
                Welcome To chatMi
              </Typography>

              <Box mb={2}>
                <Typography
                  variant="subtitle1"
                  fontSize="12px"
                  color="#4b566b"
                  mb={1.5}
                >
                  Email Or Username
                </Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  placeholder="me@romax.com"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.emailOruserName}
                  name="emailOruserName"
                  error={!!touched.emailOruserName && !!errors.emailOruserName}
                  helperText={touched.emailOruserName && errors.emailOruserName}
                />
              </Box>
              <Box mb={2}>
                <Typography
                  variant="subtitle1"
                  fontSize="12px"
                  color="#4b566b"
                  mb={1.5}
                >
                  Password
                </Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  placeholder="*********"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
              </Box>
              <Button
                type="submit"
                disabled={!isValid || !dirty}
                sx={{
                  textTransform: "none",

                  bgcolor:
                    !isValid || !dirty
                      ? "#0000001f !important"
                      : "primary.main",
                  color: "white",
                  fontSize: "14px",
                  paddingY: "10px",
                  fontWeight: 600,
                  width: "100%",
                  marginTop: "10px",
                  "&:hover": {
                    backgroundColor: "#E3364E",
                  },
                }}
              >
                Login
                {/* {isLoading ? "Loading..." : "Login"} */}
              </Button>
            </form>
          )}
        </Formik>

        <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
          <Typography variant="subtitle2">Don't have account?</Typography>
          <Link to={"/signup"} style={{ textDecoration: "none" }}>
            <Typography
              variant="subtitle1"
              color="#2b3445"
              sx={{
                borderBottom: "1.5px solid #2b3445",
              }}
            >
              Sign Up
            </Typography>
          </Link>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          mt={3}
          sx={{
            bgcolor: "#f3f5f9",
            paddingY: "20px",
            borderRadius: "5px",
          }}
        >
          <Typography variant="subtitle2">Forgot your password?</Typography>
          <Link to={"/forgot-password"} style={{ textDecoration: "none" }}>
            <Typography
              variant="subtitle1"
              color="#2b3445"
              sx={{
                borderBottom: "1.5px solid #2b3445",
              }}
            >
              Reset It
            </Typography>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

const loginSchema = yup.object().shape({
  emailOruserName: yup.string().required("Email or Username is required"),
  password: yup.string().required("required"),
});
const initialValues = {
  emailOruserName: "",
  password: "",
};
export default Login;
