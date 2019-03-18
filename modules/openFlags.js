//Libary Imports
const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const { getConfig } = require('../index');

/**
 * Loads Open Flags List
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the function getJoinedComs
 * @param {Number} start The start position you want it to use
 * @param {Number} side The amount of entries you want it to use
 * @returns {Object} Object where all the Messages in the requested Chat are contained in an Array.
 */

module.exports = async function openFlags(com, start, size) {
    const sid = getConfig('sid');
    if (typeof sid != 'string' || typeof com !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    //Silent fallback if a Size or a Start is not present.
    if (start == undefined || start == null) {
        start = 1;
    }
    if (size == undefined || size == null) {
        size = 1;
    }
    const body = await fetch(endpoints.openFlags(com, start, size), {
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
    return body;
};