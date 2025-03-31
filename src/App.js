
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddDomain from './pages/add-domain/AddDomain';
import Addmail from './pages/add-email/Addmail';
import Header from './componant/Header';
import Sidebar from './componant/Sidebar';

function App() {
  return (
 
  <BrowserRouter>
  <Sidebar />
  <Header />
  
  <Routes>
    <Route path='/' element={<Home/> } />
    <Route path='/add-domain' element={<AddDomain/> } />
    <Route path='/add-email' element={<Addmail /> } />
  </Routes>
  </BrowserRouter>
  
  );
}

export default App;
