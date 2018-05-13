if(process.env.TRAVIS_PULL_REQUEST === 'false' || typeof process.env.TRAVIS_PULL_REQUEST === 'undefined'){
    require('../helpers/loadEnv');
    describe('how the methods should response (With NO false input)', () => {
        it('should post a Blog into a given Community', async () => {
            const Amino = require('../../index');
            const sid = await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
            const blog = await Amino.postBlog(process.env.AMINO_DEBUG_COMMUNITY, `Debug Testcase ${process.env.TRAVIS_JOB_ID}`, `The Commitname was: ${process.env.TRAVIS_COMMIT} and the Message was: ${process.env.TRAVIS_COMMIT_MESSAGE}`);
            expect(blog.blog).toBeDefined();
            expect(blog.status).toBe('ok');
            expect(blog.error).toBeNull();
        });
    });
}else{
    describe.skip();
}