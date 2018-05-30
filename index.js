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
    login: require('./modules/login'), //TEST-CASE: OK
    getMyProfile: require('./modules/getMyProfile'), //TEST-CASE: OK
    getJoinedComs: require('./modules/getJoinedComs'), //TEST-CASE: OK
    getJoinedChats: require('./modules/getJoinedChats'), //TEST-CASE: OK
    getUserBlogs: require('./modules/getUserBlogs'), //TEST-CASE: OK
    getChat: require('./modules/getChat'), //TEST-CASE: OK
    sendChat: require('./modules/sendChat'), //TEST-CASE: OK
    postBlog: require('./modules/postBlog'), //TEST-CASE: OK
    deleteBlog: require('./modules/deleteBlog'), //TEST-CASE: NO
    getCommentsPost: require('./modules/commentsPost'), //TEST-CASE: NO
    commentPost: require('./modules/commentPost'), //TEST-CASE: OK
    getComBlogFeed: require('./modules/getCommunityBlogFeed'), //TEST-CASE: NO
    createWikiEntry: require('./modules/createWikiEntry'), //TEST-CASE: OK
    deleteWikiEntry: require('./modules/deleteWikiEntry'), //TEST-CASE: NO
    commentWikiEntry: require('./modules/commentWikiEntry') //TEST-CASE: NO
};