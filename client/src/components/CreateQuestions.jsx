import React, { useEffect, useState } from "react";
import styles from "../components_css/CreateQuestions.module.css";
import QuestionForm from "../components/QuestionForm";
import del from "../resources/del.png";
import xSign from "../resources/xSign.png";
import QuizLinkShare from "./QuizLinkShare";

const CreateQuestions = ({
  quizName,
  setShowCreateQuiz,
  quizType,
  dashBoardRender,
  setDashBoardRender,
  setShowCreateQuestionPanel,
  userId,
}) => {
  const [totalQuestions, setTotalQuestions] = useState(2);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptionType, setSelectedOptionType] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [timer, setTimer] = useState("Off");
  const [showQuizLinkPanel, setShowQuizLinkPanel] = useState(false);
  const [questionsArray, setQuestionsArray] = useState([
    {
      quizName: quizName,
      questionNumber: 1,
      questionText: "",
      optionType: "text",
      correctAnswer: "",
      timer: timer,
      option1Text: "",
      option1Url: "",
      option2Text: "",
      option2Url: "",
      option3Text: "",
      option3Url: "",
      option4Text: "",
      option4Url: "",
      peopleAttemptedQuestions: 0,
      peopleAnsweredCorrectly: 0,
      peopleAnswerIncorrect: 0,
      pollOption1: 0,
      pollOption2: 0,
      pollOption3: 0,
      pollOption4: 0,
    },
  ]);

  const addQuestionHandler = () => {
    if (totalQuestions > 5) {
      return;
    }
    const newQuestion = {
      quizName: quizName,
      questionNumber: totalQuestions,
      questionText: "",
      optionType: "text",
      correctAnswer: "",
      timer: timer,
      option1Text: "",
      option1Url: "",
      option2Text: "",
      option2Url: "",
      option3Text: "",
      option3Url: "",
      option4Text: "",
      option4Url: "",
      peopleAttemptedQuestions: 0,
      peopleAnsweredCorrectly: 0,
      peopleAnswerIncorrect: 0,
      pollOption1: 0,
      pollOption2: 0,
      pollOption3: 0,
      pollOption4: 0,
    };
    setQuestionsArray((prev) => [...prev, newQuestion]);
    setTotalQuestions(totalQuestions + 1);
    setSelectedQuestionIndex(selectedQuestionIndex + 1);
  };


  const handleClick = (index) => {
    console.log(index);
    setSelectedQuestionIndex(index);
  };

  const handleQuestionChange = (index, updatedQuestion) => {
    const updatedQuestions = questionsArray.map((q, i) =>
      i === index ? updatedQuestion : q
    );
    setQuestionsArray(updatedQuestions);
  };



  const createQuizHandler = () => {
    const newQuiz = {
      quizName: quizName,
      user: userId,
      questionDetails: questionsArray,
      timer: timer,
      quizType: quizType,
    };
    console.log(newQuiz);

    setShowQuizLinkPanel(true);
  };

  return (
    <>
      {showQuizLinkPanel ? (
        <QuizLinkShare
          questionsArray={questionsArray}
          userId={userId}
          quizName={quizName}
          setShowCreateQuestionPanel={setShowCreateQuestionPanel}
          setShowCreateQuiz={setShowCreateQuiz}
          quizType={quizType}
          dashBoardRender={dashBoardRender}
          setDashBoardRender={setDashBoardRender}
          timer={timer}
        ></QuizLinkShare>
      ) : (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.circleContainer}>
              <div className={styles.circleAndAddBtnContainer}>
                {questionsArray.map((question, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.circle}
                      onClick={() => handleClick(index)}
                    >
                      <div>{question.questionNumber}</div>
                    </div>
                  );
                })}
                <div className={styles.addBtn} onClick={addQuestionHandler}>
                  +
                </div>
              </div>
              <div>Max 5 questions</div>
            </div>
            {selectedQuestionIndex !== null && (
              <QuestionForm
                questionsArray={questionsArray}
                question={questionsArray[selectedQuestionIndex]}
                onChange={(updatedQuestion) =>
                  handleQuestionChange(selectedQuestionIndex, updatedQuestion)
                }
                quizType={quizType}
                setTimer={setTimer}
              />
            )}
          </div>
          <div className={styles.buttonContainer}>
            <div
              onClick={() => {
                setShowCreateQuestionPanel(false);
                setShowCreateQuiz(false);
              }}
              className={styles.cancelButton}
            >
              <div>Cancel</div>
            </div>
            <div
              onClick={createQuizHandler}
              className={styles.createQuizButton}
            >
              <div>Create Quiz</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateQuestions;
