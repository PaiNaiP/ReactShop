import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { query, collection, setDoc, onSnapshot, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db , auth} from '../config/config';
import { onAuthStateChanged } from 'firebase/auth';
//import { ProductOne } from './ProductOne';
import { Product } from './Product';
import { Navbar } from './Navbar';
import { Fotter } from './Fotter';

export const ProductPage = () => {
    
    const {id} = useParams();
    const navigate = useNavigate();
    const [docc, setDocc] = useState([])
    const [currentUse, setCurrentUse] = useState(null);
    const [cartProducts, setCartProducts] = useState([])
    const [totalProducts, setTotalProducts] = useState(0)
    const getCardLenghtProduct=()=>{
      const unsub = onSnapshot(collection(db, "Card"+currentUse.uid), (doc) => {
        const qty = doc.docs.length;
        setTotalProducts(qty)
        unsub()
    });
  }
    useEffect(()=>{
      auth.onAuthStateChanged(user =>{
          if(user){
          const q = query(collection(db, "Card"+user.uid));
              const unsubscribe = onSnapshot(q, (querySnapshot) => {
              const cities = [];
              querySnapshot.forEach((doc) => {
                  cities.push(doc.data());
              });
              setCartProducts(cities)
              });
    
          getCardLenghtProduct()
          }
          else{
              navigate('/SignIn')
          }
      })
      getProducts()
    }, [])
      let m = ''
      const getProducts = async()=>{
          
        m = id
        const q = query(collection(db, "products"), where("title", "==", m));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  setDocc( doc.data());
});
      }
console.log(docc)

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



  return (
    <>
     <Navbar user={user} totalProducts={cartProducts.length}/>
    <Product product={docc} />
    <Fotter/>
    </>
  )
}

