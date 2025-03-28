
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddDomain from './pages/add-domain/AddDomain';

function App() {
  return (
 
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/> } />
    <Route path='/add-domain' element={<AddDomain/> } />
  </Routes>
  </BrowserRouter>
  
  );
}

export default App;
