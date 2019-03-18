//Libary Imports
const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const { errorMessages, getConfig } = require('../index');

/**
 * Load your own User Data.
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @returns {Profile} A Profile containing the Userdata.
 */

module.exports = async function getMyProfile() {
    let profile = objs.profile;
    const sid = getConfig('sid');
    if (typeof sid != 'string') {
        throw new Error(errorMessages.missingSid);
    }
    const body = await fetch(endpoints.getMe, {
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
    profile.account.username = body.account.nickname;
    profile.account.icon = body.account.icon;
    profile.account.mediaList = body.account.mediaList;
    profile.account.uid = body.account.uid;
    profile.status = 'ok';
    profile.error = null;
    return profile;
};