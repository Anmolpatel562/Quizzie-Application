import React from "react";
import styles from "../components_css/OptionTextAndImageUrl.module.css";

const OptionTextAndURL = ({
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
      <div className={styles.radioBtnAndOptionContainer} >
        <div className={styles.radioUrlTextContainer}>
          {quizType === "q&a" ? (
            <input
              type="radio"
              name="options"
              style={{ accentColor: "#4d853f" }}
              onChange={(e) =>
                onChange({
                  ...question,
                  correctAnswer: "option1",
                })
              }
              checked={question?.correctAnswer === "option1" ? true : false}
            ></input>
          ) : (
            <></>
          )}
          <input
            className={styles.urlOption}
            placeholder="text"
            type="text"
            value={question?.option1Text}
            onChange={(e) =>
              onChange({
                ...question,
                option1Text: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Url"
            className={styles.options}
            value={question?.option1Url}
            onChange={(e) =>
              onChange({
                ...question,
                option1Url: e.target.value,
              })
            }
          />
        </div>
        <div className={styles.radioUrlTextContainer}>
          {quizType === "q&a" ? (
            <input
              type="radio"
              name="options"
              style={{ accentColor: "#4d853f" }}
              onChange={(e) =>
                onChange({
                  ...question,
                  correctAnswer: "option2",
                })
              }
              checked={question?.correctAnswer === "option2" ? true : false}
            ></input>
          ) : (
            <></>
          )}
          <input
            className={styles.urlOption}
            placeholder="text"
            type="text"
            value={question?.option2Text}
            onChange={(e) =>
              onChange({
                ...question,
                option2Text: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Url"
            className={styles.options}
            value={question?.option2Url}
            onChange={(e) =>
              onChange({
                ...question,
                option2Url: e.target.value,
              })
            }
          />
        </div>
        <div className={styles.radioUrlTextContainer}>
          {quizType === "q&a" ? (
            <input
              type="radio"
              name="options"
              style={{ accentColor: "#4d853f" }}
              onChange={(e) =>
                onChange({
                  ...question,
                  correctAnswer: "option3",
                })
              }
              checked={question?.correctAnswer === "option3" ? true : false}
            ></input>
          ) : (
            <></>
          )}
          <input
            className={styles.urlOption}
            placeholder="text"
            type="text"
            value={question?.option3Text}
            onChange={(e) =>
              onChange({
                ...question,
                option3Text: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Url"
            className={styles.options}
            value={question?.option3Url}
            onChange={(e) =>
              onChange({
                ...question,
                option3Url: e.target.value,
              })
            }
          />
        </div>
        <div className={styles.radioUrlTextContainer}>
          {quizType === "q&a" ? (
            <input
              type="radio"
              name="options"
              style={{ accentColor: "#4d853f" }}
              onChange={(e) =>
                onChange({
                  ...question,
                  correctAnswer: "option4",
                })
              }
              checked={question?.correctAnswer === "option4" ? true : false}
            ></input>
          ) : (
            <></>
          )}
          <input
            className={styles.urlOption}
            placeholder="text"
            type="text"
            value={question?.option4Text}
            onChange={(e) =>
              onChange({
                ...question,
                option4Text: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Url"
            className={styles.options}
            value={question?.option4Url}
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

export default OptionTextAndURL;
