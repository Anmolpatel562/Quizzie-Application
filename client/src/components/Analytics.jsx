import React, { useState } from "react";
import styles from "../components_css/Analytics.module.css";
import QuizDataTable from "./QuizDataTable";
import QuestionWiseAnalysis from "./QuestionWiseAnalysis";
import DeleteQuizComponent from "./DeleteQuizComponent";


const Analytics = ({
  dashBoardRender,
  setDashBoardRender,
  showQuestionWiseAnalysis,
  setShowQuestionWiseAnalysis,
  allQuizs,
}) => {
  const [render, setRender] = useState(0);
  const [selectedQuizQuizId, setSelectedQuizQuizId] = useState("");
  const [deleteSelectedQuizId, setDeleteSelectedQuizId] = useState("");
  const [selectedQuizUrl, setSelectedQuizUrl] = useState("");
  const [formateDate, setFormatedDate] = useState("");
  const [impression, setImpression] = useState(0);
  const [showDeleteQuiz, setShowDeleteQuiz] = useState(false);


  const setScroll = allQuizs.length > 10;

  const analyseContainerStyle = {
    overflowY: setScroll ? "scroll" : "",
  };

  return (
    <div className={styles.Container}>
      <div className={styles.wrapper}>
        <div className={styles.QuizAnalysisText}>Quiz Analysis</div>
        <div
          style={analyseContainerStyle}
          className={styles.AnalyticsContainer}
        >
          {allQuizs.length > 0 ? (
            <>
              <table className={styles.tableContainer}>
                <tr className={styles.row1}>
                  <td className={`${styles.row1Item} ${styles.row1Item1}`}>
                    S.No
                  </td>
                  <td className={`${styles.row1Item}`}>Quiz Name</td>
                  <td className={`${styles.row1Item}`}>Created on</td>
                  <td className={`${styles.row1Item}`}>Impression</td>
                  <td className={`${styles.row1Item}`}></td>
                  <td className={`${styles.row1Item} ${styles.row1Item4}`}></td>
                </tr>
                {allQuizs.map((quiz, index) => {
                  return (
                    <QuizDataTable
                      key={quiz._id}
                      quiz={quiz}
                      index={index}
                      render={render}
                      setRender={setRender}
                      showQuestionWiseAnalysis={showQuestionWiseAnalysis}
                      setShowQuestionWiseAnalysis={setShowQuestionWiseAnalysis}
                      setSelectedQuizQuizId={setSelectedQuizQuizId}
                      setFormatedDate={setFormatedDate}
                      setImpression={setImpression}
                      setShowDeleteQuiz={setShowDeleteQuiz}
                      setDeleteSelectedQuizId={setDeleteSelectedQuizId}
                      selectedQuizUrl={selectedQuizUrl}
                      setSelectedQuizUrl={setSelectedQuizUrl}
                    ></QuizDataTable>
                  );
                })}
                {showQuestionWiseAnalysis ? (
                  <QuestionWiseAnalysis
                    selectedQuizQuizId={selectedQuizQuizId}
                    formateDate={formateDate}
                    impression={impression}
                    setImpression={setImpression}
                  />
                ) : (
                  <></>
                )}
                {showDeleteQuiz ? (
                  <DeleteQuizComponent
                    deleteSelectedQuizId={deleteSelectedQuizId}
                    setShowDeleteQuiz={setShowDeleteQuiz}
                    render={render}
                    setRender={setRender}
                    dashBoardRender={dashBoardRender}
                    setDashBoardRender={setDashBoardRender}
                  ></DeleteQuizComponent>
                ) : (
                  <></>
                )}
              </table>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
