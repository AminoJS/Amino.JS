if(process.env.TRAVIS_PULL_REQUEST === 'false' || typeof process.env.TRAVIS_PULL_REQUEST === 'undefined'){
    require('../helpers/loadEnv');
    describe('how the methods should response (With NO false input)', () => {
        it('Get a list of user posted blog posts', async () => {
            const Amino = require('../../index');
            const sid = await Amino.login(process.env.AMINO_EMAIL, process.env.AMINO_PASSWORD);
            const myCommunities = await Amino.getJoinedComs();
            const firstCommunity = myCommunities.coms[0];
            const myProfile = await Amino.getMyProfile();
            let myBlogs = await Amino.getUserBlogs(firstCommunity.id, myProfile.account.uid);
            expect(myBlogs.blogs).toBeDefined();
            if(!myBlogs.blogs) {

                expect(
                    myBlogs.blogs === null
                )
                .toBe(true)

            } else {

                expect(
                    Array.isArray(myBlogs.blogs)
                )
                .toBe(true);
                
            }
            expect(myBlogs.error).toBeNull();
            expect(myBlogs.status).toBe('ok');
        });
    });
}else{
    describe.skip();
}