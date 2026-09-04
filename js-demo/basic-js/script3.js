// function sayHello(name){
//     return `Hello ${name}`
// }

// console.log(sayHello('Dhiraj'))

const sayHello = (name) => {
    return `Hello ${name}`
}
console.log(sayHello('John'))

// const add = (a, b, c = 0) => {
//     console.log(a + b + c)
// }

// add(10, 20, 30)

// REST Operator
// const add = (...num) => {
//     let sum = 0
//     for (x of num) {
//         sum = sum + x
//     }
//     return sum
// }

// console.log(add(10, 20, 30, 40, 50, 60))

// // Spread Operator in Array for merging
// let x = [10, 20, 30]
// let y = [1, 2, 3, ...x]
// console.log(y)

// Spread operator in Objects for merging
// const user = { name: 'John', age: 25 }
// const employee = {Designation: 'Manager', ...user}
// console.log(employee)

// Spread operator for overriding
// const user = { name: 'John', age: 25 }
// const newuser = {...user, age: 35}
// console.log(newuser)