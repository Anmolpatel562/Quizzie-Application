import React from "react";
import styles from "../components_css/OptionImageUrl.module.css";

const OptionImageUrl = ({
  question,
  onChange,
  quizType,
  setTimer,
  selectedTimer,
  setSelectedTimer,
}) => {
  const handleTimer = (time) => {
    setTimer(time);
    setTimer(time);
    if (time === "Off") {
      setSelectedTimer({
        name: "Off",
        timerOffColorCss: "white",
        timerOffBgCss: "#D60000",
        timer5secColorCss: "",
        timer5secBgCss: "",
        timer10secColorCss: "",
        timer10secBgCss: "",
      });
    } else if (time === "5sec") {
      setSelectedTimer({
        name: "5sec",
        timerOffColorCss: "",
        timerOffBgCss: "",
        timer5secColorCss: "white",
        timer5secBgCss: "#D60000",
        timer10secColorCss: "",
        timer10secBgCss: "",
      });
    } else {
      setSelectedTimer({
        name: "5sec",
        timerOffColorCss: "",
        timerOffBgCss: "",
        timer5secColorCss: "",
        timer5secBgCss: "",
        timer10secColorCss: "white",
        timer10secBgCss: "#D60000",
      });
    }
  };
  return (
    <div className={styles.optionContainer}>
      <div className={styles.radioBtnAndOptionContainer}>
        <div>
          {quizType === "q&a" ? (
            <input
              style={{ accentColor: "#4d853f" }}
              type="radio"
              name="options"
              onChange={(e) =>
                onChange({
                  ...question,
                  correctAnswer: "option1",
                })
              }
              checked={question.correctAnswer === "option1" ? true : false}
            ></input>
          ) : (
            <></>
          )}
          <input
            type="text"
            placeholder="Url"
            className={styles.options}
            value={question.option1Url}
            onChange={(e) =>
              onChange({
                ...question,
                option1Url: e.target.value,
              })
            }
          />
        </div>
        <div>
          {quizType === "q&a" ? (
            <input
              type="radio"
              style={{ accentColor: "#4d853f" }}
              name="options"
              onChange={(e) =>
                onChange({
                  ...question,
                  correctAnswer: "option2",
                })
              }
              checked={question.correctAnswer === "option2" ? true : false}
            ></input>
          ) : (
            <></>
          )}
          <input
            type="text"
            placeholder="Url"
            className={styles.options}
            value={question.option2Url}
            onChange={(e) =>
              onChange({
                ...question,
                option2Url: e.target.value,
              })
            }
          />
        </div>
        <div>
          {quizType === "q&a" ? (
            <input
              style={{ accentColor: "#4d853f" }}
              type="radio"
              name="options"
              onChange={(e) =>
                onChange({
                  ...question,
                  correctAnswer: "option3",
                })
              }
              checked={question.correctAnswer === "option3" ? true : false}
            ></input>
          ) : (
            <></>
          )}
          <input
            placeholder="Url"
            className={styles.options}
            type="text"
            value={question.option3Url}
            onChange={(e) =>
              onChange({
                ...question,
                option3Url: e.target.value,
              })
            }
          />
        </div>
        <div>
          {quizType === "q&a" ? (
            <input
              style={{ accentColor: "#4d853f" }}
              type="radio"
              name="options"
              onChange={(e) =>
                onChange({
                  ...question,
                  correctAnswer: "option4",
                })
              }
              checked={question.correctAnswer === "option4" ? true : false}
            ></input>
          ) : (
            <></>
          )}
          <input
            placeholder="Url"
            className={styles.options}
            type="text"
            value={question.option4Url}
            onChange={(e) =>
              onChange({
                ...question,
                option4Url: e.target.value,
              })
            }
          />
        </div>
      </div>
      {quizType === "q&a" ? (
        <div className={styles.timerContainer}>
          <div className={styles.timerOptions}>
            <div>Timer</div>
            <div
              style={{
                color: selectedTimer.timerOffColorCss,
                backgroundColor: selectedTimer.timerOffBgCss,
              }}
              className={styles.timer}
              onClick={() => handleTimer("Off")}
            >
              OFF
            </div>
            <div
              style={{
                color: selectedTimer.timer5secColorCss,
                backgroundColor: selectedTimer.timer5secBgCss,
              }}
              className={styles.timer}
              onClick={() => handleTimer("5sec")}
            >
              5 sec
            </div>
            <div
              style={{
                color: selectedTimer.timer10secColorCss,
                backgroundColor: selectedTimer.timer10secBgCss,
              }}
              className={styles.timer}
              onClick={() => handleTimer("10sec")}
            >
              10 sec
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OptionImageUrl;
