import React, { useEffect, useState } from "react";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import styles from "../pages_css/LoginSignUpPage.module.css";
import { useLocation } from "react-router-dom";

const LoginSignUpPage = () => {

  const [selectedBtn, setSelectedBtn] = useState({
    name: "signUp",
    signUpcss: "0px 0px 30px 0px rgb(175, 180, 249)",
    loginCss: "",
  });

  const location = useLocation();
  useEffect(()=>{
    if (location.state === "navigated from logout"){
      setSelectedBtn({
            name: "login",
            signUpcss: "",
            loginCss: "0px 0px 30px 0px rgb(175, 180, 249)",
          });
    }
  },[])
  
  const changeBtnHandler = (btnName) => {
    if (btnName === "login") {
      setSelectedBtn({
        name: "login",
        signUpcss: "",
        loginCss: "0px 0px 30px 0px rgb(175, 180, 249)",
      });
      return;
    }
    setSelectedBtn({
      name: "signUp",
      signUpcss: "0px 0px 30px 0px rgb(175, 180, 249)",
      loginCss: "",
    });
  };

  return (
    <div className={styles.topContainer}>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.appName}>QUIZZIE</div>
          <div style={{ display: "flex", gap: "2rem" }}>
            <button
              style={{ boxShadow: selectedBtn.signUpcss }}
              className={styles.loginSignUpBtn}
              onClick={() => changeBtnHandler("signUp")}
            >
              Sign Up
            </button>
            <button
              style={{ boxShadow: selectedBtn.loginCss }}
              className={styles.loginSignUpBtn}
              onClick={() => changeBtnHandler("login")}
            >
              Log In
            </button>
          </div>
          {selectedBtn.name === "signUp" ? (
            <SignUp
              selectedBtn={selectedBtn}
              setSelectedBtn={setSelectedBtn}
            ></SignUp>
          ) : (
            <Login></Login>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignUpPage;
