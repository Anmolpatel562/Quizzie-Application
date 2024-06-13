import React, { useEffect, useState } from "react";
import styles from "../components_css/CreateQuiz.module.css";
import { toast } from "react-toastify";
import CreateQuestions from "./CreateQuestions";
import { useNavigate } from "react-router-dom";

const CreateQuiz = ({
  setShowCreateQuiz,
  dashBoardRender,
  setDashBoardRender,
  userId,
}) => {
  const [showCreateQuestionPanel, setShowCreateQuestionPanel] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [selectedQuizType, setSelectedQuizType] = useState({
    name: "",
    qna_bg: "",
    qna_color: "",
    poll_bg: "",
    poll_color: "",
    qnaboxShadow: "",
    pollboxShadow: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    checkIsUserLoggedIn();
  }, []);

  const checkIsUserLoggedIn = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("token"));
      if (!userDetails) {
        toast.error("Invalid User !");
        navigate("/userLoginSignUpPage");
        localStorage.clear();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const quidTypeHandler = (name) => {
    if (name === "q&a") {
      setSelectedQuizType({
        name: "q&a",
        qna_bg: "#60B84B",
        qna_color: "white",
        poll_bg: "",
        poll_color: "#9F9F9F",
      });
    } else if (name === "poll") {
      setSelectedQuizType({
        name: "poll",
        qna_bg: "",
        qna_color: "#9F9F9F",
        poll_bg: "#60B84B",
        poll_color: "white",
      });
    }
  };

  const continueBtnHandler = () => {
    if (quizName === "") {
      toast.error("Please enter the quiz name");
      return;
    }
    if (selectedQuizType.name === "") {
      toast.error("Select Quiz Type !");
      return;
    }
    setShowCreateQuestionPanel(true);
  };

  return (
    <>
      <div className={styles.topContainer}></div>
      {showCreateQuestionPanel ? (
        <CreateQuestions
          quizName={quizName}
          setShowCreateQuiz={setShowCreateQuiz}
          quizType={selectedQuizType.name}
          dashBoardRender={dashBoardRender}
          setDashBoardRender={setDashBoardRender}
          setShowCreateQuestionPanel={setShowCreateQuestionPanel}
          userId={userId}
        />
      ) : (
        <div className={styles.innerContainer}>
          <div className={styles.quizNameQuizType}>
            <input
              className={styles.inputFieldQuizName}
              type="text"
              placeholder="Quiz name"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
            />
            <div className={styles.quizType}>
              <div className={styles.quizTypeBtn}>Quiz Type</div>
              <div
                onClick={() => quidTypeHandler("q&a")}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: selectedQuizType.qna_color,
                  backgroundColor: selectedQuizType.qna_bg,
                }}
                className={styles.qnaBtn}
              >
                <div>Q & A</div>
              </div>
              <div
                className={styles.pollBtn}
                onClick={() => quidTypeHandler("poll")}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: selectedQuizType.poll_color,
                  backgroundColor: selectedQuizType.poll_bg,
                }}
              >
                <div>Poll Type</div>
              </div>
            </div>
          </div>
          <div className={styles.cancelContinueBtn}>
            <button
              className={styles.cancelBtn}
              onClick={() => setShowCreateQuiz(false)}
            >
              Cancel
            </button>
            <button className={styles.continueBtn} onClick={continueBtnHandler}>
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateQuiz;
