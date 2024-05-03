// To unit-test the function that generates 'password.enc.txt', you should
//  make sure the unit test does the following check.
// 1. Make sure password.enc.txt does not exist before running the function.
// 2. Make sure password.enc.txt does exist after running the function.
// 3. Make sure the contents of password.enc.txt has correct contents.
// For unit tests, you don't have to have a large input in the beginning.
// Start with smallest input, and add more contents in the input
const mongoose = require('mongoose');
const { makepassword, passwordModel } = require('../src/makepassword');
const fs = require('fs');

/*
// Let's say you have a toHash() function in this module

test('Check toHash(): if the email:password is converted into email:hashPassword', () => {
    const input = ???
    const output = ???
    expect(p.toHash(input)).toBe(output);
});
*/

describe("makepassword should create file", () => {

    let hashedPasswords;

    beforeAll(async () => {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://garciaa12:H96KSSfEpwDvlWk7@ase285cluster.drz3zaw.mongodb.net/app_data?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Query MongoDB to get hashed passwords
        hashedPasswords = await passwordModel.find({}, 'email hashedPassword');
    });

    afterAll(async () => {
        // Disconnect from MongoDB after all tests are done
        await mongoose.disconnect();
    });
    
    test('Check if password.enc.txt is created with correct contents', async () => {
        const fileName = 'HW8/references/passwordjs template/tests/passwordtest.txt'
        const encFileName = 'HW8/references/passwordjs template/src/password.enc.txt'

        // 1. Make sure password.enc.txt does not exist before running the function.
        expect(fs.existsSync(encFileName)).toBe(false);
        
        await makepassword(fileName, encFileName)

        // 2. Make sure password.enc.txt does exist after running the function.
        expect(fs.existsSync(encFileName)).toBe(true);

        // 3. Make sure the contents of password.enc.txt has correct contents.
        const expectedContent = hashedPasswords.map(({email,hashedPassword}) => ({
            email,
            hashedPassword
        }));

        const fileContents = fs.readFileSync(encFileName, 'utf-8');
        const expectedJson = JSON.stringify(expectedContent, null, 2);
        const actualJson = JSON.stringify(JSON.parse(fileContents), null, 2);

        expect(actualJson).toBe(expectedJson);

        });
    })