const request = require('request-promise'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const { getConfig } = require('../index');

/**
 * Loads all blogs from a specific user
 * @param {CommunityUUID} com A ID that can be obtained by the function getJoinedComs
 * @param {UserUUID} uuid A ID from the user
 * @param {string} count A number who will tell how many posts to fetch
 * @returns {Object} Object where all the Blogs that the User have. They are contained in an Array.
 */

module.exports = async function getUserBlogs(com, uid, count) {
    let blogList = objs.profileBlogs;
    const sid = getConfig('sid');
    if (typeof sid != 'string' || typeof com !== 'string' || typeof uid !== 'string' || typeof count !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try{
        const response = await request.get(endpoints.getUserBlogs(com, uid, count), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        //Parsing the Response.
        const body = JSON.parse(response);
        body.blogList.forEach((element) => {
            blogList.blogs.push(element);
        });
        blogList.status = 'ok';
        blogList.error = null;
    }
    catch(err){
        blogList.error = err;
        throw 'Error while calling getUserBlogs: ' + err;
    }
    return blogList;
};