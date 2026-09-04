function sayHello(name) {
    return `Hello ${name}`
}

function fetchDataAsync(value, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            shouldFail ? reject(new Error("Fetch failed")): resolve(value)
        }, 1000)
    })
}

module.exports = { sayHello, fetchDataAsync }