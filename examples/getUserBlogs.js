console.log('Get a list of user posted blog posts');

const env = require('./env');
const Amino = require('../index');
(async function(){
    const sid = await Amino.login(env.email, env.password);
    const myCommunities = await Amino.getJoinedComs();
    const firstCommunity = myCommunities.coms[0];
    const myProfile = await Amino.getMyProfile();
    const myBlogs = await Amino.getUserBlogs(firstCommunity.id, myProfile.account.uid);
    if(myBlogs.blogs.length <= 0){
        console.log('You haven\'t posted anything in yet');
    }else{
        console.log('Here are your blog posts');
        myBlogs.blogs.map(blog => {
            console.log(`Title: ${blog.title}\nContent: ${blog.content}\nect...`);
        });
        console.log('== Raw JSON response==');
        console.log(JSON.stringify(myBlogs, null, 2));
    }
})();