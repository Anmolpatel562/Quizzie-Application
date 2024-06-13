const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const userRoutes = require('./routes/User');
const quizRouter = require("./routes/QuizDetails");
const urlRouter = require("./routes/QuizLink")
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());

app.use(bodyParser.json());
app.use(userRoutes);
app.use(quizRouter);
app.use(urlRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  mongoose
    .connect(process.env.MONGODBURL)
    .then(() => {
      console.log("DB connected Successfully, App is running at port no:",port);
    })
    .catch((error) => {
      console.log(error);
    });
});
