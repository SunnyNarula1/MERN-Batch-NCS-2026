fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        data.products.map(item => {
            const listItem = document.createElement('li')
            listItem.innerText = item.title
            listItem.className = 'list-group-item'
            document.getElementById('products').appendChild(listItem)
        })
    })