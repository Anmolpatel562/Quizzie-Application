const QuizLink = require("../models/QuizLink");
const QuizDetails = require("../models/QuizDetails");

const saveQuizUrl = async (req,res) => {
    try{
      const {quizName,quizUrl,quizId,userId} = req.body;
      if(!quizName || !quizUrl || !quizId || !userId){
        return res.status(400).json({
            message:"Please provide all the details",
        })
      }
      await QuizLink.create({quizName,quizUrl,quizId,userId});
      res.status(200).json({
          message:"Quiz linked saved Successfully",
      })
    }catch(error){
      console.log("Error in saveQuizUrl :: ",error);
    }
}

const getQuizUrlDetailsByUserId = async (req,res) => {
  try{
    const {userId} = req.body;
    if(!userId){
      return res.status(400).json({
       message:"please provide userId",
      })
    }
    const response = await QuizLink.find({userId});
    res.status(200).json({
      message:"Data Fetched Successfully",
      data:response,
    })
  }catch(error){
    console.log(error);
  }
}

const findByQuizIdAndUpdate = async (req,res) => {
  try{
    const {quizId} = req.body;
    if(!quizId){
      return res.status(400).json({
        message:"quizId empty."
      })
    }
    const response = await QuizLink.findOne({ quizId }, { impression: 1, _id: 0 });
    await QuizLink.findOneAndUpdate({quizId:quizId},{impression:response.impression+1})
    res.status(200).json({
      message:"impression added.",
    })
  }catch(error){
    console.log(error);
  }
}

const getAllQuizLinkByUserId = async (req,res) => {
  try{
    const {userId} = req.body;
    if(!userId){
      res.status(400).json({
        message:"User Id Empty !",
      })
    }
    const response = await QuizLink.find({userId});
    res.status(200).json({
      message:"Quizes Fetched.",
      response
    })
  }catch(error){
    console.log(error);
    res.status(500).json({
      messageL:"Invalid User Id",
    })
  }
}

const deleteQuizLinkByQuizId = async (req,res) => {
  try{
   const {quizId} = req.params;
   if(!quizId){
     res.status(400).json({
      message:"QuizId empty",
     })
   }
   const result = await QuizLink.findOneAndDelete({quizId});
   res.status(200).json({
    message:"QuizLink Deleted Successfully",
    result,
   })
  }catch(error){
    console.log(error);
    res.status(500).json({
      message:"Something went wrong",
    })
  }
}

const getQuizByQuizId = async (req, res) => {
  try {
    const { quizId } = req.params;
    if (!quizId) {
      res.status(400).json({
        message: "Invalid quizId",
      });
      return;
    }
    const quizDetails = await QuizDetails.findOne({ _id: quizId });
    if (!quizDetails) {
      res.status(404).json({
        message: "quiz not found",
      });
      return;
    }
    res.status(200).json({
      message: "Quiz Fetched Successfully",
      quizDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Invalid Url",
    });
  }
};


module.exports = {getQuizByQuizId, saveQuizUrl, getQuizUrlDetailsByUserId, findByQuizIdAndUpdate, getAllQuizLinkByUserId,deleteQuizLinkByQuizId};