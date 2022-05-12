import React, {useState, useEffect} from 'react'
import '../styles/cartindivid.css'
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import {FaTrash} from 'react-icons/fa'
import { auth, db } from '../config/config'
import { onAuthStateChanged } from 'firebase/auth'
import { deleteDoc, doc, collection, where,getDocs, getDoc, query } from 'firebase/firestore'

export const IndividualCartProduct = ({cartProduct, cartProductIncrease, cartProductDecrease}) => {
  const [currentUse, setCurrentUse] = useState(null);
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

  const user = GetCurrentUser();

  const handleCartProductIncrease =()=>{
    cartProductIncrease(cartProduct);
  }

  const handleCartProductDecrease=() =>{
    cartProductDecrease(cartProduct);
  }

  const handleCartProductDelete = async()=>{
  let prdct = ''
  let Product = ''
  Product = cartProduct
        const q = query(collection(db, "Card"+currentUse.uid), where("title", "==", Product.title));
        const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            prdct = doc.id
          });
        const docRef = doc(db, 'Card'+currentUse.uid, prdct)
        await deleteDoc(docRef).then(()=>{
          console.log('deleted')
        })
  }

  return (
    <div className="crrtpr">
    <div className='cartproductcont'>
    <img className='imageproductcart' src={cartProduct.url} alt="kk" />
    <div className="informationcartprod">
      <div className="leftcont">
          <div className="titcart">{cartProduct.title}</div>
          <div className="disccart">
              <div className="prcart">{cartProduct.price + ' ₽'}</div>
              <div className="slech">|</div>
              <div className="desctcart">{cartProduct.description}</div>
          </div>
          <div className="butplmincont">
            <button className='minplbutton' onClick={handleCartProductDecrease}><AiOutlineMinus/></button>
            <div className="srqcont">{cartProduct.qty}</div>
            <button className='minplbutton' onClick={handleCartProductIncrease}><AiOutlinePlus/></button>
          </div>
      </div>
      <div className="rightcont">
          <div className="totalprcart">{cartProduct.TotalProductPrice + ' ₽'}</div>
          <div className="delbutcart">
              <button className='buttondel' onClick={handleCartProductDelete}><FaTrash/><div className="deletecart">Delete</div></button>
          </div>
      </div>
    </div>
</div>
</div>
  )
}
