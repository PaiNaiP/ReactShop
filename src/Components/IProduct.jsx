import React from 'react'
import '../styles/iproduct.css'
import shoppingcart from '../img/Shopping_cart.svg'

export const IProduct = ({individualProduct, addToCart}) => {
    const handleAddToCard=()=>{
        addToCart(individualProduct)
    }
  return (
        <div className='productcont'>
            <img className='imageproduct' src={individualProduct.url} alt="kk" />
            <div className="btnpr">
                <div className="pr">{individualProduct.price+' ₽'}</div>
                <button className='butshop' onClick={handleAddToCard}><img className='ingshop' src={shoppingcart} alt="" /></button>
            </div>
            <div className="tit-disc">
                <div className='tit'>{individualProduct.title+', '}</div>
                <div className="discrip">{individualProduct.description}</div>
            </div>
        </div>
  )
}
