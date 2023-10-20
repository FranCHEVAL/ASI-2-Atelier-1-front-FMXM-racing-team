import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserAddPages from './pages/UserAddPages';
import Copyright from './components/Copyright';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={Copyright} />
          <Route path="/user-add/" element={<UserAddPages />} />  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App 
