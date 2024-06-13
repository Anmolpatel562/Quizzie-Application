import { React, useState } from "react";
import styles from "../components_css/Login.module.css";
import { userLogin } from "../auth/User";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import loading from "../resources/loading.gif";


const Login = () => {
  const navigate = useNavigate();
  const [userLoginDetails, setUserLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [showLoading, setShowLoading] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);

  const inputDetailsHandler = (event) => {
    setUserLoginDetails({
      ...userLoginDetails,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "email") {
      setEmailEmpty(false);
    }
    if (event.target.name === "password") {
      setPasswordEmpty(false);
    }
  };

  const loginBtnHandler = async () => {

    if (userLoginDetails.email === "") {
      setEmailEmpty(true);
    }
    if (userLoginDetails.password === "") {
      setPasswordEmpty(true);
    }
    if (userLoginDetails.email === "" || userLoginDetails.password === "") {
      return;
    }

    setShowLoading(true);

    const response = await userLogin(userLoginDetails);
    if (response?.message) {
      var message = response.message;
      if (message === "Invalid Email") {
        setShowLoading(false);
        toast.error(message);
      } else if (message === "Invalid Password") {
        setShowLoading(false);
        toast.error(message);
      } else if (message === "User Logged in Successfully.") {
        setShowLoading(false);
        navigate("/homepage");
      }
      return;
    }
    setShowLoading(false);
    toast.error("Something went wrong");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formDetailsContainer}>
        <div className={styles.fields}>
          <label className={styles.labelTag}>Email</label>
          {emailEmpty ? (
            <input
              style={{ border: ".1rem solid red" }}
              className={styles.inputFields}
              name="email"
              type="email"
              value={userLoginDetails.email}
              onChange={inputDetailsHandler}
              placeholder="Please fill the Email"
            />
          ) : (
            <input
              className={styles.inputFields}
              name="email"
              type="email"
              value={userLoginDetails.email}
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
              value={userLoginDetails.password}
              onChange={inputDetailsHandler}
              placeholder="Please fill the Password"
            />
          ) : (
            <input
              className={styles.inputFields}
              name="password"
              type="password"
              value={userLoginDetails.password}
              onChange={inputDetailsHandler}
            />
          )}
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button className={styles.loginBtn} onClick={loginBtnHandler}>
          Log In
        </button>
      </div>
      {showLoading ? (
        <div className={styles.loadingPanel}>
          <img style={{ width: "60px" }} src={loading} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Login;
