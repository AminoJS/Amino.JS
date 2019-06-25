if(process.env.TRAVIS_PULL_REQUEST === 'false' || typeof process.env.TRAVIS_PULL_REQUEST === 'undefined'){
    require('../helpers/loadEnv');
    describe('how the methods should response (With NO false input)', () => {
        it('Get the latest blog feed of one specie community', async () => {
            const Amino = require('../../index');
            const sid = await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
            const myCommunities = await Amino.getJoinedComs();
            const firstCommunity = myCommunities.coms[0];
            const myCommunityBlogFeed = await Amino.getComBlogFeed(firstCommunity.id);
            expect(myCommunityBlogFeed.blogs).toBeDefined();
            expect(
                Array.isArray(myCommunityBlogFeed.blogs)
            )
            .toBe(true);
            expect(myCommunityBlogFeed.status).toBe('ok');
            expect(myCommunityBlogFeed.error).toBeNull();
        });
    });
}else{
    describe.skip();
}