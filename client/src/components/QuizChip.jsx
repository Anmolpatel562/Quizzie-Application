import React from "react";
import styles from "../components_css/QuizChip.module.css";
import eye from "../resources/view.png";
import { convertDateFormate } from "../utility/convertDateFormate.js";

const QuizChip = ({ quizDetails }) => {
 
  const date = convertDateFormate(quizDetails.created_at);
  return (
    <div className={styles.topContainer}>
      <div className={styles.wrapper}>
        <div className={styles.quizNameContainer}>
          <div className={styles.quizName}>{quizDetails.quizName}</div>
          <div style={{color:"#FF5D01"}}>
            {quizDetails.impression}
            <img
              style={{ width: "14px", height: "14px", marginLeft: ".3rem" }}
              src={eye}
            />
          </div>
        </div>
        <div className={styles.dateContainer} style={{ fontSize: "12px", color: "#60B84B" }}>
          Created on : {date}
        </div>
      </div>
    </div>
  );
};

export default QuizChip;
