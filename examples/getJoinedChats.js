console.log('Get a list of user joined chat rooms');

const env = require('./env');
const Amino = require('../index');
(async function(){
    const sid = await Amino.login(env.email, env.password);
    const myCommunities = await Amino.getJoinedComs();
    const firstCommunity = myCommunities.coms[0];
    const chatRooms = await Amino.getJoinedChats(firstCommunity.id);
    if(chatRooms.threads.length <= 0){
        console.log('You haven\'t join any public or DM chat room yet, don\'t be shy now');
    }else{
        console.log('Here are all your char rooms details');
        chatRooms.threads.map(room => {

            const title = 
                        room.title === null ?
                        'Some DM chat room' :
                        room.title          ; 

            console.log(`Name: ${title}`);
            console.log(`Members: ${room.memberCount} \n etc...`);
        });
    }
    console.log('== Raw response ==');
    console.log(JSON.stringify(chatRooms, null, 2));
})();