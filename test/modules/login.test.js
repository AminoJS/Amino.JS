if(process.env.TRAVIS_PULL_REQUEST === 'false' || typeof process.env.TRAVIS_PULL_REQUEST === 'undefined'){
    require('../helpers/loadEnv');
    describe('how the methods should response (With NO false input)', () => {
        it('should generate a unique SID and store it inside the globalObject helper function', async () => {
            const Amino = require('../../index');
            const sid = await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
            expect(sid).toBeDefined();
            expect(typeof sid).toBe('string');
        });
    });
}else{
    describe.skip();
}