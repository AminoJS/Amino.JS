const { getConfig } = require('../index');
const objs = require('../helpers/objects.js');
const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints');
const sorter = require('../helpers/sorter');

/**
 * Loads The Community Blogs Feed
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {Number} startAt The position where you want it to start
 * @param {Number} size The amount of blogs you want to get
 * @returns {Object} Object with all the Check In info of the communities specified from the Logged-in User has in an Array.
 */
module.exports = async function getCommunityBlogFeed(com, startAt=1, size=1) {
    // get our sid
    let feed = objs.communityBlogFeed;
    feed.blogs = [];
    let sid = getConfig('sid');
    
    if (typeof sid != 'string' || typeof com !== 'string' || typeof startAt !== 'number' || typeof size !== 'number') {
        throw new Error('All Arguments are not satisfied. Check if all parameters are the right type.');
    }
    const blogs = await fetch(endpoints.getCommunityBlogFeed(com, startAt, size), {
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
    blogs.blogList.forEach(element => {
        feed.blogs.push(sorter.blogsSorter(element));
    });
    feed.status = 'ok';
    feed.error = null;
    return feed;
};