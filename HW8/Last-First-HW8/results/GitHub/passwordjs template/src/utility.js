'use strict'

const fs = require('fs');
const {createHash} = require('crypto')

function readFile() {
    const fileName = 'HW8/references/passwordjs template/src/password.txt';
    try {
        if (!fs.existsSync(fileName)) {
            console.log(`${fileName} does not exist!`);
            return []; // Or return an empty array []
        }
        const text = fs.readFileSync(fileName, 'utf-8');
        const textByLine = text.split("\n");
        if (textByLine.length === 0) {
            console.log(`${fileName} is empty!`);
            return []; // Or return an empty array []
        }
        
        return textByLine;
    } catch (err) {
        console.log(`Error reading ${fileName}: ${err}`);
        return null; // Handle other potential errors
    }
}


function writeFile(data, fileName) {
    try {

        if (typeof fileName !== 'string') {
            throw new TypeError('File name must be a string.');
        }

        console.log(`Writing data to file: ${fileName}`);

        fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
        console.log(`File ${fileName} has been saved!`);
        } catch (err) {
        console.log(err);
    }
}

function hash(input) {
    return createHash('sha256').update(input).digest('hex'); // never use md5
}

function authenticate(email, password) {
    const credentials = readFile('password.txt');
    console.log(credentials.join('\n'));
    const hashedPassword = hash(password);
    for (const line of credentials) {
        const [fileEmail, filePassword] = line.split(':');
        if (fileEmail === email && hash(filePassword) === hashedPassword) {
            return true;
        } else {
            return false;
            console.log('Invalid email or password');
        }
    }
    return false;

}

module.exports = {readFile, writeFile, hash, authenticate};