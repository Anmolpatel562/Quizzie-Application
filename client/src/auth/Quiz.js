import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKENDURL;


export const createQuiz = async (quizName, userId, questionsArray, quizType, timer) => {
  try {
    const response = await axios.post(`${backendUrl}createQuiz`, {
      quizName,
      userId,
      questionsArray,
      quizType,
      timer
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllQuizByUserId = async (userId) => {
  try {
    const response = await axios.post(`${backendUrl}getAllQuizByUserId`, {
      userId,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const findByQuizIdAndDeleteQuiz = async (quizId) => {
  try {
    const response = await axios.delete(
      `${backendUrl}findByQuizIdAndDeleteQuiz/${quizId}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const countNoOfQuizByUserId = async (userId, token) => {
  try {
    const response = await axios.get(
      `${backendUrl}countNoOfQuizByUserId/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.quizCount;
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message)
    if(error.response.data.message === "Invalid Token"){
       return "Invalid Token";
    }
  }
};

export const getQuizById = async (quizId) => {
  try{
    console.log(quizId);
    const response = await axios.get(`${backendUrl}getQuizById/${quizId}`);
    console.log(response);
  }catch(error){
    console.log(error);
  }
}

export const findByQuizIdAndUpdatePoll = async (quizId,questionNumber,data) => {
  try{
    if(!quizId || !questionNumber){
       console.log("quizId,questionNumber not found!");
       return;
    }
    const response = await axios.post(`${backendUrl}findByQuizIdAndUpdatePoll`,{quizId,questionNumber,data});
    // return response.data.data;
   }catch(error){
    console.log(error);
   }
}

export const findByQuizIdAndUpdateQna = async (quizId,questionNumber,data) => {
  try{
    if(!quizId || !questionNumber){
       console.log("quizId,questionNumber not found!");
       return;
    }
    const response = await axios.post(`${backendUrl}findByQuizIdAndUpdateQna`,{quizId,questionNumber,data});
   }catch(error){
    console.log(error);
   }
}

export const getQuestionArrayByQuizId = async (id) => {
  try{
    if(!id){
      console.log("QuizId Empty");
    }
    const response = await axios.get(`${backendUrl}getQuestionArrayByQuizId/${id}`);
    return response;
  }catch(error){
    console.log(error);
  }
}

export const countNumberOfQuestionCreatedByUserId = async (userId) => {
  try{
    const response = await axios.get(`${backendUrl}countNumberOfQuestionCreatedByUserId/${userId}`);
    return response.data.result[0].totalQuestions;
  }catch(error){
    console.log(error);
  }
}