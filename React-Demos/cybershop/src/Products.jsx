import { useState, useEffect } from 'react'

export default function Products() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    function deleteProduct(id) {
        fetch(`http://localhost:5000/api/v1/product/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message)
                setProducts(products.filter(x => x.productId !== id))
            })
    }

    return (
        <div className="container">
            <div className="row">
                {
                    products.map(item => <div className="col-md-4" key={item._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.brand}</p>
                                <p className="card-text">{item.quantity}</p>
                                <p className="card-text">{item.price}</p>
                                <button type="button" className="btn btn-danger" onClick={deleteProduct.bind(this, item.productId)}>X</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}
