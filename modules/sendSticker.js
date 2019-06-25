const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const { getConfig } = require('../index');

/**
 * Function to send a Sticker to a Chat.
 * Note that a Sticker ID List still don't exists on this module. This is being planned to a future release
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the Function getJoinedComs
 * @param {ChatUUID} uid The Chats ID that can be obtained by the function getJoinedChats
 * @param {String} stickerID The sticker who will be sent.
 * @returns {Object} A Custom Object where the Message, the MessageID, and a Boolean 
 */

module.exports = async function sendSticker(com, uid, stickerID) {
    let message = null;
    const sid = getConfig('sid');
    if (typeof sid != 'string' || typeof com !== 'string' || typeof uid !== 'string' || typeof stickerID !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        const body = await fetch(endpoints.sendChat(com, uid), {
            method: 'POST',
            headers: {
                'NDCAUTH': `sid=${sid}`
            },
            body: JSON.stringify({
                'type': 3,
                'clientRefId': 43196704,
                'timestamp': new Date().getUTCMilliseconds(),
                'stickerId': stickerID
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
        message = body;
    } catch (err) {
        message = err;
        throw 'Error while calling sendSticker: ' + err;
    }
    return message;
};