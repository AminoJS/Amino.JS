console.log('Gets a JSON-Object were all Blogs for the current Logged-In Account are obainted in');

const env = require('./env');
const Amino = require('../index');

const communityID = ''; // Set the community ID that you want to fetch here

(async function () {
	const sid = await Amino.login(env.email, env.password);
	// console.log(`SID: ${sid}`); // Uncomment to get Login Session ID

	const yourProfile = await Amino.getMyProfile();
	const profileUID = yourProfile.account.uid;
	console.log(`Profile: ${yourProfile.account.username} - UID: ${profileUID}`);

	/*
	Uncomment to get User Communities
	
	const yourCommunitys = await Amino.getJoinedComs();
	console.log('Your Communitites:');
     yourCommunitys.coms.map(comminity => {
         console.log(`${comminity.name} | ${comminity.link}| ${comminity.id}`);
    });
	*/

	if (communityID != '') {
		const yourBlogs = await Amino.getUserBlogs(communityID, profileUID, 10);
		console.log(`Blogs from community ID ${communityID}:`);
		if (yourBlogs.blogs != null) {
			yourBlogs.blogs.map(blog => {
				console.log(`${blog.title} | ${blog.votesCount} Likes | ${blog.commentsCount} Comments`);
			});
		} else {
			console.log('The User has no Blogs Posted yet.')
		}
	} else {
		console.log("Set communityID variable to fetch the blogs");
	}

	/*
	Uncomment to output Raw Response
	*/
	console.log('== Raw response ==');
	console.log(JSON.stringify(yourBlogs, null, 2));


})();