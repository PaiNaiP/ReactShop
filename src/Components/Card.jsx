import React, {useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import { onAuthStateChanged } from 'firebase/auth';
import { collectionGroup, doc, getDoc, getDocs, where, collection,updateDoc, onSnapshot, docs, query, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../config/config';
import { useNavigate } from 'react-router-dom';
import { CartProducts } from './CartProducts';
import { Fotter } from './Fotter';
import '../styles/cartindivid.css'
import { async } from '@firebase/util';
import StripeCheckout from 'react-stripe-checkout';
import map from '../img/Marketoto_13-05-2022_12-26-51.png'
import bskt from '../img/Goodies - Crying.png'


export const Card = () => {
  const [pokup, setPokup] = useState(false)
  const [currentUse, setCurrentUse] = useState(null);
    const navigate = useNavigate();
    const [pokupSum, setPokupSum] = useState([])
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
      }, [])

      let Product = '';
      const cartProductIncrease = async(cartProduct)=>{
      let prdct = ''
      Product =cartProduct;
      if(Product.qty<100){
      const q = query(collection(db, "Card"+currentUse.uid), where("title", "==", Product.title));
      const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          prdct = doc.id
        });
       
       Product.qty = Product.qty+1;
       Product.TotalProductPrice = Product.qty * Product.price;
      //  onAuthStateChanged(auth, user=>{
      //    if(user){
          await updateDoc(doc(db, 'Card'+currentUse.uid, prdct), Product).then(()=>{
            console.log('jij')
          // })        
          // setDoc(doc(db, "Card"+uid), Product).then(()=>{
          //   console.log('pup')
          // })
        //  }
        //  else{
        //    console.log('user is not definded')
        //  }
       })
      }
      }

      const cartProductDecrease = async(cartProduct)=>{
      let prdct = ''
      Product =cartProduct;
      if(Product.qty>1){
      const q = query(collection(db, "Card"+currentUse.uid), where("title", "==", Product.title));
      const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          prdct = doc.id
        });
       
       Product.qty = Product.qty-1;
       Product.TotalProductPrice = Product.qty * Product.price;
      //  onAuthStateChanged(auth, user=>{
      //    if(user){
          await updateDoc(doc(db, 'Card'+currentUse.uid, prdct), Product).then(()=>{
            console.log('jij')
          // })        
          // setDoc(doc(db, "Card"+uid), Product).then(()=>{
          //   console.log('pup')
          // })
        //  }
        //  else{
        //    console.log('user is not definded')
        //  }
       })
      }
      }

      console.log(cartProducts)

      const qty = cartProducts.map(cartProduct=>{
        return cartProduct.qty;
      })

      const reducerOfQty=(accumulator, currentValue)=>accumulator+currentValue;
      const totalQty = qty.reduce(reducerOfQty, 0);
      
      const price = cartProducts.map((cartProduct)=>{
        return cartProduct.TotalProductPrice;
      })
      const reducerOfPrice = (accumulator, currentValue)=> accumulator+currentValue;

      const totalPrice = price.reduce(reducerOfPrice,0)

      const [eemail, getEemail ]=useState([])
      const handleEmailCheckout = ()=>{
        onAuthStateChanged(auth, user=>{
          if(user)
          getEemail(user.email)
        })
      }
      handleEmailCheckout()


      
    
  // const handleImageMap = async()=>{
  //      const img ="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A8838bbc88c7a4cd9f4b065fcc47617dab28489fb4e2f4edfd59fce138c370cc8&amp;width=553&amp;scroll=true"
       
  //     }
      const PayOnClc = async() =>{
       // debugger
        const uid = currentUse.uid
        const carts = await getDocs(collection(db, 'Card' + uid))
        for(var snap of carts.docs){
          deleteDoc(doc(db, 'Card' + uid, snap.id))
        }
        setPokup(true)
        setPokupSum(totalPrice)
      }

    

  return (
      <>
    <Navbar user={user} totalProducts={cartProducts.length}/>
    
     
    
    {cartProducts.length > 0 &&(
      <div className="pricecartcont">
        <div className='crdbod'>
            <div className='cartname'><p className='cartp'>Card</p></div>
            <div className='productscard-box'>
                <CartProducts cartProducts={cartProducts}
                cartProductIncrease={cartProductIncrease}
                cartProductDecrease={cartProductDecrease}/>
            </div>
        </div>
        <div className="card_cont">
          <div className="tovarinfo">
            <div className="totaldisp">
              <div className="totaltxt">Total No Of Products:</div>
              <div className="totalcount">{totalQty}</div>
            </div>
            <div className="totalpricetopay">
              <div className="pricetottxt">TotalPriceToPay:</div>
              <div className="totalpricecent">{totalPrice+'₽'}</div>
            </div>
          </div>
          {/* <div className="cardinfo">
            <div className="cardnumbertxt">Email</div>
            <input className='cardnumbinp' id='emval' type="email" value={eemail}/>
          </div> */}
          <button className="Pay" onClick={PayOnClc}>Pay With Card</button>
        </div>
      </div>
    )}
    {cartProducts.length < 1&& pokup==true&&(
         <div className="oform-cont">
         <div className="pokinfocont">
           <h1 className="of_pok">Покупка оформлена</h1>
           <div className="sama-class-nazovi">
             <div className="withoutmap">
               <div className="txtof">Ваша покупка на сумму {pokupSum+'₽ '} была оформлена</div>
               <div className="txtof">Вы скоро сможете забрать её из пункта выдачи</div>
             </div>
           </div>
         </div>
         <a href="https://yandex.ru/maps/?um=constructor%3A8838bbc88c7a4cd9f4b065fcc47617dab28489fb4e2f4edfd59fce138c370cc8&amp;source=constructorStatic" target="_blank">
           <img className='map' src={map} alt=""  />
         </a>
       </div>
    )}
    {cartProducts.length < 1&& pokup==false&&(
      <div className='minl'>
        <div className="mmmmbskt">
        <div className='storcr'>Your basket is crying because it's empty</div>
        <img src={bskt} alt="" className="basckt" />
        </div>
        </div>
    )}
    
    <Fotter/>
    </>
  )
}
