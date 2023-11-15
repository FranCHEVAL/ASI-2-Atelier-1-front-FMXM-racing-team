import './App.css';
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import AddUserPage from './pages/AddUserPage';
import LoginPage from './pages/LoginPage';
import { WelcomePage } from './pages/WelcomePage';
import { ProtectedRoute } from './components/route/ProtectedRoute';
import NavigationBar from './components/common/NavigationBar';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { isConnected } from './core/selectors';
import ShopContainer from './components/shop/ShopContainer';
import { Chat } from './components/chat/Chat';

function App() {
  const isAuthenticated = useSelector(isConnected)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBarLayout />} >
            <Route path="/" element={<LoginPage/>}></Route>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/add-user" element={<AddUserPage />} />
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
            <Route path="/chat" element={
              <ProtectedRoute>
                <Chat/>
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

  function NavBarLayout() {
    return (
        <>
          {isAuthenticated &&
              <NavigationBar></NavigationBar>
          }

          {/* This Outlet is the place in which react-router will render your components that you need with the navbar */}
          <Outlet />

          {/* You can add a footer to get fancy in here :) */}
        </>
    );
  }
}

export default App;
