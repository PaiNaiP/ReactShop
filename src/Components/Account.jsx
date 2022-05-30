import React, {useState, useEffect} from 'react'
import { Fotter } from './Fotter'
import { Navbar } from './Navbar'
import { getAuth, onAuthStateChanged,updateEmail, updatePassword } from 'firebase/auth'
import { auth, db } from '../config/config'
import { doc, getDoc, onSnapshot, collection, updateDoc } from 'firebase/firestore'
import { useParams, Link, useNavigate } from 'react-router-dom'
import '../styles/Account.css'
import chel from '../img/chel.png'
import {HiOutlinePencilAlt} from 'react-icons/hi'
import { async } from '@firebase/util'

export const Account = () => {
    const {id} = useParams();
    const [currentUse, setCurrentUse] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0)
    const [cartProducts, setCartProducts] = useState([]);
    const [onChange, setOnChange] = useState(false)

    const getCardLenghtProduct=()=>{
        const unsub = onSnapshot(collection(db, "Card"+id), (doc) => {
          const qty = doc.docs.length;
          setTotalProducts(qty)
          unsub()
      });
    }
    getCardLenghtProduct()

    const currentUser= async()=>{

        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);
 setCurrentUse(docSnap.data())

    }
    
    currentUser()
    const navigate = useNavigate();
    const handleLogout=()=>{
      auth.signOut().then(()=>{
        navigate('/SignIn')
      })
    }

    const handleChangeAccount = () =>{
        if(onChange==false)
        setOnChange(true)
        else 
        setOnChange(false)
    }

    const updateEmailInFirestore = async() =>{
        const washingtonRef = doc(db, "users", id);
        const email = document.getElementById('email')
// Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
        Email: email.value
        });
    }

    const updateNameInFirestore = async() =>{
        const washingtonRef = doc(db, "users", id);
        const name = document.getElementById('name')
// Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
        Name: name.value
        });
    }

    const handleSaveAccount=()=>{
        const pass = document.getElementById('pass')
        const email = document.getElementById('email')
        const name = document.getElementById('name')
        if(pass.value!='')
        {
            const authh = getAuth()
            const user = auth.currentUser;
            const newPassword = pass.value;

            updatePassword(user, newPassword).then(() => {
                console.log('change')
            })
        }

        if(email.value!='')
        {
            const authh = getAuth()
            const newEmail = email.value;

            updateEmail(authh.currentUser, newEmail).then(() => {
                updateEmailInFirestore()
                console.log('change')
            })
        }
        if(name.value!='')
        {
            updateNameInFirestore()
        }
        handleChangeAccount()
    }

  return (
   <>
    <Navbar user={currentUse.Name} totalProducts={totalProducts}/>
    {onChange==false&&<>
        <div className="cont-account-information">
            <div className="cont-with-chel">
        <div className="cont-without-chel">
            <div className="info-account">
                <div className="mm-ac">
                    <div className='account-name'>Hi {currentUse.Name}, </div>
                    
                </div>
                <div className="change-account" onClick={handleChangeAccount}><HiOutlinePencilAlt/></div>
            </div>
            <div className="information-of-account">
                <div className="name-info">{currentUse.Name}</div>
                <div className="email-info">{currentUse.Email}</div>
                <Link to="/Card" style={{ textDecoration: 'none'}}>
                <div className="your-card">Your Cart</div>
                </Link>
                <div className="signout" onClick={handleLogout}>Log Out</div>
            </div>
        </div>
        <img src={chel} alt="" className='chel'/>
        </div>
    </div>
    </>
}
{onChange==true&&<>
        <div className="cont-account-information">
            <div className="cont-with-chel">
        <div className="cont-without-chel">
            <div className="info-account">
                <div className="mm-ac">
                    <div className='account-name'>Hi {currentUse.Name}, </div>
                    
                </div>
                <div className="change-account" onClick={handleChangeAccount}><HiOutlinePencilAlt/></div>
            </div>
            <div className="information-of-account">
                {/* <input type='text' className="name-info">{currentUse.Name}</input>
                <input type='email' className="email-info">{currentUse.Email}</input> */}
                <div className="emailnamecont">
                    <input type="text" id='name' className="name-info" placeholder={currentUse.Name}></input>
                    <div className="inptemailaccount">
                    <input id='email' type="email" className="email-info" placeholder={currentUse.Email}></input>
                    </div>
                    <div className="inptpasswordaccount">
                    <input id='pass' type="password" className="email-info" placeholder='new password'></input>
                    </div>
                </div>
                <div className="your-card" onClick={handleChangeAccount}>Cancel</div>
                <div className="signout" onClick={handleSaveAccount}>Save</div>
            </div>
        </div>
        <img src={chel} alt="" className='chel'/>
        </div>
    </div>
    </>
}
    <Fotter/>
    </>
  )
}
