const index = require('../index');
const sorter = require('../helpers/sorter');
const endpoints = require('../helpers/endpoints');

console.log("PASS 1: " + (process.env.AMINO_EMAIL.charAt(0) == "a" ? "OK" : "FAIL"));
console.log("PASS 2: " + (process.env.AMINO_PASSWORD.charAt(0) == "g" ? "OK" : "FAIL"));
console.log("PASS 3: " + (process.env.AMINO_DEBUG_COMMUNITY.charAt(0) == "x" ? "OK" : "FAIL"));

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

});
