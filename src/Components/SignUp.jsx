import React, {useState} from 'react'
import room from '../img/room.svg'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../config/config'
import { collection, doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { async } from '@firebase/util'


export const SignUp = () => {

  const navigate = useNavigate();

  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  async function Horn(user){
    await setDoc(doc(db, "users", user.uid), {
      Name: Name,
      Email: Email
    });
  }

  const handleSignUp=(e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth, Email, Password)
    .then(credentials=>{
      console.log(credentials)
      Horn(credentials.user).then(()=>{
        setSuccessMsg('Sign Up is here')
        setName('');
        setEmail('');
        setPassword('');
        setErrorMsg('');
        setTimeout(()=>{
          setSuccessMsg('')
          navigate('/SignIn');
        },3000)
      }).catch(error=>setErrorMsg(error.message));
    })
    .catch((error)=>{
      setErrorMsg(error.message)
    })
  }
  return (
    <div className='cont'>
      <img src={room} alt="" className='roomimg'/>
      <h1>Sign Up</h1>
      <form action="" className="cont-inp" autoComplete='false' 
      onSubmit={handleSignUp}>
      <div className="name">
          <p>Name</p>
          <input type="text" onChange={(e)=>setName(e.target.value)}
          value ={Name} className="nametxt" />
        </div>
        <div className="email">
          <p>Email</p>
          <input type="email" className="emailtxt" onChange={(e)=>setEmail(e.target.value)}
          value ={Email} />
        </div>
        <div className="password">
          <p>Password</p>
          <input type="password" onChange={(e)=>setPassword(e.target.value)}
          value ={Password} className="passtxt" />
        </div>
        <button className="login-btn">Sign Up</button>
        <div className="SignUp-Cont">
          <div className="Dont">Have an account?</div>
          <Link to="/SignIn" style={{ textDecoration: 'none' }}>
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
