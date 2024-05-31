import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Input_field } from "../component/Input_field";
import { Btn } from "../component/Btn";
import { TbPasswordUser } from "react-icons/tb";
import { MdMarkEmailUnread } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginSuccess } from "../store/slices/userLoggedSlice";
import { SiNamecheap } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from "styled-components";
import { CustomSelect } from "../component/CustomSelect";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";


export const LogIn = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  const [logIn, setLogIn] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const { userData } = store
  const { bloodGroups, selectedGroups } = store.bloodGroup;
  const filter = bloodGroups.find((obj) => obj.value == selectedGroups);
  // console.log(filter)
  // console.log("userData", userData)
  // const navigate = useNavigate();

  // handle input fields

  const input_value = (value, id) => {
    setLogIn({ ...logIn, [id]: value, });
  };



  // console.log(logIn)


  const onSubmit = (e) => {
    e.preventDefault();


    signInWithEmailAndPassword(auth, logIn.email, logIn.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorMessage);
        switch (errorCode) {
          case "auth/user-not-found":
            setErrMsg("User not found");
            break;
          case "auth/wrong-password":
            setErrMsg("Incorrect password");
            break;
          default:
            setErrMsg("Error:", errorMessage);
            break;
        }
      });

  };

  // const LogINGoole = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       const user = result.user;
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // console.log(errorMessage);
  //       const email = error.customData.email;
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //     });
  // };

  return (
    <>
      <div className="min-h-screen flex justify-start items-center bg-image ">
        <Paper
          elevation={24}
          square
          sx={{
            height: "100%",
            bgcolor: secondary.main,
            m: "10px",
            objectFit: "contain",
            border: `5px solid ${primary.main}`,
            width: "50%",
            "@media(max-width: 500px)": {
              width: "100%",
            },

          }}
        >
          <Typography
            variant="h4"
            sx={{
              "@media(max-width: 500px)": {
                fontSize: "xx-large",
              },
              color: primary.main,
              fontSize: "50px",
              borderBottom: `5px solid ${primary.main}`,
              p: 1,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Log IN
          </Typography>

          <form onSubmit={onSubmit} className="p-2">
            <Box component="fieldset" sx={{ mt: 3, mb: 2, display: "flex", flexDirection: "column", gap: "5px" }}>

              <Input_field
                placeholder="Username"
                id="username"
                input_value={input_value}
                classname="mx-2"
                startAdornment={<SiNamecheap className="text-lg text-primary-main" />}
              />
              {/* <CustomSelect /> */}

              {/* Email*/}
              <Input_field
                type="email"
                placeholder="Enter Email"
                id="email"
                input_value={input_value}
                classname="mx-2 my-1"
                startAdornment={<MdMarkEmailUnread className="text-lg text-primary-main" />}
              />

              {/* Password */}
              <Input_field
                type="password"
                placeholder="Enter Password"
                id="password"
                input_value={input_value}
                classname="mx-2 my-1"
                startAdornment={<TbPasswordUser className="text-lg text-primary-main" />}
              />

              {/* error Message */}
              <Typography
                variant="p"
                sx={{
                  fontSize: "small",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                {errMsg}
              </Typography>
            </Box>


            {/* Already have an accounts */}
            <div className="text-center mb-1">
              <Typography
                variant="p"
                sx={{
                  mb: 10,
                  fontSize: "medium",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Don't have an account?
                <Link to="/signup" style={{ color: "rgb(107 33 168)" }}>
                  {" "}
                  SignUp
                </Link>
              </Typography>
            </div>

            {/* Log in Button */}
            <Btn
              tooltip_text="Login"
              type="submit"
              text="Login"
              sx={{
                mx: 0,
                "@media(max-width: 500px)": {
                  mx: 0,
                },
                fontSize: "larger",
                p: 0,
                width: "100%",
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
              }}
            />
          </form>
        </Paper>
      </div>
    </>
  );
}
