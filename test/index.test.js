const index = require('../index');
const sorter = require('../helpers/sorter');
const endpoints = require('../helpers/endpoints');

// If my logic isn't wrong, i must be able to call the setTimeout function here, and no pig can fly yet
// This is wrong. Travis actually still fails since it's only for this
// jest.setTimeout(7000);

// Making sure that no one will accidentally missed the endpoints
describe('how do the enpoints react..', () => {

    it('when a login api call is recived', () => {
        expect(endpoints.login).toBe('https://service.narvii.com/api/v1/g/s/auth/login')
    });

    it('when a Call for loading the user has arrvied', () => {
        expect(endpoints.getMe).toBe('https://service.narvii.com/api/v1/g/s/account');
    });

    it('when a community load api call is recived', () => {
        expect(endpoints.getComs).toBe('https://service.narvii.com/api/v1/g/s/community/joined?start=0&size=50');
    });

    it('when a upload api call is recived', () => {
        expect(endpoints.upload).toBe('https://service.narvii.com/api/v1/g/s/media/upload');
    })

    it('when a chat thread load api call is recived', () => {
        expect(
            endpoints.getJoinedChats('xtesting')
        )
        .toBe('https://service.narvii.com/api/v1/xtesting/s/chat/thread?type=joined-me&start=0&size=100');
    });
	
	it('when a user blog thread load api call is recived', () => {
        expect(
            endpoints.getUserBlogs('xtesting', 'utesting', '100')
        )
        .toBe('https://service.narvii.com/api/v1/xtesting/s/blog?type=user&q=utesting&start=0&size=100');
    });

    it('when a chat api call is recived', () => {
        expect(
            endpoints.loadChat('xtesting', 'a_great_uuid', 7)
        )
        .toBe('https://service.narvii.com/api/v1/xtesting/s/chat/thread/a_great_uuid/message?start=0&size=7&cv=v1.2');
    });

    it('when a sending a chat message api call is recived', () => {
        expect(
            endpoints.sendChat('xtesting', 'a_great_uuid')
        )
        .toBe('https://service.narvii.com/api/v1/xtesting/s/chat/thread/a_great_uuid/message');
    });

    it('when a blog should be posted (endpoint)', () => {
        expect(endpoints.postBlog('xtesting')).toBe('https://service.narvii.com/api/v1/xtesting/s/blog');
    });

    it('when a blog should be deleted (endpoint)', () => {
        expect(endpoints.deleteBlog('xtesting', 'a_great_uuid')).toBe('https://service.narvii.com/api/v1/xtesting/s/blog/a_great_uuid');
    });

    it('when comments need to be loaded (endpoint)', () => {
        expect(endpoints.commentsPost('xtesting', 'a_great_uuid', 'newest', 5, 10)).toBe('https://service.narvii.com/api/v1/xtesting/s/blog/a_great_uuid/comment?sort=newest&start=5&size=10');
    });

    it('when something needs to be comment (endpoint)', () => {
        expect(endpoints.commentPost('xtesting', 'a_great_uuid')).toBe('https://service.narvii.com/api/v1/xtesting/s/blog/a_great_uuid/comment');
    });

    it('when you want to get the blog feed (enpoint)', () => {
        expect(endpoints.getCommunityBlogFeed('xtesting', 5, 10)).toBe('https://service.narvii.com/api/v1/xtesting/s/feed/blog-all?start=5&size=10');
    });

    it('when you want to check if you can post a wiki entry. (endpoint)', () => {
        expect(endpoints.checkIfWikiCanPost('xtesting', 'a_great_uuid')).toBe('https://service.narvii.com/api/v1/xtesting/s/user-profile/a_great_uuid/compose-eligible-check?objectType=item');
    });
    
    it('when you want to create a wiki entry. (endpoint)', () => {
        expect(endpoints.createWiki('xtesting')).toBe('https://service.narvii.com/api/v1/xtesting/s/item');
    });

    it('when you want to delete a wiki entry. (endpoint)', () => {
        expect(endpoints.deleteWiki('xtesting', 'a_great_uuid')).toBe('https://service.narvii.com/api/v1/xtesting/s/item/a_great_uuid');
    });

    it('when you want to comment on a wiki entry. (endpoint)', () => {
        expect(endpoints.commentWiki('xtesting', 'a_great_uuid')).toBe('https://service.narvii.com/api/v1/xtesting/s/item/a_great_uuid/comment');
    });

    it('when you want to load your favorite members. (endpoint)', () => {
        expect(endpoints.getFavoriteMembers('xtesting', 30)).toBe('https://service.narvii.com/api/v1/xtesting/s/user-group/quick-access?start=0&size=30');
    });

    it('when its time to check into communities. (endpoint)', () => {
        expect(endpoints.getCheckInReminder('xtesting&xtesting2', 'UTC')).toBe('https://service.narvii.com/api/v1/g/s/reminder/check?ndcIds=xtesting%2Cxtesting2&timezone=UTC');
    });

    it('when we are checking in. (endpoint).', () => {
        expect(endpoints.doCheckIn('xtesting')).toBe('https://service.narvii.com/api/v1/xtesting/s/check-in');
    })

    it('when we want to load the community users. (endpoint)', () => {
        expect(endpoints.getComUsers('xtesting')).toBe('https://service.narvii.com/api/v1/xtesting/s/user-profile');
    })
});
