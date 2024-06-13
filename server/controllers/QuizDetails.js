const QuizDetails = require("../models/QuizDetails");
const mongoose = require('mongoose');

const createQuiz = async (req, res) => {
  try {
    const { quizName, userId, questionsArray, quizType, timer } = req.body;
    if (!quizName || !userId || !quizType ) {
      res.status(200).json({
        message: "Please enter the quizName,userId,quizType",
      });
      return;
    }
    const result = await QuizDetails.create({
      quizName,
      user: userId,
      questionDetails: questionsArray,
      quizType,
      timer,
    });
    res.status(200).json({
      message: "Quiz Created Successfully.",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllQuizByUserId = async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      return res.status(400).json({
        message: "please provide userId.",
      });
    }
    const response = await QuizDetails.find({ user: userId });
    res.status(200).json({
      message: "Quizs Fetched Successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

const findByQuizIdAndDeleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    if (!quizId) {
      return res.status(400).json({
        message: "Empty User Id",
      });
    }
    const result = await QuizDetails.findByIdAndDelete(quizId);
    res.status(200).json({
      message: "Quiz Deleted Successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const countNoOfQuizByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        message: "Empty User Id",
      });
    }
    const quizCount = await QuizDetails.countDocuments({ user: userId });
    res.status(200).json({
      message: "Total quiz Count fetched Successfully",
      quizCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Invalid User Id",
    });
  }
};

// const getQuizById = async (req,res) => {
//   try{
//     const {id} = req.params;
//     console.log(id)
//     const response = await QuizDetails.find
//   }catch(error){
//     console.log(error);
//   }
// }

const findByQuizIdAndUpdatePoll = async (req, res) => {
  try {
    const { quizId, questionNumber, data } = req.body;
    const { pollOption1, pollOption2, pollOption3, pollOption4 } = data;
    if (!quizId || !questionNumber) {
      res.status(400).json({
        message: "QuizId Empty",
      });
      return;
    }
    const response = await QuizDetails.updateOne(
      { _id: quizId, "questionDetails.questionNumber": questionNumber },
      {
        $set: {
          "questionDetails.$.pollOption1": pollOption1,
          "questionDetails.$.pollOption2": pollOption2,
          "questionDetails.$.pollOption3": pollOption3,
          "questionDetails.$.pollOption4": pollOption4,
        },
        $currentDate: { updated_at: true },
      }
    );
    // await QuizDetails.findByIdAndUpdate(
    //   { quizId, questionNumber },
    //   {
    //     pollOption1: pollOption1,
    //     pollOption2: pollOption2,
    //     pollOption3: pollOption3,
    //     pollOption4: pollOption4,
    //   }
    // );
    res.status(200).json({
      message: "Updated Successfully",
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

const findByQuizIdAndUpdateQna = async (req, res) => {
  try {
    const { quizId, questionNumber, data } = req.body;
    const {
      peopleAttemptedQuestions,
      peopleAnsweredCorrectly,
      peopleAnswerIncorrect,
    } = data;
    if (!quizId || !questionNumber) {
      res.status(400).json({
        message: "QuizId Empty",
      });
      return;
    }
    const response = await QuizDetails.updateOne(
      { _id: quizId, "questionDetails.questionNumber": questionNumber },
      {
        $set: {
          "questionDetails.$.peopleAnswerIncorrect": peopleAnswerIncorrect,
          "questionDetails.$.peopleAttemptedQuestions":
            peopleAttemptedQuestions,
          "questionDetails.$.peopleAnsweredCorrectly": peopleAnsweredCorrectly,
        },
        $currentDate: { updated_at: true },
      }
    );
    res.status(200).json({
      message: "Update Successfully",
      response,
    });
  } catch (error) {
    console.log(error);
  }
};

const getQuestionArrayByQuizId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Empty QuizId",
      });
    }
    const response = await QuizDetails.findById(id, {
      questionDetails: 1,
      quizType:1,
      _id: 0,
    });
    res.status(200).json({
      message: "Questions Fetched.",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const countNumberOfQuestionCreatedByUserId = async (req, res) => {
  try {
    const {userId} = req.params;
    const result = await QuizDetails.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userId) }
      },
      {
        $project: {
          numberOfQuestions: { $size: "$questionDetails" },
        },
      },
      {
        $group: {
          _id: null,
          totalQuestions: { $sum: "$numberOfQuestions" },
        },
      },
    ]);
    res.status(200).json({
      message:"Calculated Successfully",
      result
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong !",
    });
  }
};

module.exports = {
  createQuiz,
  getAllQuizByUserId,
  findByQuizIdAndDeleteQuiz,
  countNoOfQuizByUserId,
  findByQuizIdAndUpdatePoll,
  findByQuizIdAndUpdateQna,
  getQuestionArrayByQuizId,
  countNumberOfQuestionCreatedByUserId
};
