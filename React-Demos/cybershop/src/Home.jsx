import { useState, useEffect } from 'react'
import { Link } from 'react-router'

export default function Home() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => setProducts(data.products))
    }, [])

    return (
        <div className="container">
            <div className="row">
                {
                    products.map(item => <div key={item.id} className="col-md-3">
                        <div className="card">
                            <img src={item.thumbnail} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text">{item.brand}</p>
                                <p className="card-text">{item.price}</p>
                                <Link to={`/product-details/${item.id}`} className="btn btn-primary">View Details</Link>
                            </div>
                        </div>
                    </div>)
                }

            </div>
        </div>
    )
}
