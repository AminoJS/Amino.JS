console.log("Comment a post.\n");
const env = require('./env.default');
const Amino = require('../index');
(async function(){
    const sid = await Amino.login(env.email, env.password);
    const yourCommunitys = await Amino.getJoinedComs();
        let community=yourCommunitys.coms[0].id;
        console.log(await Amino.commentPost(community, "048dd9b6-dd01-49c4-a536-808fd00d3d76", "This actually works."))
        
})();