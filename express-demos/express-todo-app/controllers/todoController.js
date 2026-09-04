import { v4 as uuidv4 } from 'uuid';

let todos = [
    { id: uuidv4(), text: 'Learn MERN Stack', done: false }
]

function getAllTodos(req, res) {
    // res.status(200).send({ todos: todos })
    res.render('index', {todos: todos})
}

function addTodo(req, res) {    
    todos.push({ id: uuidv4(), text: req.body.text, done: false })
    // res.status(200).send({ message: "Todo added successfully" })
    res.redirect('/')
}

function deleteTodo(req, res) {
    let todo = todos.find(x => x.id == req.params.id)
    let index = todos.indexOf(todo)
    todos.splice(index, 1)
    // res.status(200).send({ message: "Todo deleted successfully" })
    res.redirect('/')
}

export { getAllTodos, addTodo, deleteTodo }
