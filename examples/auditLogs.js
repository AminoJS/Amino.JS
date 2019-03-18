console.log("Get the Audit Log of a given community. You must be a moderator at the community to access this");
const env = require('./env');
const Amino = require('../index');
(async function () {
    await Amino.login(env.email, env.password);
    const audit = await Amino.auditLogs(env.testingEnvCom, 0, 10);
    console.log(JSON.stringify(audit, null, 2));
})();