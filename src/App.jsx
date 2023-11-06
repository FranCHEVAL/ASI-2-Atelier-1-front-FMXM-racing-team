import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUserPage from './pages/AddUserPage';
import Login from './components/login/Login';
import { WelcomePage } from './pages/WelcomePage';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { isAuthenticate } from './core/selectors';
import NavigationBar from './components/common/NavigationBar';

function App() {
  const isAuthenticated = useSelector(isAuthenticate)
  return (
    <div className="App">
      {isAuthenticated &&
       <NavigationBar></NavigationBar> 
      }
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/add-user" element={<AddUserPage />} />  
          <Route path="/welcome-page" element={<WelcomePage />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
