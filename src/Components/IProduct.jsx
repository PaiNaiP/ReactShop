import React, {useState, useEffect} from 'react'
import '../styles/iproduct.css'
import shoppingcart from '../img/Shopping_cart.svg'
import { NavLink } from 'react-router-dom'
import { ProductPage } from './ProductPage'
import { Link } from 'react-router-dom'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { collection, getDocs, doc, getDoc, onSnapshot } from 'firebase/firestore'
import {HiOutlinePencilAlt} from 'react-icons/hi'
import { db, auth } from '../config/config'

export const IProduct = ({individualProduct, addToCart}) => {
    const handleAddToCard=()=>{
        addToCart(individualProduct)
    }
    const [currentUse, setCurrentUse] = useState([])
//     const currentUser= async()=>{

//         const docRef = doc(db, 'users', id);
//         const docSnap = await getDoc(docRef);
//  setCurrentUse(docSnap.data())
//     }
    
    // currentUser()

  

    // const handleOpenOne=()=>{
    //     const NavLink = ReactRouterDOM.NavLink;
    //     <NavLink to={`/products/${item.id}`}>{item.name}</NavLink>
    // }
const [provAdmin, setProvAdmin] = useState([])

    const returnUserInfo = async(userr)=>{
  
        const uidd = userr.uid;
        const unsub = onSnapshot(doc(db, "users", uidd), (doc) => {
          const users = doc.data().Name
          const emailforadmin = doc.data().Email
          const uid = uidd
          setProvAdmin(emailforadmin)
      });
      }
        const currentUser = async()=>{
          const authh = getAuth();
      onAuthStateChanged(authh, (userr) => {
        
        if(userr){
         returnUserInfo(userr)
        }
        else{
          
        }

      
          // ...
        
        
      });
        }
      
      currentUser()

     
  return (
      <>
     
{provAdmin != 'admin@admin.com'&&
      <div className="llll" >
       
        <div className='productcont'> <Link key={individualProduct.id} to={`/Product/${individualProduct.title}`} style={{ textDecoration: 'none' , color: 'black'}}>
       
            <img className='imageproduct' src={individualProduct.url} alt="kk" />
            </Link>
            <div className="btthn">
            <div className="btnpr">
                <div className="n">
                <div className="pr">{individualProduct.price+' ₽'}</div>
                </div>
                <button className='butshop' id='btn' onClick={handleAddToCard}><img className='ingshop' src={shoppingcart} alt="" /></button>
                
               
            </div>
            <div className='tit'>{individualProduct.title+', ' + individualProduct.description}</div>
            </div>
            
        </div>
       
       </div>
}

{provAdmin == 'admin@admin.com'&&
      <div className="llll" >
       
        <div className='productcont'> 
       
            <img className='imageproduct' src={individualProduct.url} alt="kk" />
           
            <div className="btthn">
            <div className="btnpr">
                <div className="n">
                <div className="pr">{individualProduct.price+' ₽'}</div>
                </div>
                <Link key={individualProduct.id} to={`/UpdateProduct/${individualProduct.title}`} style={{ textDecoration: 'none' , color: 'black'}}>
                <button className='butshop' onClick={handleAddToCard}><HiOutlinePencilAlt/></button>
                </Link>
                
               
            </div>
            <div className='tit'>{individualProduct.title+', ' + individualProduct.description}</div>
            </div>
            
        </div>
       
       </div>
}
       </>
  )
}
