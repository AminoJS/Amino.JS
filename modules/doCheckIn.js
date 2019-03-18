const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const objects = require('../helpers/objects');
const { getConfig } = require('../index');

/**
 * Loads Favorite Members
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {String} coms A list of communities to get the check-in status, separated by "&"
 * @param {String} timezone The desired timezone to check(It will affect the user Check-In Functionality)
 * @returns {Object} Object with all the Check In info of the communities specified from the Logged-in User has in an Array.
 */

module.exports = async function doCheckIn(com, timezone) {
    let checkInData = objects.checkInData;
    const sid = getConfig('sid');
    if (typeof sid != 'string' || typeof com !== 'string' || typeof timezone !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    const body = await fetch(endpoints.doCheckIn(com), {
        headers: {
            'NDCAUTH': `sid=${sid}`,
            'NDC-MSG-SIG': 'AcYt8HVzM3r6BgVIRJC+Cb4bm35F'
        },
        body: JSON.stringify({
            'timezone': timezone,
            'timestamp': new Date().getUTCMilliseconds(),
        }),
    }).then(function(response) {
        if(response.status >= 400) {
            throw new Error(`Amino appears to be offline. Response status = ${response.status}`);
        } else {
            return response.json();
        }
    }).catch(function(ex) {
        throw new Error(`An error ocurred: ${ex}`);
    });
    checkInData.data = body;
    checkInData.status = 'ok';
    checkInData.error = null;
    return checkInData;
};