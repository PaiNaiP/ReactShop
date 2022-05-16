import React, {useState, useEffect} from 'react'
import bskt from '../img/Goodies - Crying.png'
import { onAuthStateChanged, getAuth} from 'firebase/auth';
import { auth, db } from '../config/config';
import { doc, getDoc, query, collection, onSnapshot } from 'firebase/firestore';
import { Navbar } from './Navbar';
import { Fotter } from './Fotter';

export const NotFound = () => {
  const [currentUse, setCurrentUse] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0)
  const [crntUser, setCrntUser] = useState([])

  const authh = getAuth();
onAuthStateChanged(authh, (userr) => {
  if (userr) {
    setCurrentUse(userr)
 
  }
  else{

  }
})
  const getCardLenghtProduct=()=>{
    const unsub = onSnapshot(collection(db, "Card"+currentUse.uid), (doc) => {
      const qty = doc.docs.length;
      setTotalProducts(qty)
      unsub()
  });
}
getCardLenghtProduct()

const currentUser= async()=>{

    const docRef = doc(db, 'users', currentUse.uid);
    const docSnap = await getDoc(docRef);
setCrntUser(docSnap.data())

}

currentUser()


  return (
    <>
    <Navbar user={crntUser.Name} totalProducts={totalProducts}/>
    <div className='minl'>
    <div className="mmmmbskt">
    <div className='storcr'>Page Not Found</div>
    <img src={bskt} alt="" className="basckt" />
    </div>
    </div>
    <Fotter />
    </>
  )
}
