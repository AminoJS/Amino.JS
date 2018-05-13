const fetch = require('isomorphic-fetch'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const { getConfig } = require('../index');

/** 
 * Function to delete a blog.
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the Function getJoinedComs
 * @param {PostUUID} id The ID of the post
 */

module.exports = async function deleteBlog(com, id) {
    const sid = getConfig('sid');
    if (typeof sid != 'string' || typeof com !== 'string' || typeof id !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        await fetch(endpoints.deleteBlog(com,id), {
            method: 'DELETE',
            headers: {
                'NDCAUTH': `sid=${sid}`
            },
        });
        return true;
    } catch (err) {
        throw 'Error while calling postBlog: ' + err;
    }
};