import './App.css'
import {Navigate, Route,Routes} from 'react-router-dom'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { Toaster } from 'react-hot-toast';
import SignUp from './pages/Signup/Signup';
import { useAuthContext } from './Context/AuthContext.jsx';
function App() {
const {authUser}=useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
     <Routes>
      <Route path='/' element={authUser?<Home/>:<Navigate to='/Login'/>}/>
      <Route path='/SignUp' element={authUser? <Navigate to='/'/>:<SignUp/>}/>
      <Route path='/Login' element={authUser? <Navigate to='/'/>:<Login/>}/>
     </Routes>
     <Toaster/>
    </div>
  )
}

export default App
