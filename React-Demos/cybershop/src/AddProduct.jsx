import { useState } from 'react'

export default function AddProduct() {
    const [Name, setName] = useState('')
    const [Brand, setBrand] = useState('')
    const [Quantity, setQuantity] = useState(0)
    const [Price, setPrice] = useState(0)
    function saveProduct() {
        fetch('http://localhost:5000/api/v1/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: Name,
                brand: Brand,
                quantity: Quantity,
                price: Price
            })
        }).then(res => res.json())
            .then(result => alert(result.message))
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className="mt-2">
                        <input type="text" onChange={(e) => setName(e.target.value)} className='form-control' placeholder="Product Name" />
                    </div>
                    <div className="mt-2">
                        <input type="text" onChange={(e) => setBrand(e.target.value)} className='form-control' placeholder="Brand" />
                    </div>
                    <div className="mt-2">
                        <input type="number" onChange={(e) => setQuantity(e.target.value)} className='form-control' placeholder="Quantity" />
                    </div>
                    <div className="mt-2">
                        <input type="number" onChange={(e) => setPrice(e.target.value)} className='form-control' placeholder="Price" />
                    </div>
                    <div className="mt-2">
                        <button type="button" onClick={saveProduct} className="btn btn-success">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
