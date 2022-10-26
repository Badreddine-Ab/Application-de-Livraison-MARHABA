
import './App.css';
import Registration from './Pages/Login';
import Signup from './Pages/Signup'
import {BrowserRouter, Route,Routes } from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Registration/>}/>
      <Route path="/Signup" element={<Signup/>}/>
    </Routes>
    <Registration/>
    </BrowserRouter>
    </>
  );
}

export default App;
