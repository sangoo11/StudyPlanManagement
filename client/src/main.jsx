import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

axios.interceptors.request.use((request) => {
  const accessTokenoken = localStorage.getItem('accessToken');

  if (accessTokenoken) {
    // Add the token to the Authorization header
    request.headers.Authorization = `Bearer ${accessTokenoken}`;
  } else {
    // If no token is available, you can either remove the Authorization header or leave it empty
    request.headers.Authorization = '';
  }
  return request;

}, (error) => {
  // Handle error in the request (e.g., network issues)
  return Promise.reject(error)
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
