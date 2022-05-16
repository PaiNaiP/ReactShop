
import './App.css';
import { Home } from './Components/Home';
import { Login } from './Components/Login';
import { SignUp } from './Components/SignUp';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { NotFound } from './Components/NotFound';
import { AddProducts } from './Components/AddProducts';
import { Card } from './Components/Card';
import { ProductPage } from './Components/ProductPage';
import { Account } from './Components/Account';
import { UpdateProduct } from './Components/UpdateProduct';
import { ResetPassword } from './Components/ResetPassword';

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/SignIn" element={<Login/>}/>
    <Route exact path="/SignUp" element={<SignUp/>}/>
    <Route exact path="/Add-Product" element={<AddProducts/>}/>
    <Route exact path = "/Card" element={<Card/>}/>
    <Route exact path = "/ResetPassword" element={<ResetPassword/>}/>
    <Route exact path = "/Product/:id" element={<ProductPage/>}/>
    <Route exact path = '/Account/:id' element={<Account/>}/>
    <Route exact path='/UpdateProduct/:id' element={<UpdateProduct/>}/>
    <Route path="*" element={<NotFound />} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
