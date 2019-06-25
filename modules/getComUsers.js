const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const { getConfig, errorMessages } = require('../index');

/**
 * Gets a JSON-Object were all Community ID's, Name's and URL's for the current Logged-In Account are obainted in. 
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @returns {Object} Object containing all Joined Coms with the Logged in Account.
 */
module.exports = async function getComUsers(communityId) {
    let communityUsers = objs.communityUsers;
    communityUsers.users = [];
    const sid = getConfig('sid');
    if (typeof sid != 'string') {
        throw new Error(errorMessages.missingSid);
    }
    const body = await fetch(endpoints.getComUsers(communityId), {
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
    communityUsers.users = body.userProfileList;
    communityUsers.count = body.userProfileCount;
    communityUsers.error = null;
    communityUsers.status = 'ok';
    return communityUsers;
};