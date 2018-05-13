console.log("Post and delete a blog.\n");
const env = require('./env');
const Amino = require('../index');
(async function(){
    const sid = await Amino.login(env.email, env.password);
    const yourCommunitys = await Amino.getJoinedComs();
        let community=yourCommunitys.coms[0].id;
        let test = await Amino.postBlog(community, "Test", "This blog will be deleted")
        await Amino.deleteBlog(community, test.blogId);    
})();