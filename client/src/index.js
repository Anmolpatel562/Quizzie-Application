import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import { AuthProvider } from './store/Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
  <AuthProvider>
    <ToastContainer></ToastContainer>
    <App />
  </AuthProvider>  
  </>
);

