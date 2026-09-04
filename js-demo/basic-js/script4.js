class Person {
    constructor(){
        console.log('This is constructor')
    }
    Show() {
        console.log('This is show function')
    }
}

class Doctor extends Person {
    
}

const p = new Person()
p.Show()