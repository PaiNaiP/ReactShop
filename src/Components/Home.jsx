import React, {useState, useEffect} from 'react'
import { Navbar } from './Navbar'
import { Products } from './Products'
import { db, fs, auth } from '../config/config'
import { onAuthStateChanged } from 'firebase/auth'
import { collection,onSnapshot, doc, getDocs, getDoc, setDoc, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import '../styles/home.css'
import { async } from '@firebase/util'
import { Fotter } from './Fotter'
import CustomScroll from 'react-custom-scroll';

export const Home = (props) => {
  let navigate = useNavigate();
  function GetUserUid(){
    const [uid, setUid] = useState(null);
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
          setUid(user.uid);
        }
      })
    },[])
    return uid;
  }

  const uid = GetUserUid();

  function GetCurrentUser(){
    const [user, setUser] = useState(null);
    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if(user){
          const docRef = doc(db, "users", user.uid);
          getDoc(docRef).then(snapshot=>{
            setUser(snapshot.data().Name)
          })
          
        }
        else{
          setUser(null)
        }
      })
    }, [])
    return user;
  }

  const user = GetCurrentUser();
  console.log(user);

  const [products, setProducts] = useState([]);

  const getProducts = async()=>{
    
    const products = await getDocs(collection(db, 'products'))
    const productsArray = [];
    products.forEach((doc)=>{
      productsArray.push({
        ...doc.data()
      })
     
        setProducts(productsArray)
    })
  }

  const [totalProducts, setTotalProducts] = useState(0)
  const getCardLenghtProduct=()=>{
    const unsub = onSnapshot(collection(db, "Card"+uid), (doc) => {
      const qty = doc.docs.length;
      setTotalProducts(qty)
      unsub()
  });
  
  }
  getCardLenghtProduct()
  useEffect(()=>{
    getProducts()
    
  },[])
  let Product = '';
  const addToCard = async(product) =>{
    if(uid!==null){
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

  // const [totalProducts, setTotalProducts] = useState(0)

  // useEffect=(()=>{
  //   onAuthStateChanged(auth, user=>{
  //     if(user){
        
  //     }
  //   })
  // })

  console.log(totalProducts)
  return (
    <>
    <Navbar user={user} totalProducts={totalProducts}/>
    {/* {products.length > 0 && ( */}
      <div className='products-box' >
        <Products products={products} addToCard = {addToCard}/>
      </div>
    {/* )} */}
    {/* {products.length <1 && (
      <div>Please wait....</div>
    )} */}

    <Fotter/>
    </>
  )
}
