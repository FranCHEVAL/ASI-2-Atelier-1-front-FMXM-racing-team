import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUserPage from './pages/AddUserPage';
import LoginPage from './pages/LoginPage';
import StartGamePage from './pages/StartGamePage'
import { WelcomePage } from './pages/WelcomePage';
import { ProtectedRoute } from './components/route/ProtectedRoute';
import NavigationBar from './components/common/NavigationBar';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { isConnected } from './core/selectors';

import ShopContainer from './components/shop/ShopContainer';
import GamePage from './pages/GamePage';

function App() {
  const isAuthenticated = useSelector(isConnected);

  return (
    <div className="App">
      {isAuthenticated &&
       <NavigationBar></NavigationBar> 
      }
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/add-user" element={<AddUserPage />} />  
          <Route path="/game" element={<GamePage/>} />
          <Route path="/play" element={
            <ProtectedRoute>
              <StartGamePage/>
            </ProtectedRoute>
          } /> 
          <Route path="/welcome-page" element={
            <ProtectedRoute>
              <WelcomePage />
            </ProtectedRoute>
          } /> 
          <Route path="/sell" element={
            <ProtectedRoute>
              <ShopContainer mode="sell"/>
            </ProtectedRoute>
            } />
          <Route path="/buy" element={
          <ProtectedRoute>
            <ShopContainer mode="buy"/>
          </ProtectedRoute>
          } /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
