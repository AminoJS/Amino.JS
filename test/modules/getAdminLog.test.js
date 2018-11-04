if(process.env.TRAVIS_PULL_REQUEST === 'false' || typeof process.env.TRAVIS_PULL_REQUEST === 'undefined'){
    require('../helpers/loadEnv');
    describe('how the methods should response (With NO false input)', () => {
        it('Get a list of logs from one of the community', async () => {
            const Amino = require('../../index');
            await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
            const myCommunities = await Amino.getJoinedComs();
            const firstCommunity = myCommunities.coms[0];
            const logs = await Amino.getAdminLogs(firstCommunity.id);
            expect(logs.logs).toBeDefined();
            if(!logs.logs){
                expect(
                    logs.blogs === null
                )
                .toBe(true)
            } else {
                expect(
                    Array.isArray(logs.logs)
                )
                .toBe(true);
            }
            expect(logs.status).toBe('ok');
            expect(logs.error).toBeNull();
        });
    });
}else{
    describe.skip();
}