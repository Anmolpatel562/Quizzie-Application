import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mobile from "../components_css/QuizPage.module.css";
import desktop from "../components_css/QuizPageDesktop.module.css";
import { getQuizByQuizId, findByQuizIdAndUpdate } from "../auth/shareLink";
import { toast } from "react-toastify";
import ScoreComponent from "./ScoreComponent";
import loadingGif from "../resources/loading.gif";

const QuizPage = () => {
  const { quizId } = useParams();
  const [quizDetails, setQuizDetails] = useState({
    quizType: "",
    quizName: "",
    timer: 0,
    questionDetails: [],
  });

  const [quizQuestions, setQuizQuestions] = useState([]);

  const [showScoreComponent, setShowScoreComponent] = useState(false);

  const [indexedQuestion, setIndexedQuestion] = useState(0);
  const [activeSubmitButton, setActiveSubmitButton] = useState(false);

  const [timer, setTimer] = useState(0);

  const [activeClickOption, setActiveClickedOption] = useState({
    option1BorderCss: "",
    option2BorderCss: "",
    option3BorderCss: "",
    option4BorderCss: "",
  });

  const [quizAnswersArray, setQuizAnswersArray] = useState([]);
  const [quizPollAnswer, setQuizPollAnswer] = useState({
    questionNo: 0,
    pollOption1: 0,
    pollOption2: 0,
    pollOption3: 0,
    pollOption4: 0,
    questionSkipped: true,
  });
  const [quizQnaAnswer, setQuizQnaAnswer] = useState({
    questionNo: 0,
    peopleAttemptedQuestions: 0,
    peopleAnsweredCorrectly: 0,
    peopleAnswerIncorrect: 0,
    questionSkipped: true,
  });

  const [loading, setLoading] = useState(true);
  const [prevTimer,setPrevTimer] = useState(0);
  const [showInvalidUrl, setShowInvalidUrl] = useState(false);

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  const fetchQuizDetails = async () => {
    try {
      const response = await getQuizByQuizId(quizId);
      if (!response) {
        toast.error("Invalid Url !");
        setShowInvalidUrl(true);
        return;
      }
      setQuizDetails({
        quizType: response.quizType,
        quizName: response.quizName,
        timer: 0,
        questionDetails: response.questionDetails,
      });
      if (response.timer === "5sec") {
        setTimer(5);
        setPrevTimer(5)
        
      } else if (response.timer === "10sec") {
        setTimer(10);
        setPrevTimer(10)
        
      } else {
        setTimer(0);
        setPrevTimer(0)
        
      }

      // Update Impression
      await findByQuizIdAndUpdate(quizId);

      setQuizQuestions(response.questionDetails);
      console.log(response.timer);
      console.log(quizDetails.quizType)

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const nextButtonHandler = () => {
    if (indexedQuestion < quizQuestions.length - 1) {
      setIndexedQuestion(indexedQuestion + 1);
      setTimer(prevTimer);
    }
    if (quizQuestions.length == 1) {
      setActiveSubmitButton(true);
    }
    setActiveClickedOption({});

    if (quizDetails.quizType === "poll") {
      setQuizAnswersArray((prevArray) => [...prevArray, quizPollAnswer]);
      setQuizPollAnswer({
        questionNo: 0,
        pollOption1: 0,
        pollOption2: 0,
        pollOption3: 0,
        pollOption4: 0,
        questionSkipped: true,
      });
    } else {
      setQuizAnswersArray((prevArray) => [...prevArray, quizQnaAnswer]);
      setQuizQnaAnswer({
        questionNo: 0,
        peopleAttemptedQuestions: 0,
        peopleAnsweredCorrectly: 0,
        peopleAnswerIncorrect: 0,
        questionSkipped: true,
      });
    }
  };

  const submitButtonHandler = () => {
    if (quizDetails.quizType === "poll") {
      setQuizAnswersArray((prevArray) => [...prevArray, quizPollAnswer]);
    } else {
      setQuizAnswersArray((prevArray) => [...prevArray, quizQnaAnswer]);
    }
    setShowScoreComponent(true);
  };

  useEffect(() => {
    if (indexedQuestion + 1 === quizQuestions.length) {
      setActiveSubmitButton(true);
    }
  });

  useEffect(() => {
    if (timer) {
      var time = timer;
      const interval = setInterval(() => {
        if (time === 1) {
          if (indexedQuestion === quizQuestions.length - 1) {
            clearInterval(interval);
            submitButtonHandler();
            return;
          }
          nextButtonHandler();
          clearInterval(interval);
          console.log("completed");
        } else {
          time = time - 1;
          setTimer(time);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [nextButtonHandler]);

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

  const correctAnswerChecker = (selectedOption) => {
    return quizQuestions[indexedQuestion].correctAnswer === selectedOption;
  };

  const optionClickHandler = (clickedOption) => {
    if (clickedOption === "option1") {
      setActiveClickedOption({
        option1BorderCss: "4px solid #5076FF",
      });
      if (quizDetails.quizType === "poll") {
        setQuizPollAnswer({
          questionNo: quizQuestions[indexedQuestion].questionNumber,
          pollOption1: 1,
          pollOption2: 0,
          pollOption3: 0,
          pollOption4: 0,
          questionSkipped: false,
        });
      } else {
        let isCorrect = correctAnswerChecker("option1");
        setQuizQnaAnswer({
          questionNo: quizQuestions[indexedQuestion].questionNumber,
          peopleAttemptedQuestions: 1,
          peopleAnsweredCorrectly: isCorrect ? 1 : 0,
          peopleAnswerIncorrect: isCorrect ? 0 : 1,
          questionSkipped: false,
        });
      }
    } else if (clickedOption === "option2") {
      setActiveClickedOption({
        option2BorderCss: "4px solid #5076FF",
      });
      if (quizDetails.quizType === "poll") {
        setQuizPollAnswer({
          questionNo: quizQuestions[indexedQuestion].questionNumber,
          pollOption1: 0,
          pollOption2: 1,
          pollOption3: 0,
          pollOption4: 0,
          questionSkipped: false,
        });
      } else {
        let isCorrect = correctAnswerChecker("option2");
        setQuizQnaAnswer({
          questionNo: quizQuestions[indexedQuestion].questionNumber,
          peopleAttemptedQuestions: 1,
          peopleAnsweredCorrectly: isCorrect ? 1 : 0,
          peopleAnswerIncorrect: isCorrect ? 0 : 1,
          questionSkipped: false,
        });
      }
    } else if (clickedOption === "option3") {
      setActiveClickedOption({
        option3BorderCss: "4px solid #5076FF",
      });
      if (quizDetails.quizType === "poll") {
        setQuizPollAnswer({
          questionNo: quizQuestions[indexedQuestion].questionNumber,
          pollOption3: 0,
          pollOption2: 0,
          pollOption3: 1,
          pollOption4: 0,
          questionSkipped: false,
        });
      } else {
        let isCorrect = correctAnswerChecker("option3");
        setQuizQnaAnswer({
          questionNo: quizQuestions[indexedQuestion].questionNumber,
          peopleAttemptedQuestions: 1,
          peopleAnsweredCorrectly: isCorrect ? 1 : 0,
          peopleAnswerIncorrect: isCorrect ? 0 : 1,
          questionSkipped: false,
        });
      }
    } else {
      setActiveClickedOption({
        option4BorderCss: "4px solid #5076FF",
      });
      if (quizDetails.quizType === "poll") {
        setQuizPollAnswer({
          questionNo: quizQuestions[indexedQuestion].questionNumber,
          pollOption4: 0,
          pollOption2: 0,
          pollOption3: 0,
          pollOption4: 1,
          questionSkipped: false,
        });
      } else {
        let isCorrect = correctAnswerChecker("option4");
        setQuizQnaAnswer({
          questionNo: quizQuestions[indexedQuestion].questionNumber,
          peopleAttemptedQuestions: 1,
          peopleAnsweredCorrectly: isCorrect ? 1 : 0,
          peopleAnswerIncorrect: isCorrect ? 0 : 1,
          questionSkipped: false,
        });
      }
    }
  };

  return (
    <>
      {showInvalidUrl ? (
        <>
          <img
            style={{ width: "100%", height: "100%" }}
            src="https://sitechecker.pro/wp-content/uploads/2017/12/404.png"
          ></img>
        </>
      ) : showScoreComponent ? (
        <ScoreComponent
          length={quizQuestions.length}
          quizId={quizId}
          quizAnswersArray={quizAnswersArray}
          quizType={quizDetails.quizType}
          questionsFromDB={quizDetails.questionDetails}
        ></ScoreComponent>
      ) : (
        <>
          <div className={styles.topContainer}>
            {loading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.loadingText}>Loading </div>
                <img className={styles.loadingGif} src={loadingGif}></img>
              </div>
            ) : (
              <div className={styles.innerContainer}>
                <div className={styles.timerQuestionNoContainer}>
                  <div>
                    0{indexedQuestion + 1}/0{quizQuestions.length}
                  </div>
                  <div className={styles.timerContainer}>
                    {quizDetails.quizType === "poll" ? (
                      <></>
                    ) : (
                      <div>
                        00:{timer < 10 ? "0" : ""}
                        {timer}s
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.questionText}>
                  {quizQuestions[indexedQuestion]?.questionText}
                </div>

                {quizQuestions[indexedQuestion]?.optionType ===
                "textAndImageUrl" ? (
                  //text And Image Url Options

                  <div className={styles.textAndUrlOptionContainerUrl}>
                    <div
                      style={{
                        border: activeClickOption.option1BorderCss,
                      }}
                      onClick={() => optionClickHandler("option1")}
                      className={styles.textAndOptionsUrl}
                    >
                      {quizQuestions[indexedQuestion]?.option1Text ? (
                        <>
                          <div className={styles.optionTextForTextAndUrl}>
                            {quizQuestions[indexedQuestion]?.option1Text}
                          </div>
                          <img
                            className={styles.imageTextAndUrl}
                            src={quizQuestions[indexedQuestion]?.option1Url}
                            alt="url1"
                          ></img>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div
                      style={{
                        border: activeClickOption.option2BorderCss,
                      }}
                      onClick={() => optionClickHandler("option2")}
                      className={styles.textAndOptionsUrl}
                    >
                      {quizQuestions[indexedQuestion]?.option2Text ? (
                        <>
                          <div className={styles.optionTextForTextAndUrl}>
                            {quizQuestions[indexedQuestion]?.option2Text}
                          </div>
                          <img
                            className={styles.imageTextAndUrl}
                            src={quizQuestions[indexedQuestion]?.option2Url}
                            alt="url2"
                          ></img>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div
                      style={{
                        border: activeClickOption.option3BorderCss,
                      }}
                      onClick={() => optionClickHandler("option3")}
                      className={styles.textAndOptionsUrl}
                    >
                      {quizQuestions[indexedQuestion]?.option3Text ? (
                        <>
                          <div className={styles.optionTextForTextAndUrl}>
                            {quizQuestions[indexedQuestion]?.option3Text}
                          </div>
                          <img
                            className={styles.imageTextAndUrl}
                            src={quizQuestions[indexedQuestion]?.option3Url}
                            alt="url3"
                          ></img>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div
                      style={{
                        border: activeClickOption.option4BorderCss,
                      }}
                      onClick={() => optionClickHandler("option4")}
                      className={styles.textAndOptionsUrl}
                    >
                      {quizQuestions[indexedQuestion]?.option4Text ? (
                        <>
                          <div className={styles.optionTextForTextAndUrl}>
                            {quizQuestions[indexedQuestion]?.option4Text}
                          </div>
                          <img
                            className={styles.imageTextAndUrl}
                            src={quizQuestions[indexedQuestion]?.option4Url}
                            alt="url4"
                          ></img>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ) : quizQuestions[indexedQuestion]?.optionType ===
                  "imageUrl" ? (
                  //Url Options
                  <div className={styles.optionContainerUrl}>
                    {quizQuestions[indexedQuestion]?.option1Url !== "" ? (
                      <div className={styles.optionsUrl}>
                        {quizQuestions[indexedQuestion]?.option1Url !== "" ? (
                          <img
                            style={{
                              border: activeClickOption.option1BorderCss,
                            }}
                            onClick={() => optionClickHandler("option1")}
                            className={styles.imageUrl}
                            src={quizQuestions[indexedQuestion]?.option1Url}
                            alt="url1"
                          ></img>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}

                    {quizQuestions[indexedQuestion]?.option2Url !== "" ? (
                      <div className={styles.optionsUrl}>
                        {quizQuestions[indexedQuestion]?.option2Url !== "" ? (
                          <img
                            style={{
                              border: activeClickOption.option2BorderCss,
                            }}
                            onClick={() => optionClickHandler("option2")}
                            className={styles.imageUrl}
                            src={quizQuestions[indexedQuestion]?.option2Url}
                            alt="url2"
                          ></img>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}

                    {quizQuestions[indexedQuestion]?.option3Url !== "" ? (
                      <div className={styles.optionsUrl}>
                        {quizQuestions[indexedQuestion]?.option3Url !== "" ? (
                          <img
                            style={{
                              border: activeClickOption.option3BorderCss,
                            }}
                            onClick={() => optionClickHandler("option3")}
                            className={styles.imageUrl}
                            src={quizQuestions[indexedQuestion]?.option3Url}
                            alt="url3"
                          ></img>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                    {quizQuestions[indexedQuestion]?.option4Url !== "" ? (
                      <div className={styles.optionsUrl}>
                        {quizQuestions[indexedQuestion]?.option4Url !== "" ? (
                          <img
                            style={{
                              border: activeClickOption.option4BorderCss,
                            }}
                            onClick={() => optionClickHandler("option4")}
                            className={styles.imageUrl}
                            src={quizQuestions[indexedQuestion]?.option4Url}
                            alt="url4"
                          ></img>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  //text

                  <div className={styles.optionContainerText}>
                    {quizQuestions[indexedQuestion]?.option1Text ? (
                      <div
                        style={{
                          border: activeClickOption.option1BorderCss,
                        }}
                        onClick={() => optionClickHandler("option1")}
                        className={styles.optionsText}
                      >
                        <div>{quizQuestions[indexedQuestion]?.option1Text}</div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {quizQuestions[indexedQuestion]?.option2Text ? (
                      <div
                        style={{
                          border: activeClickOption.option2BorderCss,
                        }}
                        onClick={() => optionClickHandler("option2")}
                        className={styles.optionsText}
                      >
                        <div>{quizQuestions[indexedQuestion]?.option2Text}</div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {quizQuestions[indexedQuestion]?.option3Text ? (
                      <div
                        style={{
                          border: activeClickOption.option3BorderCss,
                        }}
                        onClick={() => optionClickHandler("option3")}
                        className={styles.optionsText}
                      >
                        <div>{quizQuestions[indexedQuestion]?.option3Text}</div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {quizQuestions[indexedQuestion]?.option4Text ? (
                      <div
                        style={{
                          border: activeClickOption.option4BorderCss,
                        }}
                        onClick={() => optionClickHandler("option4")}
                        className={styles.optionsText}
                      >
                        <div>{quizQuestions[indexedQuestion]?.option4Text}</div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
                <div className={styles.nextButton}>
                  {activeSubmitButton ? (
                    <div
                      style={{ width: "100%" }}
                      onClick={submitButtonHandler}
                    >
                      SUBMIT
                    </div>
                  ) : (
                    <div style={{ width: "100%" }} onClick={nextButtonHandler}>
                      NEXT
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default QuizPage;
