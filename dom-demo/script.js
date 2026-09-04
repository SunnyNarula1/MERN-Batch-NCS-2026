// Common Browser Objects
// Window, Document, Screen, Location, History, Navigator

// document.getElementById('heading').innerText = "Hello and Welcome to HTML and DOM with JavaScript"

function changeContent() {
    document.querySelector('#heading').innerText = "Hello and Welcome to HTML and DOM with JavaScript"

    document.querySelector('.mystyle').innerText = "Content Changed"

    document.querySelector('p').innerText = "This is my paragraph"
}

function addItem() {
    let item = document.getElementById('txtItem').value
    const listItem = document.createElement('li')
    listItem.innerText = item
    document.getElementById('items').appendChild(listItem)
}

document.getElementById('btn1').addEventListener('click', changeContent)
document.getElementById('btnAdd').addEventListener('click', addItem)
