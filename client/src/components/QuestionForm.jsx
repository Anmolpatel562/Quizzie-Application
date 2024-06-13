import {React, useState} from "react";
import styles from "../components_css/QuestionForm.module.css";
import OptionText from "../components/OptionText";
import OptionImageUrl from "./OptionImageUrl";
import OptionTextAndURL from "./OptionTextAndURL";

const QuestionForm = ({ question, onChange, quizType, setTimer }) => {

  const [selectedTimer, setSelectedTimer] = useState({
    name: "Off",
    timerOffColorCss: "white",
    timerOffBgCss: "#D60000",
    timer5secColorCss: "",
    timer5secBgCss: "",
    timer10secColorCss: "",
    timer10secBgCss: "",
  });
  
  return (
    <div className={styles.questionsPanelContainer}>
      <div>
        <input
          className={styles.questionTextInputField}
          type="text"
          value={question?.questionText}
          placeholder="Question"
          onChange={(e) =>
            onChange({
              ...question,
              questionText: e.target.value,
            })
          }
        />
      </div>
      <div className={styles.optionTypeContainer}>
        <label>Option Type</label>
        <div>
          <input
            type="radio"
            name="optionTypeRadioBtn"
            onChange={(e) =>
              onChange({
                ...question,
                optionType: "text",
              })
            }
            checked={question?.optionType === "text" ? true : false}
          />
          <label>Text</label>
        </div>
        <div>
          <input
            type="radio"
            name="optionTypeRadioBtn"
            onChange={(e) =>
              onChange({
                ...question,
                optionType: "imageUrl",
              })
            }
            checked={question?.optionType === "imageUrl" ? true : false}
          />
          <label>Image URL</label>
        </div>
        <div>
          <input
            type="radio"
            name="optionTypeRadioBtn"
            onChange={(e) =>
              onChange({
                ...question,
                optionType: "textAndImageUrl",
              })
            }
            checked={question?.optionType === "textAndImageUrl" ? true : false}
          />
          <label>Text & Image URL</label>
        </div>
      </div>
      <div>
        {question?.optionType === "text" ? (
          <OptionText
            question={question}
            onChange={onChange}
            quizType={quizType}
            setTimer={setTimer}
            selectedTimer={selectedTimer}
            setSelectedTimer={setSelectedTimer}
          ></OptionText>
        ) : question?.optionType === "imageUrl" ? (
          <OptionImageUrl
            question={question}
            onChange={onChange}
            quizType={quizType}
            setTimer={setTimer}
            selectedTimer={selectedTimer}
            setSelectedTimer={setSelectedTimer}
          ></OptionImageUrl>
        ) : (
          <OptionTextAndURL
            question={question}
            onChange={onChange}
            quizType={quizType}
            setTimer={setTimer}
            selectedTimer={selectedTimer}
            setSelectedTimer={setSelectedTimer}
          ></OptionTextAndURL>
        )}
      </div>
    </div>
  );
};

export default QuestionForm;
