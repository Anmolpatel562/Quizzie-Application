import React, { useEffect, useState } from "react";
import styles from "../components_css/Dashboard.module.css";
import QuizChip from "./QuizChip";
import { countNoOfQuizByUserId } from "../auth/Quiz";
import {countNumberOfQuestionCreatedByUserId} from "../auth/Quiz"
import { getQuizUrlDetailsByUserId } from "../auth/shareLink";
import { useNavigate } from "react-router-dom";
import { formateData } from "../utility/FormateDataInK";

import { toast } from "react-toastify";
import loading from "../resources/loading.gif";

const Dashboard = ({ dashBoardRender, setAllQuizs }) => {
  const navigate = useNavigate();
  const [topQuiz,setTopQuiz] = useState([]);
  const [totalCreatedQuiz, setTotalCreatedQuiz] = useState(0);
  const [totalQuestionsCreated, setTotalQuestionsCreated] = useState(0);
  const [totalImpression, setTotalImpression] = useState(0);
 
  const [formattedDataImpression, setFormattedDataImpression] = useState({
    add: false,
    impression: "",
  });
  const [formattedQuestionCreated, setFormattedQuestionCreated] = useState({
    add: false,
    questionCreated: "",
  });
  const [formattedQuizCreated, setFormattedQuizCreated] = useState({
    add: false,
    quizCreated: "",
  });

  const [showTotalQuizLoading, setShowTotalQuizLoading] = useState(true);
  const [showTotalQuestionLoading, setShowTotalQuestionLoading] =
    useState(true);
  const [showTotalImpressionLoading, setShowTotalImpressionLoading] =
    useState(true);

  useEffect(() => {
    fetchDashBoardData();
  }, [dashBoardRender]);

  const fetchDashBoardData = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("token"));
      const userId = userDetails.userId;
      const token = userDetails.token;

      const quizCount = await countNoOfQuizByUserId(userId,token);
      if(quizCount === "Invalid Token"){
        localStorage.removeItem("token");
        navigate("/userLoginSignUpPage");
        return;
      }
      setTotalCreatedQuiz(quizCount);

      setShowTotalQuizLoading(false);

      

      const questionCount = await countNumberOfQuestionCreatedByUserId(userId)
      setTotalQuestionsCreated(questionCount);

      setShowTotalQuestionLoading(false);

      const quizUrlDetails = await getQuizUrlDetailsByUserId(userId);
      if (!quizUrlDetails) {
        toast.error("Something went wrong !");
        return;
      }
      const quizList = quizUrlDetails;
      setAllQuizs(quizUrlDetails);
      setShowTotalImpressionLoading(false);
      

      quizList.sort((a, b) => b.impression - a.impression);
      const top12Quiz = quizList.slice(0, 12);
      const trendingQuiz = top12Quiz.filter((quiz) => quiz.impression > 10);

      setTopQuiz(trendingQuiz);

      var sum = 0;
      quizUrlDetails.map((quiz) => {
        sum = sum + quiz.impression;
      });

      if (sum > 999) {
        var data = formateData(sum);
        setFormattedDataImpression({ add: true, impression: data });
      }
      setTotalImpression(sum);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.topContainer}>
      <div className={styles.activitiesDone}>
        {!showTotalQuizLoading ? (
          <div className={styles.activityBox}>
            <div style={{ color: "#FF5D01" }} className={styles.numberDiv}>
              {formattedQuizCreated.add ? (
                <span>{formattedQuizCreated.quizCreated}</span>
              ) : (
                <span>{totalCreatedQuiz}&nbsp;</span>
              )}
              <span className={styles.span}>Quiz</span>
            </div>
            <div
              style={{ color: "#FF5D01" }}
              className={styles.bottomTextActivity}
            >
              Created
            </div>
          </div>
        ) : (
          <div className={styles.activityBox}>
            <img style={{ width: "40px" }} src={loading}></img>
          </div>
        )}

        {!showTotalQuestionLoading ? (
          <div className={styles.activityBox}>
            <div style={{ color: "#60B84B" }} className={styles.numberDiv}>
              {formattedQuestionCreated.add ? (
                <span>{formattedQuestionCreated.questionCreated}</span>
              ) : (
                <span>{totalQuestionsCreated}&nbsp;</span>
              )}
              <span className={styles.span}>questions</span>
            </div>
            <div
              style={{ color: "#60B84B" }}
              className={styles.bottomTextActivity}
            >
              Created
            </div>
          </div>
        ) : (
          <div className={styles.activityBox}>
            <img style={{ width: "40px" }} src={loading}></img>
          </div>
        )}

        {!showTotalImpressionLoading ? (
          <div className={styles.activityBox}>
            <div style={{ color: "#5076FF" }} className={styles.numberDiv}>
              {formattedDataImpression.add ? (
                <span>{formattedDataImpression.impression}&nbsp;</span>
              ) : (
                <span>{totalImpression}&nbsp;</span>
              )}
              <span className={styles.span}>Total</span>
            </div>
            <div
              style={{ color: "#5076FF" }}
              className={styles.bottomTextActivity}
            >
              Impressions
            </div>
          </div>
        ) : (
          <div className={styles.activityBox}>
            <img style={{ width: "40px" }} src={loading}></img>
          </div>
        )}
      </div>
      <div className={styles.quizDetails}>
        <div style={{ fontSize: "35px" }}>Trending Quizs</div>
        <div className={styles.quizChips}>
          {topQuiz?.map((quizDetails) => {
            return (
              <QuizChip
                key={quizDetails._id}
                quizDetails={quizDetails}
              ></QuizChip>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
