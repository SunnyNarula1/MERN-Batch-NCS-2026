import { useState, useEffect } from 'react'
import { useParams } from "react-router";

export default function ProductDetails() {
    const params = useParams()
    const [product, setProduct] = useState()
    useEffect(() => {
        fetch(`https://dummyjson.com/products/${params.id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    {
                        product ? <div className="card mb-3" style={{ "maxWidth": "540px" }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={product.thumbnail} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <p className="card-text">{product.category}</p>
                                        <p className="card-text">{product.brand}</p>
                                        <p className="card-text"><small className="text-body-secondary">{product.price}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div> : <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}
