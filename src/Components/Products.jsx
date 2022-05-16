import React from 'react'
import { IProduct } from './IProduct'

export const Products = ({products, addToCard, user}) => {
  console.log(products)
  return (
    products.map((individualProduct)=>(
      <IProduct key ={individualProduct.ID} individualProduct={individualProduct}
      addToCart={addToCard} user={user}/>
    ))
  )
}
