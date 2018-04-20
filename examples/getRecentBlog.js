console.log("Get information about the most recent blog published\n");
const env = require('./env.default');
const Amino = require('../index');
(async function(){
    const sid = await Amino.login(env.email, env.password);
    const yourCommunitys = await Amino.getJoinedComs();
        let community=yourCommunitys.coms[0].id;
        let recentBlog = await Amino.getComBlogFeed(community, 1, 1);
        recentBlog = recentBlog[0];
        console.log(`Title: ${recentBlog.title}\nAuthor name: ${recentBlog.author.nickname}\nContent:\n ${recentBlog.content}`);
    
        
})();