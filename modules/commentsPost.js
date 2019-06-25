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
    comments.comments = [];
    const sid = getConfig('sid');
    //Silent fallback, will default to most recent if missing.
    start = start || 1;
    size = size || 1;
    sort = sort || 'newest';
    if (typeof sid != 'string' || typeof com !== 'string' || typeof id !== 'string' || typeof start !== 'number' || typeof size !== 'number') {
        throw new Error('All Arguments are not satisfied.');
    }
    const body = await fetch(endpoints.commentsPost(com, id, sort, start, size), {
        headers: {
            'NDCAUTH': `sid=${sid}`
        }
    }).then(function(response) {
        if(response.status >= 400) {
            throw new Error(`Amino appears to be offline. Response status = ${response.status}`);
        } else {
            return response.json();
        }
    }).catch(function(ex) {
        throw new Error(`An error ocurred: ${ex}`);
    });
    body.commentList.forEach(commentsR => {
        comments.comments.push(sorter.commentSorter(commentsR));
    });
    comments.status = 'ok';
    comments.error = null;
    return comments;
};