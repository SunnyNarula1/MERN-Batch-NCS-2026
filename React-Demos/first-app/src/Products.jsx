export default function Products({quantity, price, productlist}) {
    return (
        <div>
            <h2>Products Qty- {quantity}</h2>
            <h2>Products Price - {price}</h2>
            <ul>
                {
                    productlist.map(item => <li>{item}</li>)
                }
            </ul>
        </div>
    )
}