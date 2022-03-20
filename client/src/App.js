import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Registration from './components/create/Registration';
import ActivateEmail from './components/activateEmail/ActivateEmail';
import Login from "./components/login/Login";

function App() {
  return (
    <div className="App"> 
    <Router>
      <Routes>
        <Route path='/user/register' element={<Registration/>}/>
      </Routes>
      <Routes>
        <Route path='/user/activation/:activation_token' element={<ActivateEmail/>}/>
      </Routes>
      <Routes>
        <Route path='/user/login' element={<Login/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
