const API = '/api/tasks'
const list = document.getElementById('list')
const input = document.getElementById('title')

async function load() {
    const res = await fetch(API)
    const tasks = await res.json()    
    list.innerHTML = ''
    if (!tasks.length) {
        list.innerHTML = '<li class="empty">No tasks yet</li>'
        return
    }

    tasks.map(task => {
        const li = document.createElement('li')
        li.className = task.done ? 'done' : ''
        li.innerHTML = `${task.title} <button class="del">Delete</button>`
        list.appendChild(li)
    })
}

// Create new item
async function add() {
    const title = input.value
    if (!title) return

    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    })

    input.value = ''
    load()
}

load()