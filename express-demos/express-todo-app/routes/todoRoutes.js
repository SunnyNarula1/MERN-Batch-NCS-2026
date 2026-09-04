import express from "express"
import { getAllTodos, addTodo, deleteTodo } from "../controllers/todoController.js"

const router = express.Router()

router.get("/", getAllTodos)
router.post("/add", addTodo)
router.post("/delete/:id", deleteTodo)

export default router