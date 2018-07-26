const { getConfig } = require('../index');
const objs = require('../helpers/objects.js');
const request = require('request-promise');
const endpoints = require('../helpers/endpoints');
const sorter = require('../helpers/sorter');
module.exports = async function (com, startAt=1, size=1) {

    // get our sid
    let feed = objs.communityBlogFeed;
    feed.blogs = [];
    let sid = getConfig('sid');
    
    if (typeof sid != 'string' || typeof com !== 'string' || typeof startAt !== 'number' || typeof size !== 'number') {
        throw new Error('All Arguments are not satisfied. Check if all parameters are the right type.');
    }
    
    try {
        var blogs = await request.get(endpoints.getCommunityBlogFeed(com, startAt, size), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });

        // Parse and return the blogList
        blogs = JSON.parse(blogs);
        blogs.blogList.forEach(element => {
            feed.blogs.push(sorter.blogsSorter(element));
        });
        feed.status = 'ok';
        feed.error = null;
    } catch (err) {
        // feed.error = err;
        feed.error = err;
        throw new Error(err);
    }
    return feed;
};