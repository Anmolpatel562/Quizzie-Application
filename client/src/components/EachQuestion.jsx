import React from "react";
import styles from "../components_css/EachQuestion.module.css";

const EachQuestion = ({ question }) => {
  const clickHandler = (e) => {
    console.log(question.questionNumber);
  };
  return (
    <div>
      <div className={styles.circleContainer}>
        <div
          className={styles.circle}
          onClick={() => {
            clickHandler("Hello");
          }}
        >
          {question.questionNumber}
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default EachQuestion;
