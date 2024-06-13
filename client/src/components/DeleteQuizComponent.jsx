import React from "react";
import styles from "../components_css/DeleteQuizComponent.module.css";
import { deleteQuizLinkByQuizId } from "../auth/shareLink";
import { findByQuizIdAndDeleteQuiz } from "../auth/Quiz";
import { toast } from "react-toastify";

const DeleteQuizComponent = ({
  deleteSelectedQuizId,
  setShowDeleteQuiz,
  render,
  setRender,
  dashBoardRender,
  setDashBoardRender
}) => {
  const confirmDeleteHandler = async () => {
    try {
      const quizLink = await deleteQuizLinkByQuizId(deleteSelectedQuizId);
      const quizDeltails = await findByQuizIdAndDeleteQuiz(deleteSelectedQuizId);
      setRender(render + 1);
      setShowDeleteQuiz(false);
      setDashBoardRender(dashBoardRender+1);
      toast.success("Quiz Deleted Please Refresh.")
    } catch (error) {
      console.log(error);
    }
  };

  const cancelButtonHandler = () => {
    setShowDeleteQuiz(false);
  };
  return (
    <>
      <div className={styles.deleteComponentBlurredContainer}></div>
      <div className={styles.deleteComponentContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.confirmText}>
            Are you confirm you
            <br />
            want to delete ?
          </div>
          <div className={styles.buttonContainer}>
            <div
              className={styles.confirmButton}
              onClick={confirmDeleteHandler}
            >
              <div>Confirm Delete</div>
            </div>
            <div className={styles.cancelButton} onClick={cancelButtonHandler}>
              <div>Cancel</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteQuizComponent;
