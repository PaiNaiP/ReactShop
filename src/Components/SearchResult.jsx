import React from 'react'
import '../styles/navbar.css'
import { Link } from 'react-router-dom'

export const SearchResult = ({searchResult}) => {
  return (
      <div className="srchn">
         <Link key={searchResult} to={`/Product/${searchResult}`} style={{ textDecoration: 'none' , color: 'black'}}>
        <div className='searchone' >
            {searchResult}
        </div>
        </Link>
    </div>
  )
}