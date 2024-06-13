const mongoose = require("mongoose");

const quizDetails = mongoose.Schema(
  {
    quizName: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.ObjectId,
      required: true,
    },
    questionDetails: {
      type: Array,
    },
    timer: {
      type: String,
    },
    quizType: {
      type: String,
      required: true,
    },
    impression: {
      type: Number,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const QuizDetails = mongoose.model("QuizDetails", quizDetails);

module.exports = QuizDetails;
