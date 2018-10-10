console.log('Gets a JSON-Object were all Community ID\'s, Name\'s and URL\'s for the current Logged-In Account are obainted in');

const env = require('./env');
const Amino = require('../index');
(async function(){
    const sid = await Amino.login(env.email, env.password);
    console.log(`SID: ${sid}`);
    const yourCommunitys = await Amino.getJoinedComs();
    yourCommunitys.coms.map(comminity => {
        console.log(`${comminity.name} | ${comminity.link}| ${comminity.id}`);
    });
    console.log('== Raw response ==');
    console.log(JSON.stringify(yourCommunitys, null, 2));
})();