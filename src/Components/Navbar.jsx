import React from 'react'
import logo from '../img/marketoto.svg'
import searchlog from '../img/Search.svg'
import '../styles/navbar.css'
import shoppingcart from '../img/Shopping_cart.svg'
import heart from '../img/Heart.svg'
import person from '../img/Person.svg'
import { auth } from '../config/config'
import { useNavigate, Link } from 'react-router-dom'

export const Navbar = ({user, totalProducts}) => {

  const navigate = useNavigate();
  const handleLogout=()=>{
    auth.signOut().then(()=>{
      navigate('/SignIn')
    })
  }
  return (
    
    <div>
       {!user&&<>
        <header>
          <div className='contnavbar'>
            <img src={logo} alt="" className='marketotologo'/>
            <div className="search">
              <input type="text" className='searchtxt' />
              <button className='searchlogo'><img className='searchlogoo' src={searchlog} alt="" /></button>
            </div>
            <div className="contbut">
              <Link to="/SignIn">
                <p>Sign In</p>
                </Link>
                <Link to="SignUp" className='su'>
                <p>Sign Up</p>
                </Link>
            </div>
          </div>
        </header>
        </>}
      {user&&<>
        {/* <header>
          <div className="cont">
            <img src={logo} alt="" className='marketotologo' />
            <div className='search'>
              <input type="text" className='searchtxt' />
              <button className='searchlogo'><img className='imgsrcs' src={searchlog} alt=""/></button>
            </div>
            <div className="contbut">
                <p>{user}</p>
                <button><img src={shoppingcart} alt="" /></button>
                <button onClick={handleLogout}>Log Out</button>
            </div>
          </div>
        </header> */}
        <header>
          <div className='contnavbar'>
            <img src={logo} alt="" className='marketotologo'/>
            <div className="search">
              <input type="text" className='searchtxt' />
              <button className='searchlogo'><img className='searchlogoo' src={searchlog} alt="" /></button>
            </div>
            <div className="contbut">
            <p>{user}</p>
            <Link to="/Card" >
              <button className='buttonnav'><img src={shoppingcart} alt="" className='iclog'/>
              </button>
            </Link>
            <span className='cart-indicator'>{totalProducts}</span>
            <button className='buttonnavv' onClick={handleLogout}>Log Out</button>
            </div>
          </div>
        </header>
        </>}
    </div>
  )
}
