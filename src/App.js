import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import AddDomain from "./pages/add-domain/AddDomain";
import Addmail from "./pages/add-email/Addmail";
import Header from "./componant/Header";
import Sidebar from "./componant/Sidebar";
import AddWebsite from "./pages/add-website/AddWebsite";
import Login from "./pages/Login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("isVerified"));

  useEffect(() => {
    const localData = localStorage.getItem("isVerified");

    if (localData) {
      setIsLoggedIn(localData);
    }
  }, []);

  const onLogin = () => {
    setIsLoggedIn(true);
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isVerified");
  };

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <>
          <Sidebar onLogout={onLogout} />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-domain" element={<AddDomain />} />
            <Route path="/add-email" element={<Addmail />} />
            <Route path="/add-website" element={<AddWebsite />} />
          </Routes>
        </>
      ) : (
        <Login onLogin={onLogin} />
      )}
    </BrowserRouter>
  );
}

export default App;
