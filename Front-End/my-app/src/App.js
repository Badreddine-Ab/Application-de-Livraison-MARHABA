
import './App.css';
import Registration from './Pages/Registration';
import Login from './Pages/Login'
import ErrorPage from './Pages/ErrorPage';
import {BrowserRouter, Route,Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage';
import HelloUser from './Pages/HelloUser';
import { useContext,createContext,useState,useEffect} from 'react';
import Cookies from 'js-cookie';

export const UserDataContext=createContext();
function App() {
  let [connectedUserData,setUserData]=useState((Cookies.get('access_token')));
  useEffect(()=>{
    Cookies.set('connectedUserData',(connectedUserData))
  },[connectedUserData])

  return (
    <UserDataContext.Provider value={{connectedUserData,setUserData}}>
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
  </UserDataContext.Provider>
  );
}

export default App;
