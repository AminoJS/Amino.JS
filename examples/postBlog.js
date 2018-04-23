console.log("Post a blog.\n");
const env = require('./env.default');
const Amino = require('../index');
(async function(){
    const sid = await Amino.login(env.email, env.password);
    const yourCommunitys = await Amino.getJoinedComs();
        let community=yourCommunitys.coms[0].id;
        let test = await Amino.postBlog(community, "Test", "This is a test")
        console.log(test)
})();