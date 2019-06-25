let prefix = 'https://service.narvii.com/api';

module.exports = {
    login: prefix + '/v1/g/s/auth/login', //Testcase: OK
    getMe: prefix + '/v1/g/s/account', //Testcase: OK
    getComs: prefix + '/v1/g/s/community/joined?start=0&size=50', //Testcase: OK
    upload: prefix + '/v1/g/s/media/upload', //Testcase: OK
    getJoinedChats: (com) => `${prefix}/v1/${com}/s/chat/thread?type=joined-me&start=0&size=100`, //Testcase: OK
    loadChat: (com, uuid, count) => `${prefix}/v1/${com}/s/chat/thread/${uuid}/message?start=0&size=${count}&cv=v1.2`, //Testcase: OK
    postBlog: (com)=> `${prefix}/v1/${com}/s/blog`, //Testcase: OK
    deleteBlog: (com, id)=> `${prefix}/v1/${com}/s/blog/${id}`, //Testcase: OK
    commentsPost: (com, id, sort, start, size)=> `${prefix}/v1/${com}/s/blog/${id}/comment?sort=${sort}&start=${start}&size=${size}`, //Testcase: OK
    commentPost: (com, id)=> `${prefix}/v1/${com}/s/blog/${id}/comment`, //Testcase: OK
    sendChat: (com, uuid) => `${prefix}/v1/${com}/s/chat/thread/${uuid}/message`, //Testcase: OK
    getUserBlogs: (com, uuid, count) => `${prefix}/v1/${com}/s/blog?type=user&q=${uuid}&start=0&size=${count}`, //Testcase: OK
    getCommunityBlogFeed: (com, startAt, size) => `${prefix}/v1/${com}/s/feed/blog-all?start=${startAt}&size=${size}`, //Testcase: OK
    checkIfWikiCanPost: (com, uuid) => `${prefix}/v1/${com}/s/user-profile/${uuid}/compose-eligible-check?objectType=item`, //Testcase: OK
    createWiki: (com) => `${prefix}/v1/${com}/s/item`, //Testcase: OK
    deleteWiki: (com, uid) => `${prefix}/v1/${com}/s/item/${uid}`, //Testcase: OK
    commentWiki: (com, uid) => `${prefix}/v1/${com}/s/item/${uid}/comment`, //Testcase: OK
    getFavoriteMembers: (com, count) => `${prefix}/v1/${com}/s/user-group/quick-access?start=0&size=${count}`, //Testcase: OK
    getCheckInReminder: (communities, timezone) => `${prefix}/v1/g/s/reminder/check?ndcIds=${communities.replace('&', '%2C')}&timezone=${timezone}`, //Testcase: OK
    doCheckIn: (com) => `${prefix}/v1/${com}/s/check-in`, //Testcase: OK
    getComUsers: (com) => `${prefix}/v1/${com}/s/user-profile`, //Testcase: OK
    auditLogs: (com, start, size) => `${prefix}/v1/${com}/s/admin/operation?start=${start}&size=${size}`,
    openFlags: (com, start, size) => `${prefix}/v1/${com}/s/flag?status=pending&type=all&start=${start}&size=${size}`,
    inviteChat: (com, chatThread) => `${prefix}/v1/${com}/s/chat/thread/${chatThread}/member/invite`,
    removeChat: (com, chatThread, user, rejoin) => `${prefix}/v1/${com}/s/chat/thread/${chatThread}/member/${user}?allowRejoin=${rejoin}`
};
