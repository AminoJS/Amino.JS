console.log("Remove a user from a chat");
const env = require('./env');
const Amino = require('../index');
(async function () {
    await Amino.login(env.email, env.password);
    
    const invite = await Amino.removeChat(env.testingEnvCom, env.chatTarget, env.userTarget, false);
    console.log(JSON.stringify(invite, null, 2));
})();