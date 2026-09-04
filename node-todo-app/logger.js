const fs = require('fs')
const path = require('path')
const { styleText } = require('node:util')

const LOG_FILE = path.join(__dirname, 'app.log')

const STYLE = {
    INFO: 'cyan',
    WARN: 'yellow',
    ERROR: 'red'
}

function log(level, message) {
    const line = `[${new Date().toISOString()}] [${level}] ${message}`

    console.log(styleText(STYLE[level], line))

    fs.appendFile(LOG_FILE, line + '\n', (err) => {
        if (err) console.log('Could not write to log file: ', err.message)
    })
}

// module.exports = {
//     info: msg => log('INFO', msg),
//     warn: msg => log('WARN', msg),
//     error: msg => log('ERROR', msg)
// }

module.exports = { log }