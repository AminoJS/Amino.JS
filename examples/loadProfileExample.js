console.log('Example: Load your own User Data');
const env = require('./env');
// Get my Amino profile

// First, import the Amino.js library
const Amino = require('../index');

// Login with your credentials
(async function(){
    // All method will return a Promise
    const sid = await Amino.login(env.email, env.password);
    // And once you are login, you can use all of the Amino.js methods
    console.log(`SID: ${sid}`);
    const myProfile = await Amino.getMyProfile();
    console.log('Well, let me guess, your username won\'t just so happen to be ' + myProfile.account.username);
    console.log(JSON.stringify(myProfile, null, 2));
})();