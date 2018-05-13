const fs = require('fs');
const path = require('path');
// Load the env.js file if is under development and env.js exists DUH
if(fs.existsSync(path.join(`${__dirname}/../../examples/env.js`)) && process.env.NODE_ENV !== 'production'){
    const config = require('../../examples/env.js');
    process.env.AMINO_EMAIL = config.email;
    process.env.AMINO_PASSWORD = config.password;
    process.env.AMINO_DEBUG_COMMUNITY = config.testingEnvCom;
}