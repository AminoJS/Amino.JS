let should = require('chai').should(),
    index = require('../index.js');
sorter = require('../sorter.js');
end = require('../endpoints.js');
loginEnd = end.login;
meEnd = end.getMe;
getChatCall = end.loadChat;
communityCall = end.getComs;
getJoinedChats = end.getJoinedChats;

/*
Wow. Now Testcases got even more Useless.
describe('how does the sorter react... ', function() {

});
*/

describe('how do the enpoints react..', () => {
    it('when a login api call is recived', () => {
        loginEnd.should.equal('http://service.narvii.com/api/v1/g/s/auth/login');
    })

    it('when a Call for loading the user has arrvied', () => {
        meEnd.should.equal('http://service.narvii.com/api/v1/g/s/account');
    })

    it('when a community load api call is recived', () => {
        communityCall.should.equal('http://service.narvii.com/api/v1/g/s/community/joined?start=0&size=50');
    })

    it('when a chat thread load api call is recived', () => {
        getJoinedChats('xtesting').should.equal('http://service.narvii.com/api/v1/xtesting/s/chat/thread?type=joined-me&start=0&size=100');
    });

    it('when a chat api call is recived', () => {
        getChatCall('xtesting', 'a_great_uuid', 7).should.equal('http://service.narvii.com/api/v1/xtesting/s/chat/thread/a_great_uuid/message?start=0&size=7&cv=v1.2');
    });
})
/*
Not Suitable Testcases. Maybe should be added later.

Do we actually need test Cases? Well. Good to have them at least.

describe('how do the api react...', function() {

})
*/