const request = require('request-promise'); //The Request Module for sending the different Modules
const endpoints = require('../endpoints.js'); //For Creating shorter URL's in this Module
const sorter = require('../sorter.js'); //For easier Sorting of various Responses.
const objs = require('../objects.js'); //For Storing the Objects that the Framework returns. 
const { getConfig, errorMessages } = require('../index');

/**
 * Gets a JSON-Object were all Community ID's, Name's and URL's for the current Logged-In Account are obainted in. 
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @returns {Object} Object containing all Joined Coms with the Logged in Account.
 */

module.exports = async function getJoinedComs() {
    let communityList = objs.communityList;
    const sid = getConfig('sid');
    if (typeof sid != 'string') {
        throw new Error(errorMessages.missingSid);
    }
    try {
        const response = await request.get(endpoints.getComs, {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        const body = JSON.parse(response);
        body.communityList.forEach((element) => {
            communityList.coms.push(sorter.comSort(element));
        });
        communityList.status = 'ok';
        communityList.error = null;
    }
    catch (err) {
        communityList.error = err;
        throw 'Error while calling getJoinedComs: ' + err;
    }
    return communityList;
};