const mongoose = require("mongoose");

const quizLink = mongoose.Schema(
  {
    quizName: {
      type: String,
    },
    quizUrl: {
      type: String,
      required: true,
    },
    quizId: {
      type: String,
    },
    userId: {
      type: String,
    },
    impression: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const QuizLink = mongoose.model("QuizLink", quizLink);

module.exports = QuizLink;
