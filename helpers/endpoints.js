let prefix = 'http://service.narvii.com/api';

module.exports = {
    login: prefix + '/v1/g/s/auth/login',
    getMe: prefix + '/v1/g/s/account',
    getComs: prefix + '/v1/g/s/community/joined?start=0&size=50',
    upload: prefix + '/v1/g/s/media/upload',
    getJoinedChats: (com) => `${prefix}/v1/${com}/s/chat/thread?type=joined-me&start=0&size=100`,
    loadChat: (com, uuid, count) => `${prefix}/v1/${com}/s/chat/thread/${uuid}/message?start=0&size=${count}&cv=v1.2`,
    sendChat: (com, uuid) => `${prefix}/v1/${com}/s/chat/thread/${uuid}/message`,
    checkIfWikiCanPost: (com, uuid) => `${prefix}/v1/${com}/s/user-profile/${uuid}/compose-eligible-check?objectType=item`,
    createWiki: (com) => `${prefix}/v1/${com}/s/item`
};