import { useState, useEffect } from 'react'
import ProductHOC from './ProductHOC'

function CardView({products, deleteProduct}) {
    return (
        products.length > 0 ? products.map(item => <div className="col-md-3" key={item._id}>
            <div className="card">
                <img src={item.thumbnail} className="card-img-top" style={{ "maxWidth": "75%" }} alt="..."></img>
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.brand}</p>
                    <p className="card-text">{item.quantity}</p>
                    <p className="card-text">{item.price}</p>
                    <button type="button" className="btn btn-danger" onClick={deleteProduct.bind(this, item.productId)}>X</button>
                </div>
            </div>
        </div>) : <div className="mt-5 alert alert-warning text-center" role="alert">
            No Products Found!
        </div>
    )
}
export default ProductHOC(CardView)