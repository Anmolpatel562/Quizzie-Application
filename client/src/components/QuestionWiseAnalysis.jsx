import React, { useEffect, useState } from "react";
import styles from "../components_css/QuestionWiseAnalysis.module.css";
import { toast } from "react-toastify";
import { convertDateFormate } from "../utility/convertDateFormate";
import { formateData } from "../utility/FormateDataInK";
import { getQuestionArrayByQuizId } from "../auth/Quiz";

const QuestionWiseAnalysis = ({
  selectedQuizQuizId,
  formateDate,
  impression,
  setImpression,
}) => {
  const [questionsArray, setQustionsArray] = useState([]);
  const [quizType, setQuizType] = useState("");

  const date = convertDateFormate(formateDate);

  useEffect(() => {
    fetchQuestionDetails();
  }, []);

  const fetchQuestionDetails = async () => {
    try {
      const quizDetails = await getQuestionArrayByQuizId(selectedQuizQuizId);
      const questionDetails = quizDetails.data.response.questionDetails;
      setQuizType(quizDetails.data.response.quizType);
      if (!questionDetails.length === 0) {
        toast.error("Something went wrong please try again !");
        return;
      }
      setQustionsArray(questionDetails);
    } catch (error) {
      console.log(error);
    }
    if (impression > 999) {
      var data = formateData(impression);
      setImpression(data);
    }
  };

  return (
    <div className={styles.topContainer}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.quizNo}>
            <span>{questionsArray[0]?.quizName}</span>
            <span>Question Analysis</span>
          </div>
          <div className={styles.timeContainer}>
            <div>Created on: {date}</div>
            <div>Impressions: {impression}</div>
          </div>
        </div>

        <div className={styles.allQuestionContainer}>
          {questionsArray.map((question, index) => {
            return (
              <>
                {quizType === "poll" ? (
                  // poll
                  <div>
                    <div className={styles.main}>
                      <div className={styles.questionText}>
                        Q.{index + 1} &nbsp; {question.questionText}
                      </div>
                      <div className={styles.questionContainer}>
                        <div className={styles.questionAnalysisContainerPoll}>
                          <div className={styles.numbersText}>
                            {question.pollOption1}
                          </div>
                          <div>Option 1</div>
                        </div>
                        <div className={styles.questionAnalysisContainerPoll}>
                          <div className={styles.numbersText}>
                            {question.pollOption2}
                          </div>
                          <div>Option 2</div>
                        </div>
                        <div className={styles.questionAnalysisContainerPoll}>
                          <div className={styles.numbersText}>
                            {question.pollOption3}
                          </div>
                          <div>Option 3</div>
                        </div>
                        <div className={styles.questionAnalysisContainerPoll}>
                          <div className={styles.numbersText}>
                            {question.pollOption4}
                          </div>
                          <div>Option 4</div>
                        </div>
                      </div>
                      <div className={styles.line}></div>
                    </div>
                  </div>
                ) : (
                  // qna
                  <div>
                    <div className={styles.main}>
                      <div className={styles.questionText}>
                        Q.{index + 1} &nbsp; {question.questionText}
                      </div>
                      <div className={styles.questionContainer}>
                        <div className={styles.questionAnalysisContainer}>
                          <div className={styles.numbersText}>
                            {question.peopleAttemptedQuestions}
                          </div>
                          <div>people Attempted the question</div>
                        </div>
                        <div className={styles.questionAnalysisContainer}>
                          <div className={styles.numbersText}>
                            {question.peopleAnsweredCorrectly}
                          </div>
                          <div>people Answered Correctly</div>
                        </div>
                        <div className={styles.questionAnalysisContainer}>
                          <div className={styles.numbersText}>
                            {question.peopleAnswerIncorrect}
                          </div>
                          <div>people Answer Incorrect</div>
                        </div>
                      </div>
                      <div className={styles.line}></div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionWiseAnalysis;
