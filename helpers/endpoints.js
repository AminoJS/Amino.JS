let prefix = 'https://service.narvii.com/api';

module.exports = {
    login: prefix + '/v1/g/s/auth/login',
    getMe: prefix + '/v1/g/s/account',
    getComs: prefix + '/v1/g/s/community/joined?start=0&size=50',
    upload: prefix + '/v1/g/s/media/upload',
    getJoinedChats: (com) => `${prefix}/v1/${com}/s/chat/thread?type=joined-me&start=0&size=100`,
    loadChat: (com, uuid, count) => `${prefix}/v1/${com}/s/chat/thread/${uuid}/message?start=0&size=${count}&cv=v1.2`,
    postBlog: (com)=> `${prefix}/v1/${com}/s/blog/`,
    deleteBlog: (com, id)=> `${prefix}/v1/${com}/s/blog/${id}`,
    commentsPost: (com, id, sort, start, size)=> `${prefix}/v1/${com}/s/blog/${id}/comment?sort=${sort}&start=${start}&size=${size}`,
    commentPost: (com, id)=> `${prefix}/v1/${com}/s/blog/${id}/comment`,
    sendChat: (com, uuid) => `${prefix}/v1/${com}/s/chat/thread/${uuid}/message`,
    getUserBlogs: (com, uuid, count) => `${prefix}/v1/${com}/s/blog?type=user&q=${uuid}&start=0&size=${count}`,
    getCommunityBlogFeed: (com, startAt, size) => `${prefix}/v1/${com}/s/feed/blog-all?start=${startAt}&size=${size}`,
    checkIfWikiCanPost: (com, uuid) => `${prefix}/v1/${com}/s/user-profile/${uuid}/compose-eligible-check?objectType=item`,
    createWiki: (com) => `${prefix}/v1/${com}/s/item`,
    deleteWiki: (com, uid) => `${prefix}/v1/${com}/s/item/${uid}`,
    commentWiki: (com, uid) => `${prefix}/v1/${com}/s/item/${uid}/comment`,
    getFavoriteMembers: (com, count) => `${prefix}/v1/${com}/s/user-group/quick-access?start=0&size=${count}`,
    getCheckInReminder: (communities, timezone) => `${prefix}/v1/g/s/reminder/check?ndcIds=${communities.replace("&", "%2C")}&timezone=${timezone}`,
    doCheckIn: (com) => `${prefix}/v1/${com}/s/check-in`
};