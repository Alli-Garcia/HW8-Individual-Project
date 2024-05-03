## Requirements

Input Management:

* Import user email addresses and passwords from a file (password.txt).
* Validate the format of the input file to ensure it follows the email:password structure.

Encryption:

* Utilize a secure hashing algorithm (e.g., SHA-256) to encrypt passwords.
* Save the encrypted passwords along with email addresses in the format email:hash to a new file (password.enc.txt).

Database Integration:

* Integrate with MongoDB using Mongoose to establish a connection with the database.
* Upload the encrypted email-password pairs to the MongoDB database, ensuring secure storage.

Authentication Functionality:

* Develop an authentication function that takes an email address and password as input parameters.
* Verify if the provided email and password match any entry in the encrypted file (password.enc.txt).
* Return true if the email-password pair is valid, indicating successful authentication; return false otherwise.

Error Handling:

* Implement robust error handling to manage invalid inputs effectively.
* Return false for scenarios such as missing email or password fields, incorrect email format, or an empty password string.