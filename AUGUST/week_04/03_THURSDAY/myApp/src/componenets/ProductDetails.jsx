import React, { useEffect, useState } from 'react';
import { useParams } from "react-router"

const ProductDetails = () => {

    const { id } = useParams();
    const [product, setproduct] = useState("");
    const [loading, setloading] = useState(false);


    async function fetchData() {
        setloading(true)
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            const data = await response.json();
            setproduct(data)
            console.log(data)
        } catch (error) {
            console.log("error", error)
        }
        finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <h1>productId: {id}</h1>
            {loading && <h2 style={{ color: "blue" }} >Loading...</h2>}

            <div style={{ height: "800px", boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" }}
                key={product.id}>
                <img src={product.image} width="350" alt="product image" />
                <h2>{product.title}</h2>
                <p>{product.price}</p>


            </div>
        </div>
    );
}

export default ProductDetails;
