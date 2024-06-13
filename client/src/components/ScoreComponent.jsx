import React, { useEffect, useState } from "react";
import mobile from "../components_css/ScoreComponent.module.css";
import desktop from "../components_css/ScoreComponentDesktop.module.css";
import cup from "../resources/cup.png";

import {
  findByQuizIdAndUpdatePoll,
  findByQuizIdAndUpdateQna,
} from "../auth/Quiz";

const ScoreComponent = ({
  length,
  quizId,
  quizAnswersArray,
  quizType,
  questionsFromDB,
}) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 800);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 800);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  var styles = isDesktop ? desktop : mobile;

  const [score, setScore] = useState(0);

  useEffect(() => {
    calculateScore();
    updateDataToQuestionDataBase();
  }, []);

  const updateDataToQuestionDataBase = async () => {
    try {
      console.log(questionsFromDB);
      for (let i = 0; i < quizAnswersArray.length; i++) {
        console.log("i :", i);
        if (!quizAnswersArray[i].questionSkipped) {
          var questionNumber = quizAnswersArray[i].questionNo;
          if (quizType === "poll") {
            var poll1 =
              questionsFromDB[i].pollOption1 + quizAnswersArray[i].pollOption1;
            var poll2 =
              questionsFromDB[i].pollOption2 + quizAnswersArray[i].pollOption2;
            var poll3 =
              questionsFromDB[i].pollOption3 + quizAnswersArray[i].pollOption3;
            var poll4 =
              questionsFromDB[i].pollOption4 + quizAnswersArray[i].pollOption4;
            var data = {
              pollOption1: poll1,
              pollOption2: poll2,
              pollOption3: poll3,
              pollOption4: poll4,
            };
            const updatePollData = await findByQuizIdAndUpdatePoll(
              quizId,
              questionNumber,
              data
            );
          } else {
            var val1 =
              questionsFromDB[i].peopleAttemptedQuestions +
              quizAnswersArray[i].peopleAttemptedQuestions;
            var val2 =
              questionsFromDB[i].peopleAnsweredCorrectly +
              quizAnswersArray[i].peopleAnsweredCorrectly;
            var val3 =
              questionsFromDB[i].peopleAnswerIncorrect +
              quizAnswersArray[i].peopleAnswerIncorrect;
            var data = {
              peopleAttemptedQuestions: val1,
              peopleAnsweredCorrectly: val2,
              peopleAnswerIncorrect: val3,
            };
            const updateQnaData = await findByQuizIdAndUpdateQna(
              quizId,
              questionNumber,
              data
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateScore = () => {
    let sum = 0;
    for (let i = 0; i < quizAnswersArray.length; i++) {
      sum += quizAnswersArray[i].peopleAnsweredCorrectly;
    }
    setScore(sum);
    console.log(quizAnswersArray);
  };

  return (
    <div className={styles.topContainer}>
      <div className={styles.innerContainer}>
        {quizType === "poll" ? (
          <div className={styles.thankyouText}>
            Thank you <br /> for participating <br />
            in the Poll
          </div>
        ) : (
          <div>
            <div className={styles.contratulation}>
              Congrats Quiz is completed
            </div>
            <img src={cup}></img>
            <div className={styles.score}>
              Your Score is{" "}
              <span className={styles.scoreNumber}>
                0{score}/0{length}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreComponent;
