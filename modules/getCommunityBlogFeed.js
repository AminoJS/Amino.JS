const { getConfig } = require('../index');
const objs = require('../helpers/objects.js');
const request = require('request-promise');
const endpoints = require('../helpers/endpoints')
module.exports = async function (com, startAt, size) {

    // get our sid
    let feed = objs.communityBlogFeed;
    let sid = getConfig('sid');
    //Silent fallback, will default to most recent if missing.
    startAt = startAt || 1;
    size = size || 1;

    if (typeof sid != 'string' || typeof com !== 'string' || typeof startAt !== 'number' || typeof size !== 'number') {
        throw new Error('All Arguments are not satisfied. Check if all parameters are the right type.');
    }
    
    try {
        var blogs = await request.get(endpoints.getCommunityBlogFeed(com, startAt, size), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        })

        // just log for now
        console.log(blogs)
    } catch (err) {
        // feed.error = err;
        throw new Error(err)
    }
}