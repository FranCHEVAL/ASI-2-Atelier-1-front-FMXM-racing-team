import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUserPage from './pages/AddUserPage';
import Login from './components/login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/add-user" element={<AddUserPage />} />  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App 
