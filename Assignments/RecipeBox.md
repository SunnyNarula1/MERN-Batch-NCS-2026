# Assignment Title: RecipeBox
Building a Small Web App Using Node.js Core Modules

## Problem Statement:
In this assignment, you will demonstrate your understanding of Node.js core modules by building a small web application **without any external packages or frameworks**. No Express, no npm install. You will create an HTTP server from scratch, serve HTML pages, read and write data using the file system, split your logic into your own reusable modules, and handle form submissions.

## Scenario:
A home cook named Meera keeps her recipes in a notebook and wants a simple web app she can run on her own laptop. She has hired you to build **RecipeBox** — a small site where she can view all her recipes, open a single recipe, and add a new one through a form. Everything runs locally: the server is plain Node.js, and the recipes are stored in a JSON file on disk.

## Assignment Objectives:
1. Create an HTTP server using the **`http`** module that listens on port 3000 and responds to different URLs with different content.
2. Use the **`fs`** module (async APIs) to read and write `recipes.json`, and to serve a static CSS file.
3. Use the **`path`** module to build file paths safely instead of joining strings by hand.
4. Use the **`url`** module (or the `URL` class) to read the request path and query parameters, for example `/recipe?id=3`.
5. Create and use your **own custom modules** with `module.exports` / `require`:
    - `recipeStore.js` — read all recipes, find one by id, add a new one
    - `views.js` — functions that return HTML strings for each page
6. Use the **`os`** module to print the platform, hostname, and free memory to the console when the server starts.
7. Handle form submission: read the POST request body in chunks from the request stream, parse it, save the recipe, and redirect back to the home page.
8. Return correct status codes: `200` for pages, `302` for the redirect after saving, `404` for unknown routes with a simple "Page not found" page.

## Routes to Implement:
| Method | Route | Purpose |
|---|---|---|
| GET | `/` | List all recipe names as links |
| GET | `/recipe?id=<id>` | Show one recipe with its ingredients and steps |
| GET | `/add` | Show the "Add a recipe" form |
| POST | `/add` | Save the new recipe and redirect to `/` |
| GET | `/styles.css` | Serve the stylesheet with the correct content type |
| * | anything else | 404 page |

## Data Model:
Create a `recipes.json` file containing an array of recipe objects:
- **id**: A number uniquely identifying the recipe.
- **name**: A string with the recipe name.
- **category**: A string such as Breakfast, Snack, Main Course, or Dessert.
- **cookingTime**: A number representing minutes.
- **ingredients**: An array of strings.
- **steps**: An array of strings.

Seed the file with at least 4 recipes.

## Requirements:
1. **Deliverables:** `server.js`, `recipeStore.js`, `views.js`, `styles.css`, and `recipes.json`. Nothing else.
2. **No external packages.** Only Node.js built-in modules are allowed. Do not run `npm install`.
3. Start the app with `node server.js` and open `http://localhost:3000`.
4. All file operations must use the asynchronous `fs` APIs (callbacks or `fs/promises`) — not the `*Sync` versions.
5. The new recipe's `id` must be generated in code, not typed by the user. Ingredients and steps can be entered as comma-separated text and split into arrays before saving.
6. Wrap file reads and writes in error handling; if a file cannot be read, respond with a `500` and a plain message instead of crashing the server.
7. Keep `server.js` focused on routing only — data logic belongs in `recipeStore.js` and HTML generation in `views.js`.