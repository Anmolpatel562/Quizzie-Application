import React, { useEffect, useState } from "react";
import styles from "../pages_css/HomePage.module.css";
import Dashboard from "../components/Dashboard";
import CreateQuiz from "../components/CreateQuiz";
import Analytics from "../components/Analytics";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [dashBoardRender, setDashBoardRender] = useState(0);
  const [showQuestionWiseAnalysis, setShowQuestionWiseAnalysis] =
    useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [allQuizs, setAllQuizs] = useState([]);
  const [quizList, setQuizList] = useState([]);
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState({
    name: "Dashboard",
    dashboardCss: "rgb(192, 192, 192) 0px 0px 15px -3px",
    analyticsCss: "",
    createQuizCss: "",
  });

  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = () => {
    const userDetails = JSON.parse(localStorage.getItem("token"));
    if(!userDetails){
      navigate('/userLoginSignUpPage');
      return;
    }
    const userId = userDetails.userId;
    setUserId(userId);
  };

  const selectedPanelHandler = (name) => {
    setShowQuestionWiseAnalysis(false);

    if (name === "Analytics") {
      setSelectedFeature({
        name: "Analytics",
        dashboardCss: "",
        analyticsCss: "rgb(192, 192, 192) 0px 0px 15px -3px",
        createQuizCss: "",
      });
    } else if (name === "Dashboard") {
      setSelectedFeature({
        name: "Dashboard",
        dashboardCss: "rgb(192, 192, 192) 0px 0px 15px -3px",
        analyticsCss: "",
        createQuizCss: "",
      });
    } else {
      setShowCreateQuiz(true);
    }
  };

  const logoutBtnHandler = () => {
    localStorage.removeItem("token");
    navigate("/userLoginSignUpPage", {
      state: "navigated from logout",
    });
  };

  return (
    <div className={styles.topContainer}>
      <div className={styles.sideBar}>
        <div className={styles.appName}>QUIZZIE</div>
        <div className={styles.featuresDiv}>
          <button
            style={{ boxShadow: selectedFeature.dashboardCss }}
            className={styles.features}
            onClick={() => selectedPanelHandler("Dashboard")}
          >
            Dashboard
          </button>
          <button
            style={{ boxShadow: selectedFeature.analyticsCss }}
            className={styles.features}
            onClick={() => selectedPanelHandler("Analytics")}
          >
            Analytics
          </button>
          <button
            className={styles.features}
            onClick={() => selectedPanelHandler("CreateQuiz")}
          >
            Create Quiz
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "120px",
              height: "1px",
              backgroundColor: "#474444",
              marginBottom: "15px",
            }}
          ></div>
          <div
            style={{ cursor: "pointer", fontWeight: "600", fontSize: "18px" }}
            onClick={logoutBtnHandler}
          >
            LOGOUT
          </div>
        </div>
      </div>
      <div className={styles.mainSection}>
        {showCreateQuiz ? (
          <CreateQuiz
            showCreateQuiz={showCreateQuiz}
            setShowCreateQuiz={setShowCreateQuiz}
            dashBoardRender={dashBoardRender}
            setDashBoardRender={setDashBoardRender}
            userId={userId}
          />
        ) : (
          <></>
        )}
        {selectedFeature.name === "Dashboard" ? (
          <Dashboard
            dashBoardRender={dashBoardRender}
            setDashBoardRender={setDashBoardRender}
            allQuizs={allQuizs}
            setAllQuizs={setAllQuizs}
          />
        ) : selectedFeature.name === "Analytics" ? (
          <Analytics
            dashBoardRender={dashBoardRender}
            setDashBoardRender={setDashBoardRender}
            showQuestionWiseAnalysis={showQuestionWiseAnalysis}
            setShowQuestionWiseAnalysis={setShowQuestionWiseAnalysis}
            allQuizs={allQuizs}
            setAllQuizs={setAllQuizs}
            quizList={quizList}
            setQuizList={setQuizList}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default HomePage;
