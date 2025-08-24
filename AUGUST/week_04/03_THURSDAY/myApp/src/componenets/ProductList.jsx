import React, { useEffect, useState } from 'react';
import { Link } from "react-router"


const ProductList = () => {
    const [products, setproducts] = useState("");
    const [loading, setloading] = useState(false);


    async function fetchData() {
        setloading(true)
        try {
            const response = await fetch("https://fakestoreapi.com/products")
            const data = await response.json();
            setproducts(data)
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

        <>
            <h1>Prodcut List</h1>
            {loading && <h2 style={{ color: "blue" }} >Loading...</h2>}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }} >
                {products && products.map((product) => (

                    <Link to={`/product/id/${product.id}`} style={{textDecoration: "none",  marginBottom: "10px" }}>

                        <div style={{ height: "350px", boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" }}
                            key={product.id}>
                            <img src={product.image} width="150" alt="product image" />
                            <h2>{product.title}</h2>
                            <p>{product.price}</p>


                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default ProductList;
