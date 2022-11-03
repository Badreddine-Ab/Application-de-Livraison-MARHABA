
import './App.css';
import Registration from './Pages/Registration';
import Login from './Pages/Login'
import ErrorPage from './Pages/ErrorPage';
import {BrowserRouter, Route,Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage';
import HelloUser from './Pages/HelloUser';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/register' element={<Registration/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/user' element={<HelloUser/>} />
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;
