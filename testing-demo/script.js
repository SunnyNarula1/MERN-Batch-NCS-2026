function add(a, b) {
    if (typeof (a) !== "number" || typeof (b) !== "number") {
        throw new TypeError("Both arguments must be numbers")
    }
    return a + b
}

function capitalize(str) {
    if (!str) return ""
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function getUser(id) {
    return { id, name: "Dhiraj", roles: ["admin", "trainer"] }
}

module.exports = { add, capitalize, getUser }