console.log("Get a payload of message inside one one species chat room");
const env = require('./env');
const Amino = require('../index');
(async function () {
    const sid = await Amino.login(env.email, env.password);
    const myCommunities = await Amino.getJoinedComs();
    const firstCommunity = myCommunities.coms[0];
    const users = await Amino.getComUsers(firstCommunity.id);
    console.log(users)
})();