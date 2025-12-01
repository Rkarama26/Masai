'use client'
import React from 'react'

const AddToCart = () => {
    return (
        <div className='border py-5'>
            <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded'
                onClick={() => console.log("click")}
            >Add to cart</button>
            <p className='text-xs'>this is from client component</p>

        </div>
    )
}

export default AddToCart
