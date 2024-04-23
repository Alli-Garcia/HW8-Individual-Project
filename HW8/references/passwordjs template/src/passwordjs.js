'use strict'
const fs = require('fs');
const util = require('./utility')

function passwordjs() {
    if (process.argv.length != 5) return 'false';

    var filename = process.argv[2]
    var email = process.argv[3]
    var password = process.argv[4]

    const credentials = util.readFile(filename);

    if (!credentials) return 'false';

    const hashedPassword = util.hash(password);

    for (const line of credentials) {
        const [fileEmail, filePassword] = line.split(':');
        if (fileEmail === email && util.hash(filePassword) === hashedPassword) {
            return 'true';
        }
    }

    return 'false';
}

if (require.main === module) {
    console.log(passwordjs()) // print out true or false
}

module.exports = {passwordjs};