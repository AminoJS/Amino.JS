console.log("Fetch comments of a post.\n");
const env = require('./env');
const Amino = require('../index');
(async function(){
    const sid = await Amino.login(env.email, env.password);
    const yourCommunitys = await Amino.getJoinedComs();
        let community=yourCommunitys.coms[0].id;
        let recentBlog = await Amino.getComBlogFeed(community, 0, 5);
        console.log(recentBlog);
        recentBlog = recentBlog.blogs[0].blogId;
        console.log(await Amino.getCommentsPost(community, recentBlog));
})();