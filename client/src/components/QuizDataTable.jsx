import React from "react";
import styles from "../components_css/QuizDataTable.module.css";
import { convertDateFormate } from "../utility/convertDateFormate";
import { toast } from "react-toastify";
import edit from "../resources/edit.png";
import share from "../resources/share.png";
import del from "../resources/del.png";
import { CopyToClipboard } from "react-copy-to-clipboard";

const QuizDataTable = ({
  quiz,
  index,
  setShowQuestionWiseAnalysis,
  setSelectedQuizQuizId,
  setFormatedDate,
  setImpression,
  setShowDeleteQuiz,
  setDeleteSelectedQuizId,
}) => {
  var even = index % 2 !== 0;

  const style = {
    backgroundColor: even ? " #B3C4FF" : "",
  };

  const date = convertDateFormate(quiz.created_at);

  const deleteQuizHandler = () => {
    setDeleteSelectedQuizId(quiz.quizId);
    setShowDeleteQuiz(true);
  };

  const handleQuestionWiseAnalysis = () => {
    setImpression(quiz.impression);
    setFormatedDate(quiz.created_at);
    setSelectedQuizQuizId(quiz.quizId);
    setShowQuestionWiseAnalysis(true);
  };

  return (
    <>
      <tr style={style}>
        <td className={`${styles.row2Item} ${styles.row2Item1}`}>
          {index + 1}
        </td>
        <td className={`${styles.row2Item}`}>{quiz.quizName}</td>
        <td className={`${styles.row2Item}`}>{date}</td>
        <td className={`${styles.row2Item}`}>{quiz.impression}</td>
        <td className={`${styles.row2Item} `}>
          <div className={styles.icons}>
            <img style={{ cursor: "pointer" }} src={edit}></img>
            <img
              style={{ cursor: "pointer" }}
              src={del}
              onClick={deleteQuizHandler}
            ></img>
            <CopyToClipboard
              text={quiz.quizUrl}
              onCopy={() => toast.success("Link Copied")}
            >
              <img
                style={{ cursor: "pointer" }}
                src={share}
              ></img>
            </CopyToClipboard>
          </div>
        </td>
        <td className={`${styles.row2Item} ${styles.row2Item6}`}>
          <u style={{ cursor: "pointer" }} onClick={handleQuestionWiseAnalysis}>
            Question Wise Analysis
          </u>
        </td>
      </tr>
    </>
  );
};

export default QuizDataTable;
