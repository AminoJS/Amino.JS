if(process.env.TRAVIS_PULL_REQUEST === 'false' || typeof process.env.TRAVIS_PULL_REQUEST === 'undefined'){
    require('../helpers/loadEnv');
    describe('how the methods should response (With NO false input)', () => {
        it('Get the latest blog feed of one specie community', async () => {
            const Amino = require('../../index');
            const sid = await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
            const myCommunities = await Amino.getJoinedComs();
            const firstCommunity = myCommunities.coms[0];
            const myCommunityBlogFeed = await Amino.getComBlogFeed(firstCommunity.id);
            const comments = await Amino.getCommentsPost(firstCommunity.id, myCommunityBlogFeed.blogs[0].blogId);
            expect(comments.comments).toBeDefined();
            expect(
                Array.isArray(comments.comments)
            )
            .toBe(true);
            expect(comments.status).toBe('ok');
            expect(comments.error).toBeNull();
        });
    });
}else{
    describe.skip();
}