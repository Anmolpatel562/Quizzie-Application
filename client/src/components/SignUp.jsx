import React, { useState } from "react";
import styles from "../components_css/SignUp.module.css";
import { userSignUp } from "../auth/User";
import { toast } from "react-toastify";
import loading from "../resources/loading.gif";


const SignUp = ({ setSelectedBtn }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [nameEmpty, setNameEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(false);

  const [showLoading, setShowLoading] = useState(false);

  const inputDetailsHandler = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "name") {
      setNameEmpty(false);
    }
    if (event.target.name === "email") {
      setEmailEmpty(false);
    }
    if (event.target.name === "password") {
      setPasswordEmpty(false);
    }
    if (event.target.name === "confirmPassword") {
      setConfirmPasswordEmpty(false);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }else{
      return "";
    }
  };

  const signUpBtnHandler = async () => {

    if (userDetails.name === "") {
      setNameEmpty(true);
    }
    if (userDetails.email === "") {
      setEmailEmpty(true);
    }
    if (userDetails.password === "") {
      setPasswordEmpty(true);
    }
    if (userDetails.confirmPassword === "") {
      setConfirmPasswordEmpty(true);
    }

    if (
      userDetails.name === "" ||
      userDetails.email === "" ||
      userDetails.password === "" ||
      userDetails.confirmPassword === ""
    ) {
      return;
    }
    const isEmailFormateValid = validateEmail(userDetails.email);
    if(isEmailFormateValid !== ""){
      toast.error(isEmailFormateValid);
      return;
    }
    if (userDetails.password !== userDetails.confirmPassword) {
      setConfirmPasswordEmpty(true);
      return;
    }

    setShowLoading(true);

    const validUserDetails = {
      name:userDetails.name.trim(),
      email:userDetails.email.trim(),
      password:userDetails.password.trim(),
      confirmPassword:userDetails.confirmPassword.trim(),
    }

    const response = await userSignUp(validUserDetails);
    if (response?.message) {
      var message = response.message;
      if (message === "User with this email already exists !!") {
        setShowLoading(false);
        toast.error(message);
        return;
      }
      setShowLoading(false);
      toast.success(message);
      setSelectedBtn({
        name: "login",
        signUpcss: "",
        loginCss: "0px 0px 30px 0px rgb(175, 180, 249)",
      });
      return;
    }
    toast.error("Something went wrong");
  };

  return (
    <div className={styles.topContainer}>
      <div>
        <div className={styles.formDetailsContainer}>
          <div className={styles.fields}>
            <label className={styles.labelTag}>Name</label>
            {nameEmpty ? (
              <input
                style={{ border: ".1rem solid red" }}
                className={styles.inputFields}
                name="name"
                type="text"
                value={userDetails.name}
                onChange={inputDetailsHandler}
                placeholder="Invalid name"
              />
            ) : (
              <input
                className={styles.inputFields}
                name="name"
                type="text"
                value={userDetails.name}
                onChange={inputDetailsHandler}
              />
            )}
          </div>
          <div className={styles.fields}>
            <label className={styles.labelTag}>Email</label>
            {emailEmpty ? (
              <input
                style={{ border: ".1rem solid red" }}
                className={styles.inputFields}
                name="email"
                type="text"
                value={userDetails.email}
                onChange={inputDetailsHandler}
                placeholder="Invalid email"
              />
            ) : (
              <input
                className={styles.inputFields}
                name="email"
                type="email"
                value={userDetails.email}
                onChange={inputDetailsHandler}
              />
            )}
          </div>
          <div className={styles.fields}>
            <label className={styles.labelTag}>Password</label>
            {passwordEmpty ? (
              <input
                style={{ border: ".1rem solid red" }}
                className={styles.inputFields}
                name="password"
                type="text"
                value={userDetails.password}
                onChange={inputDetailsHandler}
                placeholder="Weak password"
              />
            ) : (
              <input
                className={styles.inputFields}
                name="password"
                type="password"
                value={userDetails.password}
                onChange={inputDetailsHandler}
              />
            )}
          </div>
          <div className={styles.fields}>
            <label className={styles.labelTag}>Confirm Password</label>
            {confirmPasswordEmpty ? (
              <input
                style={{ border: ".1rem solid red" }}
                className={styles.inputFields}
                name="confirmPassword"
                type="text"
                value=""
                onChange={inputDetailsHandler}
                placeholder="password doesn’t match"
              />
            ) : (
              <input
                className={styles.inputFields}
                name="confirmPassword"
                type="password"
                value={userDetails.confirmPassword}
                onChange={inputDetailsHandler}
              />
            )}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button className={styles.signUpBtn} onClick={signUpBtnHandler}>
            Sign-Up
          </button>
        </div>
      </div>

      {showLoading ? (
        <div className={styles.loadingPanel} >
          <img style={{width:"60px"}} src={loading} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SignUp;
