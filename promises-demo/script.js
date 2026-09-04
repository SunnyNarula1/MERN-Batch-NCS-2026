// const  promise = new Promise((function(resolve, reject) {
//     let isCompleted = true;
//     if(isCompleted){
//         resolve('Task Completed')
//     }else{
//         reject('Error Occurred')
//     }
// }))

// promise.then(msg => console.log(msg)).catch(err => console.log(err))

var items = ['Item1', 'Item2']

const AddItem = (item) => {
    let isCompleted = true
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isCompleted) {
                items.push(item)
                return resolve();
            } else {
                return reject('Error occurred')
            }
        }, 2000)
    })
}

const GetItems = () => {
    items.map(item => {
        console.log(item)
    })
}

// AddItem('Item3')
//     .then(x => GetItems())
//     .catch(err => console.log(err))

// const RunTasks = aysnc()=> {    

// }

async function RunTasks(){
    await AddItem('Item3')
    GetItems()
}

RunTasks()