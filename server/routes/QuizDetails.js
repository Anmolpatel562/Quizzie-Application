const express = require("express");
const routes = express.Router();
const { verifyUser } = require("../middleware/Auth");
const {
  createQuiz,
  getAllQuizByUserId,
  findByQuizIdAndDeleteQuiz,
  countNoOfQuizByUserId,
  findByQuizIdAndUpdatePoll,
  findByQuizIdAndUpdateQna,
  getQuestionArrayByQuizId,
  countNumberOfQuestionCreatedByUserId
} = require("../controllers/QuizDetails");

routes.post("/createQuiz", createQuiz);
routes.post("/getAllQuizByUserId", getAllQuizByUserId);
routes.get("/countNoOfQuizByUserId/:userId", verifyUser, countNoOfQuizByUserId);
routes.delete("/findByQuizIdAndDeleteQuiz/:quizId", findByQuizIdAndDeleteQuiz);
routes.post("/findByQuizIdAndUpdatePoll", findByQuizIdAndUpdatePoll);
routes.post("/findByQuizIdAndUpdateQna", findByQuizIdAndUpdateQna);
routes.get("/getQuestionArrayByQuizId/:id", getQuestionArrayByQuizId);
routes.get("/countNumberOfQuestionCreatedByUserId/:userId",countNumberOfQuestionCreatedByUserId)

module.exports = routes;
