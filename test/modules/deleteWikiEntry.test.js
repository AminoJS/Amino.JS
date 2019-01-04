jest.setTimeout(7000); //Set a Timeout for 7 Seconds since the System needs to Create a Wiki Entry and then delete it again. It may take longer then 5 Seconds. This is in this scope okay.
//TODO: Maybe move the Creation and Deletion of a Wiki Entry etc. to a more general space.

if(process.env.TRAVIS_PULL_REQUEST === 'false' || typeof process.env.TRAVIS_PULL_REQUEST === 'undefined'){
    require('../helpers/loadEnv');
    describe('how the methods should response (With NO false input)', () => {
        it('should delete a Wiki Entry into a given Community', async () => {
            const Amino = require('../../index');
            const sid = await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
            const wiki = await Amino.createWikiEntry(process.env.AMINO_DEBUG_COMMUNITY, `Debug Wiki Testcase ${process.env.TRAVIS_JOB_ID}`, `The Commitname was: ${process.env.TRAVIS_COMMIT} and the Message was: ${process.env.TRAVIS_COMMIT_MESSAGE}`, require('path').join(__dirname + '/../res/a.png'));
            expect(wiki.item).toBeDefined();
            expect(wiki.status).toBe('ok');
            expect(wiki.error).toBeNull();
            const deleted = await Amino.deleteWikiEntry(process.env.AMINO_DEBUG_COMMUNITY, wiki.item.itemid);
            expect(deleted).toBeTruthy();
        });
    });
}else{
    describe.skip();
}