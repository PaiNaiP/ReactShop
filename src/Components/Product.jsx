import React, {useState, useEffect} from 'react'
import '../styles/product.css'
import { setDoc, doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore'
import { db, auth } from '../config/config'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

export const Product = ({product}) => {
  const [currentUse, setCurrentUse] = useState(null);
  const navigate = useNavigate()
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

  const handleAddToCard=async()=>{
    let Product = '';
    if(user!==null){
      const uid = currentUse.uid
      Product = product
      let prdct = ''
      const q = query(collection(db, "products"), where("title", "==", product.title));
      const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          prdct = doc.id
        });
      Product['qty']=1
      Product['TotalProductPrice'] = Product.qty*Product.price;
      await setDoc(doc(db, "Card"+uid, prdct), Product).then(()=>{
        console.log('pup')
      })
      window.location.reload()
    }
    else{
      navigate('/SignIn')
    }
  }

  return (
    <div className="productcardcont">
      <div className="flex-cont-info">
        <img src={product.url} alt="" className="imageproductone" />
        <div className="titl-desc-cont-prod-one">
          <div className="title-product-one">{product.title}</div>    
          <div className="desc-product-one">{product.description}</div>
        </div>
        <div className="price-but-cont-prod-one">
          <div className="price-product-one">{product.price+'₽ '}</div>
          <div className="button-card-prod-one" onClick={handleAddToCard}>BUY</div>
        </div>
      </div>
    </div>
  )
}
