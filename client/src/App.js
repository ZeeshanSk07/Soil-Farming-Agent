import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import UserDashboard from './pages/UserDashboard';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false}/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/dashboard" element={<UserDashboard/>} />
          <Route exact path="/admin" element={<Admin/>} />
        </Routes>
      </BrowserRouter>
     
    </>
  );
}

export default App;
