console.log("Checkin into A Community!\n");
const env = require('./env');
const Amino = require('../index');
(async function () {
    const sid = await Amino.login(env.email, env.password);
    const yourCommunitys = await Amino.getJoinedComs();
    yourCommunitys.coms.forEach(async element => {
        let checkIn = await Amino.checkIn(element.id);
        console.log(checkIn);
    });
})();