const os = require('os')
const fs = require('fs')

// console.log(os.totalmem())
// console.log(os.freemem())
// console.log(os.hostname())
// console.log(os.cpus())

fs.writeFile('TestFile.txt', 'Something else', (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('File written successfully');
    }
})

fs.appendFile('TestFile.txt', "This is new line added", (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('File appended successfully');
    }
})

// fs.readFile('TestFile.txt', function (err, data) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data.toString())
//     }
// })