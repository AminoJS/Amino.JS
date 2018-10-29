if(process.env.TRAVIS_PULL_REQUEST === 'false' || typeof process.env.TRAVIS_PULL_REQUEST === 'undefined'){
    require('../helpers/loadEnv');
    describe('how the methods should response (With NO false input)', () => {
        it('Get a list of users with in a specify community', async () => {
            const Amino = require('../../index');
            const sid = await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
            const myCommunities = await Amino.getJoinedComs();
            const firstCommunity = myCommunities.coms[0];
            const users = await Amino.getComUsers(firstCommunity.id);
            
            expect(
                typeof users.count === 'number'
            ).toBe(true)

            expect(
                Array.isArray(users.users)
            )
            .toBe(true);

            expect(users.status).toBe('ok');

            expect(users.error).toBeNull();
            
        });
    });
}else{
    describe.skip();
}
