//  fetch('https://fakestoreapi.com/products')
// .then(res => res.json())
// .then(data => console.log(data))

//Same thing usign Async Await---

 async function fetchProduct() {

    try {
        let response = await fetch('https://fakestoreapi.com/products')
        let products = await response.json();
        console.log(products)
        let filteredProduct = products.filter((product) => product.price > 150)
        console.log(filteredProduct)

    } catch (error) {
     console.log(error)
    }
}

//fetchProduct()


fetch('https://fakestoreapi.com/products')
.then(res => res.json())
.then((products) => {
    console.log(products.filter((product) => product.price > 150));
})