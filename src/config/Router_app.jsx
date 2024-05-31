import React, { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "../component/Layout";
import { LogIn } from "../pages/LogIn";
import { SignUp } from "../pages/SignUp";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "./firebaseConfig";
import {
  setHitDatabase,
  setLoginSuccess,
  setUserID,
} from "../store/slices/userLoggedSlice";
import { useDispatch, useSelector } from "react-redux";
import { child, get, ref } from "firebase/database";
import { getUserData } from "../store/slices/userDataSlice";
import { getOtherUserData } from "../store/slices/anOtherUserSlice";
import { PrivateRoute } from "../pages/PrivateRoute";
import { Home } from "../pages/Home";
import { CustomLoader } from "../component/CustomLoader";
import { stopCheckUser } from "../store/slices/loaderSlice";
import { OtherUserDetails } from "../component/OtherUserDetails";
import { Request } from "../component/Request";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      <Route path="" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="home/:username" element={<OtherUserDetails />} />
        <Route path="request" element={<Request />} />
      </Route>
    </Route>
  )
);

export const Router_app = () => {
  const dispatch = useDispatch();

  const store = useSelector((store) => store);
  const { hitDatabase, loginSuccess } = store.userLogged;
  const { checkUser } = store.loader;

  const recieveUserData = (uid) => {
    get(child(ref(database), `users/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          dispatch(stopCheckUser(false));
          const data = snapshot.val();
          // console.log(data)
          const dataArr = Object.values(data);
          // console.log(uid)
          const myData = dataArr.find((v) => v?.uid === uid);

          // if (otherUserData.length === 0 || Object.keys(myData).length === 0) {
          if (Object.keys(myData).length === 0) {
            dispatch(setHitDatabase(!hitDatabase));
          } else {
            const otherUserData = dataArr.filter((v) => {
              if (v.uid !== uid) {
                if (
                  (myData.bloodGroup == "A+" ||
                    myData.bloodGroup == "B+" ||
                    myData.bloodGroup == "AB+") &&
                  v?.bloodGroup == "AB+"
                ) {
                  return v;
                }
                if (myData.bloodGroup == "A+" && v?.bloodGroup == "A+") {
                  return v;
                }
                if (myData.bloodGroup == "B+" && v?.bloodGroup == "B+") {
                  return v;
                }
                if (
                  (myData.bloodGroup == "A-" ||
                    myData.bloodGroup == "B-" ||
                    myData.bloodGroup == "AB-") &&
                  v?.bloodGroup == "AB-"
                ) {
                  return v;
                }
                if (myData.bloodGroup == "A-" && v?.bloodGroup == "A-") {
                  return v;
                }
                if (myData.bloodGroup == "B-" && v?.bloodGroup == "B-") {
                  return v;
                }
                if (myData.bloodGroup == "O+" && v?.bloodGroup == "O+") {
                  return v;
                }
                if (myData.bloodGroup == "O-" && v?.bloodGroup == "O-") {
                  return v;
                }
              }
            });
            console.log(otherUserData);
            dispatch(setLoginSuccess(true));
            dispatch(getUserData(myData));
            dispatch(getOtherUserData(otherUserData));
          }
          // console.log("myData:", myData)
          // console.log("otherUserData:", otherUserData)
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAuthentication = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(setUserID(uid));
        // Get User Data
        recieveUserData(uid);
        // console.log(uid)
      } else {
        dispatch(setLoginSuccess(false));
        dispatch(stopCheckUser(false));
      }
    });
  };

  useEffect(() => {
    handleAuthentication();
  }, [hitDatabase]);

  return checkUser ? <CustomLoader /> : <RouterProvider router={router} />;
};
