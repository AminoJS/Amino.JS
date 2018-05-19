if(process.env.TRAVIS_PULL_REQUEST === 'false' || typeof process.env.TRAVIS_PULL_REQUEST === 'undefined'){
    require('../helpers/loadEnv');
    describe('how the methods should response (With NO false input)', () => {
        it('Get a payload of message inside one one species chat room', async () => {
            const Amino = require('../../index');
            const sid = await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
            const myCommunities = await Amino.getJoinedComs();
            const firstCommunity = myCommunities.coms[0];
            const chatRooms = await Amino.getJoinedChats(firstCommunity.id);
            const firstChatRoom = chatRooms.threads[0];
            const lastMessage = await Amino.getChat(firstCommunity.id, firstChatRoom.threadId);

            expect(lastMessage.messages).toBeDefined();
            expect(
                Array.isArray(lastMessage.messages)
            )
            .toBe(true);
            expect(lastMessage.messages[0].msg === null || typeof lastMessage.messages[0].msg === 'string').toBe(true);
            expect(lastMessage.status).toBe('ok');
            expect(lastMessage.error).toBeNull();
        });
    });
}else{
    describe.skip();
}