console.log("Get a payload of message inside one one species chat room");
const env = require('./env');
const Amino = require('../index');
(async function () {
    const sid = await Amino.login(env.email, env.password);
    const myCommunities = await Amino.getJoinedComs();
    const firstCommunity = myCommunities.coms[0];
    const chatRooms = await Amino.getJoinedChats(firstCommunity.id);
    const firstChatRoom = chatRooms.threads[0];
    const lastMessage = await Amino.getChat(firstCommunity.id, firstChatRoom.threadId);
    if(lastMessage.messages[0].msg === null){
        console.log('The last message was a system message, something like notify a new user has joined this chat room or something');
    }else{
        console.log(`The last message of this char room was:
${lastMessage.messages[0].msg}`);
    }
    console.log(`== Raw JSON response ===`);
    console.log(JSON.stringify(lastMessage, null, 2));
})();