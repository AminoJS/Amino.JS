console.log("Invite a user to a chat. The user must need follow the account to be invited");
const env = require('./env');
const Amino = require('../index');
(async function () {
    await Amino.login(env.email, env.password);

    var toInvite = [
        env.userTarget
    ];
    
    const invite = await Amino.inviteChat(env.testingEnvCom, env.chatTarget, toInvite);
    console.log(JSON.stringify(invite, null, 2));
})();