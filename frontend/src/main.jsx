import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SocketContextProvider } from './Context/SocketContext.jsx'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
   <AuthContextProvider>
    <SocketContextProvider>
    <App />
    </SocketContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
