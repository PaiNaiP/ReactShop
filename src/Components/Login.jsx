import React, {useEffect, useState} from 'react'
import room from '../img/room.svg'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/config'

export const Login = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin=(e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, Email, Password).then(()=>{
      setSuccessMsg('Login is here');
      setEmail('');
      setPassword('');
      setErrorMsg('');
      setTimeout(()=>{
        setSuccessMsg('')
        navigate('/');
      },3000)
    }).catch(error=>setErrorMsg(error.message));
  }

  useEffect(()=>{
    onAuthStateChanged(auth, (data)=>{
      console.log(data)
    })
  }, [])
  return (
    <div className='cont' >
      <img src={room} alt="" className='roomimg'/>
      <h1>Sign In</h1>
      <form action="" autoComplete='off' onSubmit={handleLogin}>
        <div className="email">
          <p>Email</p>
          <input type="email" className="emailtxt" onChange={(e)=>setEmail(e.target.value)}
          value ={Email}/>
        </div>
        <div className="password">
          <p>Password</p>
          <input type="password" className="passtxt" onChange={(e)=>setPassword(e.target.value)}
          value ={Password}/>
        </div>
        <button className="login-btn">Sign In</button>
        <div className="SignUp-Cont">
          <div className="Dont">Don’t have an account?</div>
          <Link to="/SignUp" style={{ textDecoration: 'none' }}>
          <div className="SignUpLink">Click here</div>
          </Link>
        </div>
        </form>
        {successMsg&&<>
      <div className='success-msg'>{successMsg}</div>
      <br></br>
      </>}
    </div>
  )
}
