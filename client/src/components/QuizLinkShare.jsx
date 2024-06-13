import React, { useEffect, useState } from "react";
import styles from "../components_css/QuizLinkShare.module.css";
import { createQuiz } from "../auth/Quiz";
import { saveQuizUrlToDataBase } from "../auth/shareLink";
import vector from "../resources/Vector.png";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";


const frontEndUrl = process.env.REACT_APP_FRONTENDURL;

const QuizLinkShare = ({
  questionsArray,
  userId,
  quizName,
  setShowCreateQuiz,
  setShowCreateQuestionPanel,
  quizType,
  dashBoardRender,
  setDashBoardRender,
  timer
}) => {
  const [showLinkPage, setShowLinkPage] = useState(false);
  const [createdQuizId, setCreatedQuizId] = useState("");

  useEffect(() => {
    createNewQuiz();
  }, []);

  const createNewQuiz = async () => {
    try {

      const response = await createQuiz(
        quizName,
        userId,
        questionsArray,
        quizType,
        timer
      );
      if(!response){
        toast.error("Something went wrong");
      }
      const quizId = response.data.result._id;
      if (!quizId) {
        toast.error("Something went wrong please try again.");
        return;
      }
      const quizUrl = `${frontEndUrl}quizPage/${quizId}`;
      await saveQuizUrlToDataBase({ quizName, quizUrl, quizId, userId });
      setCreatedQuizId(`${frontEndUrl}quizPage/${quizId}`);
      setShowLinkPage(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopy = () => {
    toast.success("Link copied to Clipboard");
  };


  const handleCrossButton = () => {
    setShowCreateQuiz(false)
    setDashBoardRender(dashBoardRender+1);
  }

  return (
    <>
      {showLinkPage ? (
        <div className={styles.topContainer}>
          <img
            onClick={handleCrossButton}
            className={styles.cross}
            src={vector}
            alt="cross"
          ></img>
          <div className={styles.container}>
            <h1 style={{ fontSize: "35px", width: "500px" }}>
              Congrats your Quiz is Published!
            </h1>
            <div className={styles.linkContainer}>
              <input 
              value= {createdQuizId ? createdQuizId : "your link is here"}
              className={styles.link}>
               
              </input>
            </div>
            <CopyToClipboard text={createdQuizId} onCopy={handleCopy}>
              <div className={styles.buttonContainer}>
                <div>Share</div>
              </div>
            </CopyToClipboard>
          </div>
        </div>
      ) : (
        <div className={styles.topContainer}>
          <div className={styles.loadingPageContainer}>
            <div className={styles.loading}>Generating Link ...</div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizLinkShare;
