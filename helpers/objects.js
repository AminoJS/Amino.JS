/**
 * @module Amino.JS_Objects
 * @author RobStyling
 * @version v.0.1
 * @beta
 */

/**
 * @example
 * coms[0] = {
 *     "id": "x159192087",
 *     "name": "German Roleplay Community",
 *     "url": "https://aminoapps.com/c/german-roleplay-community/"
 * }
 */
const communityList = {
    coms: [],
    status: 'not ok',
    error: 'there has been nothing done with the Object.'
};

/**
 * @example
 * threads[0] = {
 * 'threadId': '<A Random UUID>',
 * 'memberCount': 59,
 * 'title': 'Laberchat für alle',
 * 'joined': true,
 * 'public': false,
 * 'group': true,
 * 'muted': false,
 * 'unread': true,
 * 'lastMessage': {
 *   'senderId': 'A UserID',
 *   'message': 'The Last Message sent to the Channel'
 *  },
 * 'members': 'still Raw JSON from the API!'
 * }
 */
const communityBlogFeed = {
    blogs: [],
    status: 'not ok',
    error: 'nothing happened...'
};

const threadList = {
    threads: [],
    status: 'not ok',
    error: 'not everything defined'
};

const recivedMessages = {
    messages: [],
    status: 'not ok',
    error: 'nothing happend'
};

const profile = {
    account: {
        uid: 'def. with. func.',
        username: 'defaulting with function',
        mediaList: ['with Arrays. lol.'],
        icon: 'def. with func. blame rob'
    },
    status: 'not okay',
    error: 'nothing happend!'
};
const comments = {
    comments: [],
    status: 'not okay',
    error: 'nothing happend!'
};
const blog = {
    blog: {},
    status: 'not okay',
    error: 'nothing happend!'
};
const profileBlogs = {
    blogs: [],
    status: 'not ok',
    error: 'not everything defined'
};

const favoriteMembers = {
    members: [],
    status: 'not ok',
    error: 'nothing happend!'
};

const wiki = {
    item: {
        itemid: 'id',
        createdTime: 'time',
        title: 'title',
        content: 'content',
        author: {
            uid: 'id',
            username: 'nickname',
            icon: 'icon',
            role: 'role',
            level: 'level'
        },
        mediaList: 'mediaList',
        likeCount: 'likeCount',
        commentCount: 'commentCount'
    },
    status: 'not ok',
    error: 'nothing happend.'
};

const checkInData = {
    'data': {},
    'status': 'not ok',
    'error': 'nothing happening'
};

const communityUsers = {
    count: 1,
    users: [],
    status: 'not ok',
    error: 'nothing happend.'
};

module.exports = {
    blog,
    communityList,
    threadList,
    recivedMessages,
    profile,
    comments,
    profileBlogs,
    wiki,
    favoriteMembers,
    sendingMessage: {
        message: {
            sent: false,
            message: 'defaults with begining of method. if not. may god help you.',
            threadId: 'defaults with begining of method. if not. may god help you.'
        },
        status: 'not ok',
        error: 'Nothing has been done.'
    },
    communityBlogFeed,
    checkInData,
    communityUsers
};