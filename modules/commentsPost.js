const fetch = require('isomorphic-fetch'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const sorter = require('../helpers/sorter.js'); //For easier Sorting of various Responses.
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const {
    getConfig
} = require('../index');

/**
 * Get all the comments from a post
 * @param {CommunityUUID} com A ID that can be obtained by the function getJoinedComs
 * @param {PostUUID} com A ID that can be obtained by the function getJoinedComs
 * @param {String} sort The type of sort (newest, oldest)
 * @param {String} start Were comment number to start fetching
 * @param {String} size The size of comments to fetch
 * @returns {Object} Object where all the Chats that the Logged-in User has joined are contained in an Array.
 */

module.exports = async function commentsPost(com, id, sort, start, size) {
    let comments = objs.comments;
    let body;
    const sid = getConfig('sid');
    //Silent fallback, will default to most recent if missing.
    start = start || 1;
    size = size || 1;
    sort = sort || 'newest';
    if (typeof sid != 'string' || typeof com !== 'string' || typeof id !== 'string' || typeof start !== 'number' || typeof size !== 'number') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        const response = await fetch(endpoints.commentsPost(com, id, sort, start, size), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        //Parsing the Response.
        body = await response.json();
        body.commentList.forEach(commentsR => {
            comments.comments.push(sorter.commentSorter(commentsR));
        });
        comments.status = 'ok';
        comments.error = null;
    } catch (err) {
        comments.error = err;
        throw 'Error while calling commentsPost: ' + err;
    }
    return comments;
};