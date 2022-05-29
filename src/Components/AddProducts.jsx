import React, {useState, useEffect} from 'react'
import gr from '../img/Group 2.svg'
import '../styles/addprod.css'
import { storage, db, auth } from '../config/config'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc,doc, getDoc, getDocs, updateDoc, query, where } from 'firebase/firestore'
import { ref, uploadString, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { getElementError } from '@testing-library/react'
import bskt from '../img/Goodies - Crying.png'
import { Navbar } from './Navbar'
import { NotFound } from './NotFound'


export const AddProducts = () => {

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
              console.log(currentUse)
            }
            else{
              setUser(null)
            }
          })
        }, [])
        return user;
      }
      const users = GetCurrentUser();
    const [title, setTitle]=useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('')
    const [image, setImage] = useState(null)
    const [quantity, seQuantity] = useState(0)
    const [imageError, setImageError] = useState('');

    const [successMsg, setSuccessMsg]=useState('')
    const [uploadError, setUploadError] = useState('');

    const [progress, setProgress]=useState(0 )
const nn = async(q,b)=>{
    
    
} 

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG']
    const handleProductImg=(e)=>{
      if(title!=''&&description!=''&&price!=''){
        const selectedFile = e.target.files[0];
        setImage(selectedFile)
        const images = ref(storage, `/files/${selectedFile.name}`);
        const uploadTask = uploadBytesResumable(images, selectedFile)
        uploadTask.on("state_changed", (snapshot)=>{
            const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
            setProgress(prog)
            console.log(progress)
        },(err)=> console.log(err),
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref)
            .then(url=>{
                addDoc(collection(db, "products"), {
                    title:title,
                    description:description,
                    price: Number(price),
                    url:url
                  });

            })
            
//             const q = query(collection(db, "products"), where("title", "==", title));
// let b = ''
// const querySnapshot =  getDocs(q);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   b= doc.id
// });
// updateDoc(q, {
//     id: b
//   });

         })
        }
        else{
          alert('Заполните все поля!')
        }
    }
    const addtodb = async(url)=>{
        const docRef = await 
          docRef();
    }
    const handleAddProducts=()=>{
       
    }
  return (<>
    {currentUse.email == 'admin@admin.com'&&
    <div className="contprod">
    <div className='inpprod'>
         <h1>ADD PRODUCTS</h1>
         {successMsg&&<>
         <div className='success-msg'>{successMsg}</div>
         <br></br>
         </>}
    <form action="" className='inpm' onSubmit={handleAddProducts}>
        <div className="Name">
            <p>Product Name</p>
            <input className='inout' type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/>
        </div>
        <div className="price">
            <p>Product Price</p>
            <input className='inout' type="text" onChange={(e)=>setPrice(e.target.value)} value={price}/>
        </div>
        <div className="desc">
            <p>Product Descriprion</p>
            <input className='inout' type="text" onChange={(e)=>setDescription(e.target.value)} value={description}/>
        </div>
        <div className="ph">
            <p>Photo</p>
            <input id='file' type="file" className='ph-inp' onChange={handleProductImg}/>
        </div>
        
        
    </form>
    {imageError&&<>
        <div className='error-msg'>{imageError}</div>
        <br></br>
    </>}
    {uploadError&&<>
        <br></br>
        <div className='error-msg'>{uploadError}</div>
    </>}
    </div>
    <img src={gr} alt="" className='imgprod'/>
    </div>
    }
    {currentUse.email != 'admin@admin.com'&&
    <>
    <NotFound/>
    </>
}
    </>
  )
    }
