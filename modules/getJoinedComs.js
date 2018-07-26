const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const sorter = require('../helpers/sorter.js'); //For easier Sorting of various Responses.
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const { getConfig, errorMessages } = require('../index');

/**
 * Gets a JSON-Object were all Community ID's, Name's and URL's for the current Logged-In Account are obainted in. 
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @returns {Object} Object containing all Joined Coms with the Logged in Account.
 */

module.exports = async function getJoinedComs() {
    let communityList = objs.communityList;
    communityList.coms = [];
    const sid = getConfig('sid');
    if (typeof sid != 'string') {
        throw new Error(errorMessages.missingSid);
    }
    try {
        const response = await fetch(endpoints.getComs, {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        const body = await response.json();
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