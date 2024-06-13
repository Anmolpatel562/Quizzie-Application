import axios from "axios";
import {toast} from "react-toastify";

const backendUrl = process.env.REACT_APP_BACKENDURL;

export const getQuizIdByQuizName = async ({ quizName, userId }) => {
  try {
    const response = await axios.post(`${backendUrl}getQuizIdByQuizName`, {
      quizName,
      userId,
    });
    return response.data.data;
  } catch (error) {
    toast.error("Something went wrong");
    console.log(error);
  }
};

export const getQuizByQuizId = async (quizId) => {
  try{
    const response = await axios.post(`${backendUrl}getQuizByQuizId${quizId}`);
    return response.data?.quizDetails;
  }catch(error){
    console.log(error)
  }
}

export const saveQuizUrlToDataBase = async ({quizName,quizUrl,quizId,userId}) => {
  try{
    const response = await axios.post(`${backendUrl}saveQuizUrl`,{quizName,quizUrl,quizId,userId})
  }catch(error){
    console.log(error);
  }
}

export const getQuizUrlDetailsByUserId = async (userId) => {
  try{
   const response = await axios.post(`${backendUrl}getQuizUrlDetailsByUserId`,{userId});
   return response.data.data;
  }catch(error){
    console.log(error);
  }
}

export const findByQuizIdAndUpdate = async (quizId) => {
  try{
    if(!quizId){
      console.log("QuizId not found !");
      return;
    }
    const response = await axios.post(`${backendUrl}findByQuizIdAndUpdate`,{quizId});
  }catch(error){
    console.log(error);
  }
}

export const getAllQuizLinkByUserId = async (userId) => {
  try{
    if(!userId){
      console.log("User Id empty");
      return;
    }
    const response = await axios.post(`${backendUrl}getAllQuizLinkByUserId`,{userId})
    return response.data.response;
  }catch(error){
    console.log(error);
  }
}

export const deleteQuizLinkByQuizId = async (quizId) => {
  try{
    if(!quizId){
      console.log("Empty Quiz Id");
      return;
    }
    const response = await axios.delete(`${backendUrl}deleteQuizLinkByQuizId/${quizId}`,{quizId});
  }catch(error){
    console.log(error);
  }
}