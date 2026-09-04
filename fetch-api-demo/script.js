// fetch('https://dummyjson.com/products')
//     .then(x => x.json())
//     .then(data => console.log(data.products))

async function GetData() {
    let data = await fetch('https://dummyjson.com/products')
    let products = await data.json()
    console.log(products)
}

GetData()