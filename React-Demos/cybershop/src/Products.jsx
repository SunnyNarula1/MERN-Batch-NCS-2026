import { useState, useEffect } from 'react'

export default function Products() {
    const [products, setProducts] = useState([])
    const apiUrl = import.meta.env.VITE_PRODUCT_API_URL
    const cartApiURL = import.meta.env.VITE_CART_API_URL
    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    function addToCart(id, name, quantity, price){
        fetch(cartApiURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: "user1",
                items: [{
                    productId: id,
                    name: name,
                    quantity: quantity,
                    price: price
                }]
            })
        }).then(res => res.json())
        .then(data => alert(data.message))
    }

    return (
        <div className="container">
            <div className="row">
                {
                    products.length > 0 ? products.map(item => <div className="col-md-3" key={item._id}>
                        <div className="card">
                            <img src={item.thumbnail} className="card-img-top" style={{"maxWidth": "75%"}} alt="..."></img>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.brand}</p>
                                <p className="card-text">{item.quantity}</p>
                                <p className="card-text">{item.price}</p>
                                {/* <button type="button" className="btn btn-danger" onClick={deleteProduct.bind(this, item.productId)}>X</button> */}
                                <button type="button" className="btn btn-primary" onClick={addToCart.bind(this, item.productId, item.name, item.quantity, item.price)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>) : <div className="mt-5 alert alert-warning text-center" role="alert">
                        No Products Found!
                    </div>
                }
            </div>
        </div>
    )
}
