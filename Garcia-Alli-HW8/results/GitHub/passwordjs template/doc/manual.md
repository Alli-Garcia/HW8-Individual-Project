## Manual: Using makepassword.js and password.js

Prerequisites:

* Node.js and npm: Make sure Node.js and npm are installed on your system. You can download them from nodejs.org.
* MongoDB Atlas Account: You need a MongoDB Atlas account to store encrypted credentials. Sign up at MongoDB Atlas.
* Access Credentials: You'll need the MongoDB connection URI with credentials to connect to your MongoDB Atlas cluster.
  
Setup:

* Clone Repository:
Clone or download the repository containing the provided code files (makepassword.js, passwordjs.js, and utility.js).
* Open a terminal in the project directory and run the following command to install dependencies
  * npm install mongoose crypto
* Configure MongoDB Connection:
Replace the MongoDB connection URI in both makepassword.js and passwordjs.js with your MongoDB Atlas connection URI.

Usage:
* Encrypt and Upload Passwords
  * File: makepassword.js
  * Purpose: Reads passwords from a    text file, encrypts them, saves the encrypted data to a file, and uploads it to MongoDB.
* Ensure you have a password.txt file with email-password pairs in the format email:password.
  * run node makepassword.js in the project directory
* Encrypted credentials will be saved to password.enc.txt and uploaded to MongoDB.

Authenticate and Upload Credentials:

* File: passwordjs.js
* Purpose: Authenticates users based on credentials and uploads encrypted credentials to MongoDB.
* Run the script with command-line arguments:
  * node passwordjs.js path/to/password.txt email password
* The script will authenticate the user and upload encrypted credentials to MongoDB.

Notes:

* Ensure to keep your MongoDB URI and access credentials secure. Avoid sharing sensitive information in the codebase or public repositories.
* The scripts log messages to the console for actions such as successful MongoDB connection, upload completion, or errors.
* Both scripts handle errors such as invalid input formats or MongoDB connection errors.
 