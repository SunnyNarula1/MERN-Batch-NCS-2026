# Assignment Title: PawFinder
Building a Dynamic Adoption Board with HTML, Bootstrap, JavaScript (DOM + Fetch) and json-server

## Problem Statement:
In this assignment, you will demonstrate your ability to build a fully interactive, single-page web application using only HTML, CSS/Bootstrap, and vanilla JavaScript. No frameworks or build tools are permitted. Every visible change on the page — rendering data, filtering, adding, updating, and removing records — must be achieved through DOM manipulation driven by JavaScript. A `json-server` instance will act as your REST backend.

## Scenario:
"Happy Tails", a city animal shelter, currently maintains its adoptable animals on a printed noticeboard that volunteers update by hand. They have hired you to build **PawFinder**, a web page that volunteers can use on a tablet at the reception desk. Volunteers need to see all animals currently at the shelter, search and filter them, register a newly arrived animal, correct details, mark an animal as adopted once a family takes it home, and remove records that were entered by mistake. The shelter has no backend team, so the shelter's data will be served by `json-server` from a `db.json` file.

## Assignment Objectives:
1. Render the animal list into the page dynamically from the API — the HTML file must contain **no hard-coded animal data**.
2. Practise core DOM APIs:
    - Selecting elements (`getElementById`, `querySelector`, `querySelectorAll`)
    - Creating and inserting nodes (`createElement`, `appendChild`, `append`, `textContent`)
    - Reading and updating element content and attributes (`dataset`, `value`, `classList`)
    - Removing nodes from the DOM (`remove`, `replaceChildren`)
3. Handle user interaction with event listeners:
    - `submit` on the registration form (prevent the default page reload)
    - `input` / `change` on the search box and filter controls
    - `click` on Edit / Adopt / Delete buttons using a **single delegated listener** on the container, not one listener per card
4. Perform CRUD operations against `json-server` using `fetch` with `async/await`:
    - `GET /animals` — load and display all animals
    - `GET /animals/:id` — load one animal into the form for editing
    - `POST /animals` — register a newly arrived animal
    - `PUT` or `PATCH /animals/:id` — update details / mark as adopted
    - `DELETE /animals/:id` — remove a record
5. Implement client-side form validation in JavaScript before any request is sent: required fields, name at least 2 characters, age a non-negative number, and a valid selection for species and gender. Show validation messages next to the offending field by manipulating the DOM — do **not** use `alert()`.
6. Implement search and filtering entirely in JavaScript over the fetched array:
    - Case-insensitive search by name or breed
    - Filter by species (Dog / Cat / Rabbit / Other)
    - Filter by status (Available / Adopted)
    - Sort by name (A–Z) and by age
7. Maintain a live summary bar that updates on every change, showing total animals, count available, and count adopted.
8. Reflect state visually: adopted animals should be clearly distinguished (for example, a "muted" card with an *Adopted* badge), and the Adopt button should no longer be actionable for them.
9. Handle the empty and error states in the DOM: a friendly message when no animal matches the current filters, and a visible message when the API call fails.

## Data Model:
Create a `db.json` file with an `animals` collection. Each animal object should include:
- **id**: A unique identifier (managed by json-server).
- **name**: A string representing the animal's name.
- **species**: A string — one of Dog, Cat, Rabbit, Other.
- **breed**: A string representing the breed.
- **age**: A number representing the age in years.
- **gender**: A string — Male or Female.
- **vaccinated**: A boolean indicating whether vaccinations are up to date.
- **arrivalDate**: A string (YYYY-MM-DD) representing the date the animal arrived at the shelter.
- **status**: A string — "Available" or "Adopted".
- **notes**: A string with temperament or care notes.
- **photoUrl**: A string with a URL to the animal's photo (use any placeholder image service).

Seed the file with at least 8 animals covering a mix of species and statuses.

## Requirements:
1. **Deliverables:** exactly four files — `index.html`, `styles.css`, `app.js`, and `db.json`. No `npm init`, no bundler, no framework, no starter template.
2. Include Bootstrap 5 via CDN only. Use it for basic layout, cards, forms, buttons, and badges. **No Bootstrap JavaScript components are required** — the interactivity must be yours.
3. All JavaScript must live in `app.js` and be linked as an external script. No inline `onclick` attributes in the HTML.
4. Start the backend with `npx json-server --watch db.json --port 3000` and consume `http://localhost:3000/animals`.
5. After any successful create, update, or delete, the page must reflect the change **without a page reload**.
6. Do not rebuild the whole page with a single `innerHTML` assignment of a large HTML string. Build cards using `createElement` and set text with `textContent`. Explain in a comment why this matters when data comes from user input.
7. Use `let`/`const`, arrow functions, template literals, and array methods (`filter`, `map`, `sort`, `reduce`) appropriately.
8. Handle every `fetch` call with `try...catch`, check `response.ok`, and disable the submit button while a request is in flight.
9. Keep the code readable: small single-purpose functions (e.g. `loadAnimals`, `renderAnimals`, `buildAnimalCard`, `applyFilters`, `updateSummary`, `validateForm`), meaningful names, and brief comments.
10. The page must be usable on a tablet-width screen (responsive grid of cards).