
import './App.css';
import Registration from './Pages/Login';
import Signup from './Pages/Signup'
import { Route,Routes } from 'react-router-dom'

function App() {
  return (
    <>
    <Routes>
      <Route path="/Signin" element={<Registration/>}/>
      <Route path="/Signup" element={<Signup/>}/>
    </Routes>
    <Registration/>
    </>
  );
}

export default App;
