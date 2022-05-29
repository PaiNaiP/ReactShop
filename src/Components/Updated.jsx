import React from 'react'
import { UpdateInputs } from './UpdateInputs'

export const Updated = ({product}) => {
    return ( product.map((updated)=>(
        <UpdateInputs key={updated.ID} updated={updated}
        />
    ))
    )
}
