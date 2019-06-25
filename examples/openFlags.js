console.log("Get all open flags on the community. You must be a moderator at the community to access this");
const env = require('./env');
const Amino = require('../index');
(async function () {
    await Amino.login(env.email, env.password);
    const flags = await Amino.openFlags(env.testingEnvCom, 0, 10);
    console.log(JSON.stringify(flags, null, 2));
})();