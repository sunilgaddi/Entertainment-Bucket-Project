import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DataProvider from "./redux/store"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



ReactDOM.render(
  
    <React.StrictMode>
    <Router>
      <DataProvider>

        <Routes>
          <Route path='/eb/*' element={<App />} />
        </Routes>

      </DataProvider>
      </Router>
    </React.StrictMode>

  ,
  document.getElementById('root')
);

