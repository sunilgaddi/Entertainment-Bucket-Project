import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Registration from './components/create/Registration';
import ActivateEmail from './components/activateEmail/ActivateEmail';

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
    </Router>
    </div>
  );
}

export default App;
