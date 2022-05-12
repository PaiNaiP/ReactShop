import React, {useState} from 'react'
import gr from '../img/Group 2.svg'
import '../styles/addprod.css'
import { storage, db } from '../config/config'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadString, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { getElementError } from '@testing-library/react'



export const AddProducts = () => {
    const [title, setTitle]=useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('')
    const [image, setImage] = useState(null)

    const [imageError, setImageError] = useState('');

    const [successMsg, setSuccessMsg]=useState('')
    const [uploadError, setUploadError] = useState('');

    const [progress, setProgress]=useState(0 )

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG']
    const handleProductImg=(e)=>{
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
        })
    }
    const addtodb = async(url)=>{
        const docRef = await 
          docRef();
    }
    const handleAddProducts=()=>{
       
    }
  return (
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
        <button>ADD</button>
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

  )
    }
