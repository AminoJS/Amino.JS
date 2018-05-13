const request = require('request-promise'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const sorter = require('../helpers/sorter.js'); //For easier Sorting of various Responses.
const { getConfig } = require('../index');

/** 
 * Function to post a blog.
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the Function getJoinedComs
 * @param {String} title The title of the post
 * @param {String} content The content of the post
 * @returns {Object} The raw JSON parsed from Amino API
 */

module.exports = async function postBlog(com, title, content) {
    const sid = getConfig('sid');
    let blog = objs.blog;
    if (typeof sid != 'string' || typeof com !== 'string' || typeof title !== 'string' || typeof content !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        const response = await request.post(endpoints.postBlog(com), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            },
            json: {
                'content': content,
                'latitude': 0,
                'longitude': 0,
                'title':title,
                'clientRefId': 43196704,
                'eventSource':'GlobalComposeMenu',
                'timestamp': new Date().getUTCMilliseconds()
            }
        });
        if (response.blog.blogId) {
            blog.status = 'ok';
            blog.error = null;
            blog.blog = sorter.blogsSorter(response.blog);
        }
    } catch (err) {
        blog.error = err;
        throw 'Error while calling postBlog: ' + err;
    }
    return blog;
};