'use strict'
const fs = require('fs');
const {readFile, writeFile, hash} = require('./utility');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://garciaa12:H96KSSfEpwDvlWk7@ase285cluster.drz3zaw.mongodb.net/app_data?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const passwordSchema = new mongoose.Schema({
    email: String,
    hashedPassword: String
});

const passwordModel = mongoose.model('password', passwordSchema);

function makepassword(passwordFileName, passwordEncFileName) {
   readFile(passwordFileName, (err, data) => {
    if (err) {
        console.error('Error reading file: ${passwordFileName}');
        return;
    }

    const credentials = data.split('\n').filter(Boolean);
    const encryptedCredentials = credentials.map(line => {
        const [email, password] = line.split(':');
        const hashedPassword = hash(password);
        return { email, hashedPassword };
    });
    writeFile(passwordEncFileName, encryptedCredentials.map(({email, hashedPassword}) => `${email}:${hashedPassword}`).join('\n'), (err) =>{
        if (err) {
            console.error('Error writing file: ${passwordEncFileName}');
            return;
           }
        console.log('Password file has been saved to ${passwordEncFileName}!');

        uploadToMongoDB(encryptedCredentials);
        });
    })
    
}

async function uploadToMongoDB(credentials) {
    try {
        await passwordModel.insertMany(credentials);
        console.log('Upload to MongoDB completed.');
    } catch (error) {
        console.error('Error uploading to MongoDB:', error);
    } finally {
        mongoose.disconnect();
    }
}

if (require.main === module) {
    makepassword('C:\\Users\\allig\\OneDrive\\Desktop\\NKU\\ASE285\\HW8 (1)\\HW8\\references\\passwordjs template\\password.txt', '../password.enc.txt')
}

module.exports = {makepassword};