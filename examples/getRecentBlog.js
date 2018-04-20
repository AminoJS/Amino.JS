console.log("Get information about the 5 most recent blogs published\n");
const env = require('./env');
const Amino = require('../index');
(async function(){
    const sid = await Amino.login(env.email, env.password);
    const yourCommunitys = await Amino.getJoinedComs();
        let community=yourCommunitys.coms[2].id;
        let recentBlog = await Amino.getComBlogFeed(community, 0, 5);
        console.log(recentBlog);
        recentBlog = recentBlog.blogs[0];
        console.log(`Title: ${recentBlog.title}\nAuthor name: ${recentBlog.author.nickname}\nContent:\n ${recentBlog.content}`);
})();