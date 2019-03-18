const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const { getConfig } = require('../index');

/**
 * Function to remove someone from a chat
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the Function getJoinedComs
 * @param {ChatUUID} uid The Chats ID that can be obtained by the function getJoinedChats
 * @param {UserUUID} user The user who will we removed
 * @param {Boolean} canRejoin If the user can rejoin or no(optional)
 * @returns {Object} A Custom Object where the Message, the MessageID, and a Boolean 
 */

module.exports = async function inviteChat(com, uid, user, canRejoin) {
    const sid = getConfig('sid');
    if (typeof sid != 'string' || typeof com !== 'string' || typeof uid !== 'string' || typeof user !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    
    if(typeof canRejoin != 'boolean') {
        canRejoin = 1;
    }
    const body = await fetch(endpoints.removeChat(com, uid, user, (canRejoin == true ? 1 : 0)), {
        method: 'DELETE',
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