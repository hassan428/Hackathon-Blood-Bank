import { Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Input_field } from "../component/Input_field";
import { Btn } from "../component/Btn";
import { TbPasswordUser } from "react-icons/tb";
import { MdDateRange, MdMarkEmailUnread } from "react-icons/md";
import { SiNamecheap } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from "styled-components";
import { CustomSelect } from "../component/CustomSelect";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../config/firebaseConfig";
import { child, get, ref, set } from "firebase/database";
import { setHitDatabase } from "../store/slices/userLoggedSlice";
import { getUserData } from "../store/slices/userDataSlice";
import { getOtherUserData } from "../store/slices/anOtherUserSlice";

// import { sendData } from '../component/firebaseMethod';

export const SignUp = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;

  const store = useSelector((store) => store);
  const { hitDatabase } = store.userLogged;

  const { bloodGroups, selectedGroups } = store.bloodGroup;
  const [signUp, setSignUp] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const dispatch = useDispatch();
  const filter = bloodGroups.find((obj) => obj.value == selectedGroups);

  // console.log(bloodGroup);

  // handle input fields
  const input_value = (value, id) => {
    if (id == "username") {
      if (value.length <= 10) {
        value = value.split(" ").join(``);
        setUserNameInput(value)
        setErrMsg("")
        setSignUp({ ...signUp, [id]: value });
      }
      else {
        setUserNameInput(userNameInput);
        setErrMsg("Username must be 10 characters or less.")
      }
    } else {
      setSignUp({ ...signUp, [id]: value });
    }


  };
  console.log(signUp);

  const onSubmit = (e) => {
    e.preventDefault();

    const sendUserData = (data, path) => {
      set(ref(database, "users/" + path), {
        ...data,
      }).then(() => {
      });
    }




    createUserWithEmailAndPassword(auth, signUp.email, signUp.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // console.log(user.uid);
        sendUserData({ ...signUp, uid: user.uid, bloodGroup: filter.bloodGroup }, `${user.uid}/`);
        // dispatch(setHitDatabase(!hitDatabase))
        // window.location.href = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorMessage);
        switch (errorCode) {
          case "auth/email-already-in-use":
            setErrMsg("Email already in use");
            break;
          case "auth/weak-password":
            setErrMsg("Password should be at least 6 characters");
            break;
          default:
            setErrMsg("Error:", errorMessage);
            break;
        }
      });
  };


  return (
    <>
      <div className="min-h-screen flex justify-start items-center bg-image ">
        <Paper
          elevation={24}
          square
          sx={{
            height: "100%",
            bgcolor: secondary.main,
            borderRadius: 2,
            m: "10px",
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
              //   bgcolor: primary.main,
            }}
          >
            Sign UP
          </Typography>

          <form onSubmit={onSubmit} className="p-2">
            {/* First & Last Name */}
            <div className="flex items-center space-x-2">
              <Input_field
                placeholder="First Name"
                id="firstName"
                input_value={input_value}
                classname="mx-2"
                startAdornment={<SiNamecheap className="text-lg text-primary-main" />}
              />
              <Input_field
                placeholder="Last Name"
                id="lasttName"
                input_value={input_value}
                classname="mx-2"
                startAdornment={<SiNamecheap className="text-lg text-primary-main" />}
              />
            </div>

            {/* Username */}
            <Input_field
              placeholder="Username"
              id="username"
              input_value={input_value}
              classname="mx-2"
              val={userNameInput}
              startAdornment={<SiNamecheap className="text-lg text-primary-main" />}
            />

            {/* Date of Birth */}
            <Input_field
              type="date"
              placeholder="Date of Birth"
              id="birthDate"
              input_value={input_value}
              classname="mx-2 my-1"
              startAdornment={<MdDateRange className="text-lg text-primary-main" />}
            />

            <CustomSelect />

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

            {/* Confirm Password */}
            {/* <Input_field
              type="password"
              placeholder="Enter  Confirm Password"
              id="confirmPassword"
              input_value={input_value}
              classname="mx-2"
              startAdornment={<TbPasswordUser className="text-lg text-primary-main" />}
            /> */}

            {/* error Message */}
            <Typography
              variant="p"
              sx={{
                fontSize: "small",
                mb: 10,
                textAlign: "center",
                fontWeight: "bold",
                color: "red",
              }}
            >
              {errMsg}
            </Typography>



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
                Already have an account?
                <Link to="/" style={{ color: "rgb(107 33 168)" }}>
                  {" "}
                  Login
                </Link>
              </Typography>
            </div>

            {/* Sign Up Button */}
            <Btn
              tooltip_text="SignUP"
              type="submit"
              text="Sign UP"
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
};
