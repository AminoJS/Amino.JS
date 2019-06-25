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
    missingSid: 'SID is not specified, please use the login() method to authenticate and try again',
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
    deleteBlog: require('./modules/deleteBlog'), //TEST-CASE: OK
    getCommentsPost: require('./modules/commentsPost'), //TEST-CASE: OK
    commentPost: require('./modules/commentPost'), //TEST-CASE: OK
    getComBlogFeed: require('./modules/getCommunityBlogFeed'), //TEST-CASE: OK
    createWikiEntry: require('./modules/createWikiEntry'), //TEST-CASE: OK
    deleteWikiEntry: require('./modules/deleteWikiEntry'), //TEST-CASE: OK
    commentWikiEntry: require('./modules/commentWikiEntry'), //TEST-CASE: OK
    getComUsers: require('./modules/getComUsers'),
    sendAudio: require('./modules/sendAudio'),
    sendImage: require('./modules/sendImage'),
    sendSticker: require('./modules/sendSticker'),
    getFavoriteMembers: require('./modules/getFavoriteMembers'),
    getCheckInCommunities: require('./modules/getCheckInCommunities'),
    doCheckIn: require('./modules/doCheckIn'),
    AminoAPI: require('./framework/main'), //TEST-CASE: Not needed, wrapper to coding only
    auditLogs: require('./modules/auditLogs'),
    openFlags: require('./modules/openFlags'),
    inviteChat: require('./modules/inviteChat'),
    removeChat: require('./modules/removeChat'),
};