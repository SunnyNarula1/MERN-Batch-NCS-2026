let fruits = ['Apple', 'Mango', 'Cherry', 'Orange']
fruits.sort()
console.log(fruits)
fruits.reverse()
console.log(fruits)
fruits.push('Grapes')
console.log(fruits)
fruits.splice(2, 1) // Deleting the item
console.log(fruits)
fruits.splice(2, 1, 'Avacado') // Replacing the item
console.log(fruits)
console.log(fruits.indexOf('Mango'))
fruits.shift()
console.log(fruits)
fruits.unshift('Guava')
console.log(fruits)

// Declaring the objects in JavaScript
let person = {
    fname: 'Peter',
    lname: 'Parker',
    age: 25,
    show: function () {
        console.log(`Your name is ${this.fname}. You are ${this.age} years old.`)
        // console.log('Your name is '+this.name+'. You are '+this.age+' years old')
    }
}

console.log(person.fname)
console.log(person.lname)
person.show()

let persons = [
    {
        fname: 'Peter', lname: 'Parker', email: 'Peter@gmail.com', age: 25
    },
    {
        fname: 'Tony', lname: 'Stark', email: 'Tony@gmail.com', age: 45
    },
    {
        fname: 'James', lname: 'Cameron', email: 'james@gmail.com', age: 76
    }
]

// for (x of persons){
//     console.log(x.fname)
// }

// persons.forEach(function(obj, index){
//     console.log(obj.email)
// })

// let result = persons.map(function(obj, index){
//     if (obj.age>50){
//         return obj.fname
//     }
// })
// console.log(result)

// let result = persons.filter(x => x.age>50)
// console.log(result[0].fname)

// let result = persons.find(x => x.age>50)
// console.log(result.fname)

