import { Fragment } from 'react';
import './App.css';
import Registration from './Pages/Registration';
import Login from './Pages/Login'
import ErrorPage from './Pages/ErrorPage';
import {BrowserRouter, Route,Routes , Navigate } from 'react-router-dom'
import LandingPage from './Pages/LandingPage';
import HelloUser from './Pages/HelloUser';
import { isAuthenticated } from './helper';
import ForgetPassword from './Pages/ForgetPassword';
import { AuthProvider } from './Context/AuthProvider';
import ResetPassword from './Pages/ResetPassword';


function App() {
  
  const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? (
        <Fragment>
            <user />
            {children}
        </Fragment>
    ) : <Navigate to="/login" />
}

const PublicRoute = ({ children }) => {
    return isAuthenticated() ? <Navigate to="/user" /> : children
}
  

  return (
  
      <div>
         <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/register' element={ <PublicRoute> <Registration/> </PublicRoute>} />
            <Route path='/login' element={<PublicRoute> <Login/></PublicRoute>} />
            <Route path='/user' element={<PrivateRoute><HelloUser/></PrivateRoute>} />
            <Route path='/forgetPassword' element={<PublicRoute><ForgetPassword/></PublicRoute>} />
            <Route path='/resetPassword/:token' element={<PublicRoute><ResetPassword/></PublicRoute> } />
            <Route path='*' element={<ErrorPage/>} />
          </Routes>
        </BrowserRouter>
        </AuthProvider>
    </div>
  
  );
}

export default App;
