const fetch = require('isomorphic-fetch'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const { getConfig } = require('../index');
const sorter = require('../helpers/sorter');

/** 
 * Function to post a blog.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the Function getJoinedComs
 * @param {PostUUID} id The ID of the post
 * @param {String} content The content of the comment.
 * @returns {Object} The raw JSON parsed from Amino API
 */

module.exports = async function commentPost(com, id, content) {
    const sid = getConfig('sid');
    let comment;
    if (typeof sid != 'string' || typeof com !== 'string' || typeof id !== 'string' || typeof content !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        let response = await fetch(endpoints.commentPost(com, id), {
            method: 'POST',
            headers: {
                'NDCAUTH': `sid=${sid}`
            },
            body: JSON.stringify({
                'content': content,
                'mediaList': [],
                'eventSource':'PostDetailView',
                'timestamp': new Date().getUTCMilliseconds()
            })
        });
        response = response.json();
        if (response.comment) {
            comment = sorter.commentSorter(response.comment);
        }
    } catch (err) {
        throw 'Error while calling commentPost: ' + err;
    }
    return comment;
};