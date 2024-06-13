const express = require("express");
const routes = express.Router();
const {saveQuizUrl, getQuizUrlDetailsByUserId, findByQuizIdAndUpdate, getAllQuizLinkByUserId, deleteQuizLinkByQuizId,getQuizByQuizId} = require("../controllers/QuizLink");

routes.post('/getQuizByQuizId:quizId', getQuizByQuizId)
routes.post('/saveQuizUrl', saveQuizUrl);
routes.post('/getQuizUrlDetailsByUserId', getQuizUrlDetailsByUserId);
routes.post('/findByQuizIdAndUpdate', findByQuizIdAndUpdate);
routes.post('/getAllQuizLinkByUserId',getAllQuizLinkByUserId);
routes.delete('/deleteQuizLinkByQuizId/:quizId',deleteQuizLinkByQuizId);

module.exports = routes;