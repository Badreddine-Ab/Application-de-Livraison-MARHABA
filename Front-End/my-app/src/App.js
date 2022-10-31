
import './App.css';
import Registration from './Pages/Registration';
import Login from './Pages/Login'
import ErrorPage from './Pages/ErrorPage';
import {BrowserRouter, Route,Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Registration/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;
