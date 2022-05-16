import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import room from '../img/room.svg'
import '../styles/ResetPass.css'
import { db } from '../config/config'
import { getAuth, updatePassword } from 'firebase/auth'
import { where, onSnapshot, query, collection } from 'firebase/firestore'

export const ResetPassword = () => {
    const [checkEmail, setCheckEmail] = useState([])
    const [errorMsg, setErrorMsg] = useState('');
    const [reset, setReset] = useState('')
    const navigation = useNavigate()
    const handleResetPassword = () =>{
        const email = document.getElementById('email')
        const pass1 = document.getElementById('pass1')
        const pass2 = document.getElementById('pass2')
        
        if(pass1.value==pass2.value){
            try {
                const q = query(collection(db, "users"), where("Email", "==", email.value))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cities = [];
            querySnapshot.forEach((doc) => {
                setCheckEmail(doc.id)
            });
            });
            const auth = getAuth();

            const user = auth.currentUser;
            const newPassword = pass1.value;

            updatePassword(user, newPassword).then(() => {
                console.log('reset')
                setReset('Password Done')
                navigation('/SignIn')
            })
            } catch (error){
                setErrorMsg('Что-то пошло не так или пользователь не найден');
            }
        }
        else{
            setErrorMsg('Пароли не совпадают');
        }
    }
    
  return (
    <>
    <div className="reset-password-cont">
        <img src={room} alt="" className="img-rest-pss" />
        <div className="rest-pass-info">
            <div className="restpasstxt">Reset Password</div>
            {errorMsg&&<>
            <div className='success-msg4'>{errorMsg}</div>
            <br></br>
            </>}
            {reset&&<>
            <div className='success-msg5'>{reset}</div>
            <br></br>
            </>}
            <form className='inpt-form'>
                <input className='einpt' type="email" placeholder='email' id='email'/>
                <input className='einpt' type="password" placeholder='password' id='pass1'/>
                <input className='einpt' type="password" placeholder='password' id='pass2'/>
                <div className="ResetPassword" onClick={handleResetPassword}>ResetPassword</div>
            </form>
        </div>
    </div>
    </>
  )
}
