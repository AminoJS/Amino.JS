const index = require('../index');
const sorter = require('../helpers/sorter');
const {
    login,
    getMe,
    getComs,
    getJoinedChats,
    loadChat,
    sendChat,
} = require('../helpers/endpoints');

// Making sure that no one will accidentally missed the endpoints
describe('how do the enpoints react..', () => {

    it('when a login api call is recived', () => {
        expect(login).toBe('http://service.narvii.com/api/v1/g/s/auth/login')
    });

    it('when a Call for loading the user has arrvied', () => {
        expect(getMe).toBe('http://service.narvii.com/api/v1/g/s/account');
    });

    it('when a community load api call is recived', () => {
        expect(getComs).toBe('http://service.narvii.com/api/v1/g/s/community/joined?start=0&size=50');
    });

    it('when a chat thread load api call is recived', () => {
        expect(
            getJoinedChats('xtesting')
        )
        .toBe('http://service.narvii.com/api/v1/xtesting/s/chat/thread?type=joined-me&start=0&size=100');
    });

    it('when a chat api call is recived', () => {
        expect(
            loadChat('xtesting', 'a_great_uuid', 7)
        )
        .toBe('http://service.narvii.com/api/v1/xtesting/s/chat/thread/a_great_uuid/message?start=0&size=7&cv=v1.2');
    });

    it('when a sending a chat message api call is recived', () => {
        expect(
            sendChat('xtesting', 'a_great_uuid')
        )
        .toBe('http://service.narvii.com/api/v1/xtesting/s/chat/thread/a_great_uuid/message');
    });

});