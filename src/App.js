
import './App.css';
import { Home } from './Components/Home';
import { Login } from './Components/Login';
import { SignUp } from './Components/SignUp';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { NotFound } from './Components/NotFound';
import { AddProducts } from './Components/AddProducts';
import { Card } from './Components/Card';

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/SignIn" element={<Login/>}/>
    <Route exact path="/SignUp" element={<SignUp/>}/>
    <Route exact path="/Add-Product" element={<AddProducts/>}/>
    <Route exact path = "/Card" element={<Card/>}/>
    <Route element={<NotFound/>}/>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
