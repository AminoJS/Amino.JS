const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const { getConfig } = require('../index');

/**
 * Loads Favorite Members
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {String} coms A list of communities to get the check-in status, separated by "&"
 * @param {String} timezone The desired timezone to check(It will affect the user Check-In Functionality)
 * @returns {Object} Object with all the Check In info of the communities specified from the Logged-in User has in an Array.
 */

module.exports = async function getCheckInCommunities(coms, timezone) {
    let checkComs = objs.checkInComs;
    checkComs.coms = [];
    const sid = getConfig('sid');
    if (typeof sid != 'string' || typeof coms !== 'string' || typeof timezone !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try{
        const response = await fetch(endpoints.getCheckInReminder(coms, timezone), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        //Parsing the Response.
        const body = await response.json();
        checkComs.coms = body.reminderCheckResultInCommunities;
        checkComs.status = 'ok';
        checkComs.error = null;
    }
    catch(err){
        checkComs.error = err;
        throw 'Error while calling getCheckInCommunities: ' + err;
    }
    return checkComs;
};