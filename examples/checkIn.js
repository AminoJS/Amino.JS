console.log("Checkin into A Community!\n");
const env = require('./env');
const Amino = require('../index');
(async function () {
    const sid = await Amino.login(env.email, env.password);
    const yourCommunitys = await Amino.getJoinedComs();
    let community = yourCommunitys.coms[1].id;
    await Amino.checkIn(community);
})();