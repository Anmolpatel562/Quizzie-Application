import './App.css';
import QuizPage from './components/QuizPage';
import HomePage from './pages/HomePage';
import LoginSignUpPage from './pages/LoginSignUpPage';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { useAuth } from './store/Auth';


function App() {
  // const {val} = useAuth();
  // console.log(val);
  return (
    <div className="App" >
      <BrowserRouter>
       <Routes>
        <Route path='/userLoginSignUpPage' element={<LoginSignUpPage/>}></Route>
        <Route path='/homepage' element={<HomePage/>}></Route>
        <Route path='/quizPage/:quizId' element={<QuizPage/>}></Route>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
