if(process.env.TRAVIS_PULL_REQUEST === 'false' || typeof process.env.TRAVIS_PULL_REQUEST === 'undefined'){
    require('../helpers/loadEnv');
    describe('how the methods should response (With NO false input)', () => {
        it('should return the user\'s personal information like UID, username and icon', async () => {
            const Amino = require('../../index');
            const sid = await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
            const getMyProfile = await Amino.getMyProfile();
            expect(getMyProfile.account).toBeDefined();
            expect(getMyProfile.error).toBeNull();
            expect(getMyProfile.status).toBe('ok');
        });
    });
}else{
    describe.skip();
}