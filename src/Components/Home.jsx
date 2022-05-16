import React, {useState, useEffect} from 'react'
import { Navbar } from './Navbar'
import { Products } from './Products'
import { db, fs, auth } from '../config/config'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { collection,onSnapshot, doc, getDocs, getDoc, setDoc, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import '../styles/home.css'
import { async } from '@firebase/util'
import { Fotter } from './Fotter'
import CustomScroll from 'react-custom-scroll';
import {BsPlusCircleDotted} from 'react-icons/bs'
import Carousel from 'react-bootstrap/Carousel'
import img1 from '../img/image 7.svg'
import img2 from '../img/image 8.svg'
import img3 from '../img/image 9.svg'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export const Home = (props) => {
  let users = []
  let uidl = []
  const [emailAdm, setEmailAdm] = useState([])
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
const [currentUse, setCurrentUse] = useState([])
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
  const [usere, setUsere] = useState([])

const returnUserInfo = async(userr)=>{
  
  console.log(userr)
  const uidd = userr.uid;
  console.log(uidd)
  const unsub = onSnapshot(doc(db, "users", uidd), (doc) => {
    users = doc.data()
    console.log(users)
    uidl = uidd
    console.log(uidl)
    setEmailAdm(doc.data().Email)
    console.log(emailAdm)
});
}
  const currentUser = async()=>{
    
    const authh = getAuth();
onAuthStateChanged(authh, (userr) => {
  
    console.log(userr)
   returnUserInfo(userr)
   console.log(currentUse)

    // ...
  
  
});
  }

  currentUser()
  // const [totalProducts, setTotalProducts] = useState(0)

  // useEffect=(()=>{
  //   onAuthStateChanged(auth, user=>{
  //     if(user){
        
  //     }
  //   })
  // })

  console.log(totalProducts)
  console.log(uid)

  const handleAddProduct = () =>{
    navigate('/Add-Product')
  }

  const fadeImages = [
    {
    url: img1,
    },
    {
    url: img2,
    },
    {
    url: img3,
    },
  ];
  return (
    <>
    <Navbar user={usere.Name} totalProducts={totalProducts} useruid={uidl}/>
    {/* {products.length > 0 && ( */}
    <div className="slide-container">
      <Fade>
        {fadeImages.map((fadeImage, index) => (
          <div className="each-fade" key={index}>
            <div className="image-container">
              <img src={fadeImage.url} />
            </div>
          </div>
        ))}
      </Fade>
    </div>
    {emailAdm!='admin@admin.com'&&
      <div className='products-box' >
        <Products products={products} addToCard = {addToCard} user={user}/>
      </div>
    }
     {emailAdm=='admin@admin.com'&&<>
     <div className="add-to-product-button"onClick={handleAddProduct}>
        <BsPlusCircleDotted/>
     </div>
      <div className='products-box' >
        <Products products={products} addToCard = {addToCard} user={user}/>
      </div>
     
      </>
    }
    
    <Fotter/>
    </>
  )
}
