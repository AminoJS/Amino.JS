const request = require('request-promise'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const { getConfig } = require('../index');

/** 
 * Function to delete a blog.
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the Function getJoinedComs
 * @param {PostUUID} id The ID of the post
 */

module.exports = async function deleteBlog(com, id) {
    let message = objs.sendingMessage;
    const sid = getConfig('sid');
    let blog
    if (typeof sid != 'string' || typeof com !== 'string' || typeof id !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        const response = await request.delete(endpoints.deleteBlog(com,id), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            },
        });
    } catch (err) {
        message.error = err;
        throw 'Error while calling postBlog: ' + err;
    }
};