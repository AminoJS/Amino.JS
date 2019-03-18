const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const { getConfig } = require('../index');

/**
 * Loads Communities Check-In Status
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
    const body = await fetch(endpoints.getCheckInReminder(coms, timezone), {
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
    checkComs.coms = body.reminderCheckResultInCommunities;
    checkComs.status = 'ok';
    checkComs.error = null;
    return checkComs;
};