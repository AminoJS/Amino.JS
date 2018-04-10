//Libary Imports
const request = require('request-promise'); //The Request Module for sending the different Modules
const endpoints = require('../endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../objects.js'); //For Storing the Objects that the Framework returns. 
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
    try {
        const response = await request.get(endpoints.getMe, {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        const body = JSON.parse(response);
        profile.account.username = body.account.nickname;
        profile.account.icon = body.account.icon;
        profile.account.mediaList = body.account.mediaList;
        profile.account.uid = body.account.uid;
        profile.status = 'ok';
        profile.error = null;
    } catch (err) {
        profile.error = err;
        throw 'Error while calling getMyProfile: ' + err;
    }
    return profile;
};