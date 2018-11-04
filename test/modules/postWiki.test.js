const { config } = require('../helpers/loadEnv');
if(process.env.CI) {
    
    // CI build system
    
    if(process.env.TRAVIS_PULL_REQUEST === 'false' || typeof process.env.TRAVIS_PULL_REQUEST === 'undefined'){
        describe('how the methods should response (With NO false input)', () => {
            it('should post a Wiki Entry into a given Community', async () => {
                const Amino = require('../../index');
                const sid = await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
                const wiki = await Amino.createWikiEntry(process.env.AMINO_DEBUG_COMMUNITY, `Debug Wiki Testcase ${process.env.TRAVIS_JOB_ID}`, `The Commitname was: ${process.env.TRAVIS_COMMIT} and the Message was: ${process.env.TRAVIS_COMMIT_MESSAGE}`, require('path').join(__dirname + '/../res/a.png'));
                expect(wiki.item).toBeDefined();
                expect(wiki.status).toBe('ok');
                expect(wiki.error).toBeNull();
            });
        });
    }else{
        describe.skip();
    }
} else {
    
    // Local development
    const path = require('path');
    describe('how the methods should response (With NO false input)', () => {
        it('should post a Wiki Entry into a given Community', async () => {
            const Amino = require('../../index');
            const sid = await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
            const wiki = await Amino.createWikiEntry(process.env.AMINO_DEBUG_COMMUNITY, 'Local Development Test', `Local Development Test At ${new Date}`, path.resolve(`${__dirname}/../res/eevee.jpg`));
            // const wiki = await Amino.createWikiEntry(config.wiki.comid, config.wiki.title, config.wiki.content, config.wiki.img_path);
            expect(wiki.item).toBeDefined();
            expect(wiki.status).toBe('ok');
            expect(wiki.error).toBeNull();
        });
    });
    
}