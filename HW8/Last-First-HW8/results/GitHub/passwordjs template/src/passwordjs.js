'use strict';
const mongoose = require('mongoose');
const util = require('./utility');

mongoose.connect('mongodb+srv://garciaa12:H96KSSfEpwDvlWk7@ase285cluster.drz3zaw.mongodb.net/app_data?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});

const passwordSchema = new mongoose.Schema({
    email: String,
    hashedPassword: String
});

const passwordModel = mongoose.model('password', passwordSchema);

async function uploadToMongoDB(credentials) {
    try {
        await passwordModel.insertMany(credentials);
        console.error('Upload to MongoDB completed.');
        
    } catch (err) {
        console.error('Error uploading to MongoDB:', err);
    } finally {
        mongoose.disconnect();
    }
    };

function passwordjs() {
    if (process.argv.length !== 5) return 'false';

    const filename = process.argv[2];
    const email = process.argv[3];
    const password = process.argv[4];

    const isAuthenticate = util.authenticate(email, password);

    if (isAuthenticate) {
        return true;
    }else {
        return false;
    }

}

if (require.main === module) {
    console.log(passwordjs()); // Print out true or false

    // Upload encrypted credentials to MongoDB
    const credentials = util.readFile(process.argv[2]);
    const encryptedCredentials = credentials.map(line => {
        const [email, password] = line.split(':');
        return { email, hashedPassword: util.hash(password) };
    });

    uploadToMongoDB(encryptedCredentials);
}

module.exports = { passwordjs };
