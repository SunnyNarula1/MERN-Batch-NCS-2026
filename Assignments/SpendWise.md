# Assignment Title: SpendWise
Building a Simple Expense Manager with Express.js and EJS

## Problem Statement:
In this assignment, you will demonstrate your ability to build a small server-rendered web application using Express.js with EJS. The entire application is a **single page rendered from a single EJS view**, and all data is stored **in memory** — no database is involved. You will organise the code the way Express applications are usually structured: `app.js` for setup, a router file for the route definitions, and a controller file for the logic behind each route. Partials and layouts are not used.

## Scenario:
A college student named Arjun wants a simple web page to keep track of where his monthly allowance goes. On one screen he wants to add an expense, see all his expenses in a table, know how much he has spent in total, filter the list by category, and delete an entry he added by mistake. He does not want to install a database — the expenses can live in a JavaScript array in the running application. Your job is to build **SpendWise** for him.

## Assignment Objectives:
1. Set up an Express.js application and configure **EJS** as the view engine.
2. Store expenses in a plain JavaScript array held in memory.
3. Serve a stylesheet from a `public` folder using `express.static`.
4. Read submitted form data using the `express.urlencoded` middleware.
5. Define all routes in a separate file using **`express.Router`**, and mount that router in `app.js`.
6. Keep each route's logic in a separate **controller** file. The router should only map a path to a controller function — it should contain no business logic.
7. Render the one and only view with `res.render("index", data)`, passing the expense list, the total, the selected category, and any validation error.
8. Use basic EJS tags inside that single view:
    - `<%= %>` to print the title, amount, category, date, and total
    - `<% %>` with a loop to render one table row per expense
    - a simple `if` to show a "No expenses yet" message when the list is empty
    - a simple `if` to show the validation error message above the form when one exists
9. Use a **query string** to filter the same page: `GET /?category=Food` shows only that category's expenses, and the total reflects the filtered list.
10. Use a **route parameter** for deletion: `POST /delete/:id` removes the matching expense.
11. Validate the form in the controller before adding: reject an empty title, an amount that is not a number or is not greater than zero, and a category outside the allowed list. On failure, re-render the same page with an error message instead of adding the expense.
12. Use `res.redirect("/")` after a successful add or delete so refreshing the page does not re-submit the form.

## Routes to Implement:
| Method | Route | Controller function | Purpose |
|---|---|---|---|
| GET | `/` | `showExpenses` | Render the page: add form, expense table, total; apply the `?category=` filter if present |
| POST | `/add` | `addExpense` | Validate and add an expense, then redirect to `/` |
| POST | `/delete/:id` | `deleteExpense` | Remove the expense, then redirect to `/` |

## Data Model:
Each expense object should include:
- **id**: A number uniquely identifying the expense.
- **title**: A string describing what the money was spent on.
- **amount**: A number representing the amount in rupees.
- **category**: A string — Food, Travel, Books, Rent, or Other.
- **date**: A string (YYYY-MM-DD) representing the date of the expense.

Seed the array with at least 5 expenses across different categories.

## The View:
Create exactly one file, `views/index.html`, containing the full HTML page with:
- A heading and the total spent
- Category filter links (`/?category=Food`, and an "All" link back to `/`)
- The add-expense form posting to `/add`, with a text field for title, a number field for amount, a dropdown for category, and a date field
- A table of expenses, each row ending with a small form that posts to `/delete/:id`

**Do not create a second view, a partial, an include, or a layout.**

## Suggested Project Structure:
```
spendwise/
├── app.js
├── routes/
│   └── expenseRoutes.js
├── controllers/
│   └── expenseController.js
├── views/
│   └── index.html
├── public/
│   └── css/
│       └── styles.css
└── package.json
```

## Requirements:
1. **Deliverables:** the files shown in the structure above — nothing more.
2. Only three dependencies are permitted: `express`, `uuid` and `ejs`. No database, no ORM.
3. Data lives in memory only — it is expected that expenses are lost when the server restarts.
4. `app.js` must contain only setup: view engine, static folder, `express.urlencoded`, mounting the router, and starting the server. No route logic there.
5. The router file must contain only `router.get(...)` / `router.post(...)` lines pointing at controller functions, plus `module.exports = router`.
6. New ids must be generated in the controller, never entered by the user.
7. The total must be calculated in the controller, not inside the view, and passed to the view as a value.
8. `req.params.id` arrives as a string — convert it before comparing with the numeric `id`.
9. Delete must be triggered by a form using `POST`, not by a link.
10. Start the app with `node app.js` (or `nodemon app.js`) on port 3000.