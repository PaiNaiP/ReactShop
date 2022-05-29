import React, {useEffect, useState} from 'react'
import logo from '../img/marketoto.svg'
import searchlog from '../img/Search.svg'
import '../styles/navbar.css'
import shoppingcart from '../img/Shopping_cart.svg'
import heart from '../img/Heart.svg'
import person from '../img/Person.svg'
import { auth, db } from '../config/config'
import { useNavigate, Link } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsPerson} from 'react-icons/bs'
import {BiCartAlt} from 'react-icons/bi'
import {FiLogOut} from 'react-icons/fi'
import { collection, getDocs, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { async } from '@firebase/util'
import { Search } from './Search'
import $ from 'jquery'
import { onAuthStateChanged, getAuth } from 'firebase/auth'

export const Navbar = ({user, totalProducts, uidl}) => {
const [uikl, setUikl] = useState([])
const [provAdmin, setProvAdmin] = useState([])
const [provSuch, setProvSuch] = useState([])
 
  const navigate = useNavigate();
  const handleLogout=()=>{
    auth.signOut().then(()=>{
      navigate('/SignIn')
    })
  }
 
  const [search, setSearch] = useState('')
  const [value, setValue] = useState('')
  const [prdcts, setPrdcts] =useState([])
  const [result, setResult] = useState([])
  const [currentUse, setCurrentUse] = useState(null);
  const prodAll = async()=>{
    const kk = []
    const querySnapshot = await getDocs(collection(db, 'products'))
    querySnapshot.forEach((doc)=>{
      kk.push(doc.data().title);
    })
    setPrdcts(kk)
  }
   useEffect(()=>{
    prodAll()
    currentUser()
   },[])
  
   const filteredProducts = prdcts.filter(products=>{
     return products.toLowerCase().includes(value.toLowerCase())
   })
   

   $("#input").on("input", function() {
    setResult(this.value.length);
});

function GetCurrentUser(){
  const [user, setUser] = useState(null);
  
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      
      if(user){
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then(snapshot=>{
          setUser(snapshot.data().Name)
          
        })
        setCurrentUse(user)
      }
      else{
        setUser(null)
      }
    })
  }, [])
  return user;
}


let users = ''
let uid = ''
let emailforadmin = ''
const returnUserInfo = async(userr)=>{

  const uidd = userr.uid;
  console.log(uidd)
  const unsub = onSnapshot(doc(db, "users", uidd), (doc) => {
    users = doc.data().Name
    emailforadmin = doc.data().Email
    uid = uidd
    console.log(uid)
    setUikl(uid)
    console.log(uidd)
    setProvSuch(emailforadmin)
   
});
}
  const currentUser = async()=>{
    
    const authh = getAuth();
onAuthStateChanged(authh, (userr) => {
  
  if(userr){
    console.log(userr)
   returnUserInfo(userr)
  }
  else{
    users='t'
    console.log(users)
    
  }
  setProvAdmin(userr)

    // ...
  
  
});
  }


const handleSignIn=() =>{
navigate('/SignIn')
}

const handleSignUp=() =>{
  navigate('/SignUp')
  }
  return (
    
    <div>
      
      {!provAdmin&&<>
        <header>
          <div className='contnavbar'>
           <Link to="/" >
            <img src={logo} alt="" className='marketotologo'/>
            </Link>
            <div className="search">
              <div className="res">
              <input type="text" className='searchtxt'
              onChange={(e)=>setValue(e.target.value)} id='input'/>
              {result>0&&<>
              <div className='searchBack'>
              <Search  products={filteredProducts} />
              </div>
              </>
              }
              </div>
              <div className="searchlogo">
                <AiOutlineSearch/>
              </div>
            </div>
            <div className="contbut">
                <p onClick={handleSignIn}>Sign In</p>
                <div className="rast" ></div>
                <p onClick={handleSignUp}>Sign Up</p>
            </div>
          </div>
        </header>
        </>}
      {provAdmin&&provSuch!='admin@admin.com'&&<>
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
          <Link to="/" >
            <img src={logo} alt="" className='marketotologo'/>
            </Link>
            <div className="search">
              <div className="res">
              <input type="text" className='searchtxt'
              onChange={(e)=>setValue(e.target.value)} id='input'/>
              {result>0&&<>
              <div className='searchBack'>
              <Search products={filteredProducts} />
              </div>
              </>
              }
              </div>
              <div className="searchlogo">
                <AiOutlineSearch/>
              </div>
            </div>
            <div className="contbut">
            {/* <p>{user}</p> */}
            
            <Link key={user} to={`/Account/${uikl}`} >
            <div className="pers" >
            <BsPerson/>
            </div>
            </Link>
            <Link to="/Card" >
              <div className="cartic">
              <BiCartAlt/>
              </div>
            </Link>
            <span className='cart-indicator'>{totalProducts}</span>
            <button className='buttonnavv' onClick={handleLogout}><FiLogOut/></button>
            </div>
          </div>
        </header>
        </>}
       
        {provSuch==='admin@admin.com'&&
         <header>
         <div className='contnavbar'>
         <Link to="/" >
           <img src={logo} alt="" className='marketotologo'/>
           </Link>
           <button className='buttonnavv' onClick={handleLogout}><FiLogOut/></button>
           </div>
         
       </header>
        }
    </div>
  )
}
