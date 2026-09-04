import { useState, useEffect } from "react";
export default function ProductCatalog() {
    const [Products, setProducts] = useState([])
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then((res) => res.json())
            .then((data) => setProducts(data.products))
    }, [])

    return (
        <div>
            <ul>
                {
                    Products.map(item => <li>{item.title}</li>)
                }
            </ul>
        </div>
    )
}