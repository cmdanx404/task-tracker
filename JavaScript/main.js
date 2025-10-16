// let a = 10
// function outer() {
//     let b = 20
//     function inner() {
//         let c = 30
//         console.log(a, b, c)
//     }
//     inner()
// }
// outer()

// function outer() {
//     counter = 0
//     function inner() {
//         counter++
//         console.log(counter)
//     }
//     inner()
// }
// outer()
// outer()

// function outer() {
//     counter = 0
//     function inner() {
//         counter++
//         console.log(counter)
//     }
//     return inner
// }
// const fn = outer()
// fn()
// fn()

// function sum(a, b, c) {
//     return a + b + c
// }
// console.log(sum(2, 3, 5))

// function curry(fn){
//     return function (a) {
//         return function (b) {
//             return function (c) {
//                 return fn(a, b, c)
//             }
//         }
//     }
// }
// const curriedSum = curry(sum)
// console.log(curriedSum(2)(3)(5))

// const add2 = curriedSum(2)
// const add3 = add2(3)
// const add5 = add3(5)
// console.log(add5)

// function sayMyName(name) {
//     console.log(`My name is ${name}`)
// } 
// sayMyName(`Walter White`)
// sayMyName(`Weisenberg`)

// globalThis.name = 'Superman'

// const person = {
//     name: 'Vishwas',
//     sayMyName: function () {
//         console.log(`My name is ${this.name}`)
//     },
// }
// // person.sayMyName()

// function sayMyName() {
//     console.log(`My name is ${this.name}`)
// }

// // sayMyName.call(person)

// function Person(name) {
//     this.name = name
// }
// const p1 = new Person('Vishwas')
// const p2 = new Person('Batman')

// // console.log(p1.name)
// // console.log(p2.name)

// sayMyName()


// Constructor function
function Person(fName, lName) {
    this.firstName = fName
    this.lastName = lName
}
// declare new function

Person.prototype.getFullname(this, fName, lName) 
    return this.firstName + ' ' + this.lName

function SuperHero(fName, lName) {
    Person.call(this, fName, lName); 
    this.isSuperHero = true;
}

// ✅ Inherit from Person
SuperHero.prototype = Object.create(Person.prototype)
SuperHero.prototype.constructor = SuperHero;


// ✅ Add SuperHero method
SuperHero.prototype.fightCrime = function() {
    console.log('fighting crime');
};

// ✅ Use `new` to instantiate
const Batman = new SuperHero('Bruce', 'Wayne');
console.log(Batman.getFullname());
Batman.fightCrime();              
