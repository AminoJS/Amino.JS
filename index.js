/**
 * @module Amino.JS
 * @author RobStyling
 * @version v.0.1
 * @beta
 */

/** 
 * TODO:
 * Get Userinfos from other Users (comming in v.0.2)
 * Comment on a User Profile (comming in v.0.2)
 * Create a Blog Post (comming in v.0.2)
 * Comment a Wiki Entry / Blog Post (comming in v.0.2)
 * Delete a Blog Post (comming in v.0.2)
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
    commentsPost: require('./modules/commentsPost'),
    commentPost: require('./modules/commentPost'),
    getComBlogFeed: require('./modules/getCommunityBlogFeed'),
    createWikiEntry: require('./modules/createWikiEntry'),
    deleteWikiEntry: require('./modules/deleteWikiEntry'),
    commentWikiEntry: require('./modules/commentWikiEntry')
};