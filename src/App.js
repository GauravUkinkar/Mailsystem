import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import AddDomain from './pages/add-domain/AddDomain';
import Addmail from './pages/add-email/Addmail';
import Header from './componant/Header';
import Sidebar from './componant/Sidebar';
import AddWebsite from './pages/add-website/AddWebsite';
import Login from './pages/Login/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <>
          <Sidebar />
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add-domain' element={<AddDomain />} />
            <Route path='/add-email' element={<Addmail />} />
            <Route path='/add-website' element={<AddWebsite />} />
          </Routes>
        </>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </BrowserRouter>
  );
}

export default App;
