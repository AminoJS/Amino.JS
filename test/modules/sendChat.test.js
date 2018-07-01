if(process.env.TRAVIS_PULL_REQUEST === 'false' || typeof process.env.TRAVIS_PULL_REQUEST === 'undefined'){
    require('../helpers/loadEnv');
    describe('how the methods should response (With NO false input)', () => {
        it('should sent an Message', async () => {
            const Amino = require('../../index');
            await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
            let threads = await Amino.getJoinedChats(process.env.AMINO_DEBUG_COMMUNITY);
            let message = await Amino.sendChat(process.env.AMINO_DEBUG_COMMUNITY, threads.threads[0].threadId, 'A new Testcase');
            expect(message.message.sent).toBeTruthy();
            expect(message.status).toBe('ok');
            expect(message.error).toBeFalsy();
        });
    });
}else{
    describe.skip();
}