/**
 * @module Amino.JS
 * @author RobStyling
 * @version v.2.0
 */

const config = {};

// Two function for sharing global config, like the SID key
module.exports.setConfig = (key, value) => {
    config[key] = value;   
};

module.exports.getConfig = (key) => {
    return config[key];
};

//Global Error-Messages.
const errorMessages = {
    missingSid: 'SID is not specified, please use the login() method to authenticate',
};

module.exports.errorMessages = errorMessages;

/**
 * For exporting the Functions for Usage in the Client.
 */
module.exports = {
    login: require('./modules/login'),
    getMyProfile: require('./modules/getMyProfile'),
    getJoinedComs: require('./modules/getJoinedComs'),
    getJoinedChats: require('./modules/getJoinedChats'),
    getUserBlogs: require('./modules/getUserBlogs'),
    getChat: require('./modules/getChat'),
    sendChat: require('./modules/sendChat'),
    postBlog: require('./modules/postBlog'),
    deleteBlog: require('./modules/deleteBlog'),
    getCommentsPost: require('./modules/commentsPost'),
    commentPost: require('./modules/commentPost'),
    getComBlogFeed: require('./modules/getCommunityBlogFeed'),
    createWikiEntry: require('./modules/createWikiEntry'),
    deleteWikiEntry: require('./modules/deleteWikiEntry'),
    commentWikiEntry: require('./modules/commentWikiEntry')
};