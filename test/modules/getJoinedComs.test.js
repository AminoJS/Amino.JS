if(process.env.TRAVIS_PULL_REQUEST === 'false' || typeof process.env.TRAVIS_PULL_REQUEST === 'undefined'){
    require('../helpers/loadEnv');
    describe('how the methods should response (With NO false input)', () => {
        it('should return the a list of communities that user has joined', async () => {
            const Amino = require('../../index');
            const sid = await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
            const myCommunitys = await Amino.getJoinedComs();
            expect(myCommunitys.coms).toBeDefined();
            expect(
                Array.isArray(myCommunitys.coms)
            )
            .toBe(true);
            expect(myCommunitys.status).toBe('ok');
            expect(myCommunitys.error).toBeNull();
        });
    });
}else{
    describe.skip();
}