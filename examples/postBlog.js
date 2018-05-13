console.log("Post a blog.\n");
const env = require('./env');
const Amino = require('../index');
(async function(){
    const sid = await Amino.login(env.email, env.password);
    const yourCommunitys = await Amino.getJoinedComs();
        let community=yourCommunitys.coms[0].id;
        console.log(yourCommunitys.coms[0]);
        let test = await Amino.postBlog(community, "Test", "This is a test")
        console.log(test)
})();