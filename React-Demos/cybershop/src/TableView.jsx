import {useState, useEffect} from 'react'
import ProductHOC from './ProductHOC'

function TableView({products, deleteProduct}) {
    return (
        <table className='mt-3 table table-striped'>
            <thead>
                <tr>
                    <th>Thumbnail</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.length > 0 ? products.map(item => <tr key={item.productId}>
                        <td><img src={item.thumbnail} alt="" style={{ "width": "200px" }} /></td>
                        <td>{item.name}</td>
                        <td>{item.brand}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td><button className="btn btn-danger" onClick={deleteProduct.bind(this, item.productId)}>Delete</button></td>
                    </tr>) : <></>
                }

            </tbody>
        </table>
    )
}

export default ProductHOC(TableView)