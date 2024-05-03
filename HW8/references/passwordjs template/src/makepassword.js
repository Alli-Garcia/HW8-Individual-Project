'use strict'
const fs = require('fs');
const crypto = require('crypto');
const {readFile, writeFile, hash, authenticate} = require('./utility');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://garciaa12:H96KSSfEpwDvlWk7@ase285cluster.drz3zaw.mongodb.net/app_data?retryWrites=true&w=majority');
  
  // Get the default connection
  const db = mongoose.connection;
  
  // Event handlers for Mongoose connection
  db.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
  db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });
  
  // Close MongoDB connection when Node.js process exits
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

function writeFileAsync(fileName, data) {
  return new Promise((resolve, reject) => {
      fs.writeFile(fileName, data, 'utf8', (err) => {
          if (err) {
              reject(err);
          } else {
              resolve();
          }
      });
  });
}


const passwordModel = mongoose.model('password', passwordSchema);

async function makepassword(passwordFileName, passwordEncFileName) {
  try {
      // Read file asynchronously using `fs.promises.readFile`
      const data = await fs.promises.readFile(passwordFileName, 'utf8');
      
      // Split data into lines, filter empty lines, and transform into credentials array
      const credentials = data.split('\n').filter(line => line.trim() !== '');
      const encryptedCredentials = credentials.map(line => {
          const [email, password] = line.split(':');
          if (!email || !password) {
              throw new Error(`Invalid line format: ${line}`);
          }
          const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
          return { email, hashedPassword };
      });

      // Write encrypted credentials to passwordEncFileName
      await writeFileAsync(passwordEncFileName, JSON.stringify(encryptedCredentials, null, 2));
      console.log(`Encrypted credentials have been saved to ${passwordEncFileName}`);

      // Upload encrypted credentials to MongoDB
      await uploadToMongoDB(encryptedCredentials);
      console.log('Encrypted credentials uploaded to MongoDB');
  } catch (err) {
      console.error(`Error processing files: ${err}`);
  }
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
    makepassword('C:\\Users\\allig\\OneDrive\\Desktop\\NKU\\ASE285\\HW8 (1)\\HW8\\references\\passwordjs template\\password.txt', './HW8/references/passwordjs template/src/password.enc.txt')
}

module.exports = {makepassword, passwordModel};