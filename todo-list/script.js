function AddItem() {
    let item = document.getElementById('textItem').value
    let obj = {
        text: item,
        iscompleted: false
    }
    fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(res => {
        let listItem = document.createElement('li')
        listItem.innerHTML = `<li class="list-group-item">${item}  <button class="btn btn-danger btn-sm float-end"><i class="fa-solid fa-trash-can"></i></button></li>`
        listItem.className = 'list-group-item'
        document.getElementById('todoList').appendChild(listItem)
    })
}
function GetItems() {
    fetch('http://localhost:3000/todos')
        .then(res => res.json())
        .then(data => {
            data.map(item => {
                let listItem = document.createElement('li')
                listItem.innerHTML = `<li class="list-group-item">${item.text}  <button class="btn btn-danger btn-sm float-end"><i class="fa-solid fa-trash-can" onclick="DeleteItem('${item.id}')"></i></button></li>`
                listItem.className = 'list-group-item'
                document.getElementById('todoList').appendChild(listItem)
            })
        })
}
function DeleteItem(id) {
    fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
    }).then(res => {
        GetItems()
    })
}

GetItems()