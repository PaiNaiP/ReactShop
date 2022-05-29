import React from 'react'
import { SearchResult } from './SearchResult'

export const Search = ({products}) => {
    return (
      products.map((searchResult)=>(
        <SearchResult key ={searchResult.ID} searchResult = {searchResult}/>
      ))
    )
  }
  
