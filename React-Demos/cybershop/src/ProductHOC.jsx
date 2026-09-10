import { useState, useEffect } from "react";

export default function ProductHOC(Component) {
    function NewComponent() {
        const apiUrl = import.meta.env.VITE_PRODUCT_API_URL
        const [products, setProducts] = useState([])
        useEffect(() => {
            fetch(apiUrl)
                .then(res => res.json())
                .then(data => setProducts(data))
        }, [])
        function deleteProduct(id) {
            fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    alert(data.message)
                    setProducts(products.filter(x => x.productId !== id))
                })
        }
        return <Component products={products} deleteProduct={deleteProduct} />
    }
    return NewComponent
}