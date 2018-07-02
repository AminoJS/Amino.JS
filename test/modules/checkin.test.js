if(process.env.TRAVIS_PULL_REQUEST === 'false' || typeof process.env.TRAVIS_PULL_REQUEST === 'undefined'){
    require('../helpers/loadEnv');
    describe('how the methods should response (With NO false input)', () => {
        it('should check-in once a day into the Debug Community (OR Return a False Positiv)', async () => {
            const Amino = require('../../index');
            await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
            let CheckIn = await Amino.checkIn(process.env.AMINO_DEBUG_COMMUNITY);
            if(CheckIn.checkIn.message) expect(CheckIn.checkIn.message).toBe('already CheckedIn!');
            else expect(CheckIn.checkIn.status).toBeTruthy();
            expect(CheckIn.error).toBeNull();
            expect(CheckIn.status).toBeDefined();
        });
    });
}else{
    describe.skip();
}