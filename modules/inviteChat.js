const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const { getConfig } = require('../index');

/**
 * Function to invite someone to a chat
 * The user argument can be a array of strings
 * To invite someone, the person must be following you
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the Function getJoinedComs
 * @param {ChatUUID} uid The Chats ID that can be obtained by the function getJoinedChats
 * @param {UserUUID} user The user who will we added
 * @returns {Object} A Custom Object where the Message, the MessageID, and a Boolean 
 */

module.exports = async function inviteChat(com, uid, users) {
    const sid = getConfig('sid');
    if (typeof sid != 'string' || typeof com !== 'string' || typeof uid !== 'string' || ((typeof users !== 'string') && (typeof users !== 'object'))) {
        throw new Error('All Arguments are not satisfied.');
    }
    if(typeof users === 'string') {
        users = [users];
    }
    const body = await fetch(endpoints.inviteChat(com, uid), {
        method: 'POST',
        headers: {
            'NDCAUTH': `sid=${sid}`
        },
        body: JSON.stringify({
            'uids': users,
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
    return body;
};