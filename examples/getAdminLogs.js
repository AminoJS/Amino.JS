// console.log('Gets a JSON-Object were all Community ID\'s, Name\'s and URL\'s for the current Logged-In Account are obainted in');

const env = require('./env');
const Amino = require('../index');
(async function(){
    const sid = await Amino.login(env.email, env.password);
    console.log(`SID: ${sid}`);
    const _community = await Amino.getJoinedComs();
    const firstCommunity = _community.coms[0].id;
    const logs = await Amino.getAdminLogs(firstCommunity);
    console.log('== Raw response ==');
    console.log(JSON.stringify(logs, null, 2));
})();