if(process.env.TRAVIS_PULL_REQUEST === 'false' || typeof process.env.TRAVIS_PULL_REQUEST === 'undefined'){
    require('../helpers/loadEnv');
    describe('how the methods should response (With NO false input)', () => {
        it('Get a list of user joined chat rooms', async () => {
            const Amino = require('../../index');
            const sid = await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
            const myCommunities = await Amino.getJoinedComs();
            const firstCommunity = myCommunities.coms[0];
            const myChatRooms = await Amino.getJoinedChats(firstCommunity.id);
            expect(myChatRooms.threads).toBeDefined();
            expect(
                Array.isArray(myChatRooms.threads)
            )
            .toBe(true);
            expect(myChatRooms.status).toBe('ok');
            expect(myChatRooms.error).toBeNull();
        });
    });
}else{
    describe.skip();
}