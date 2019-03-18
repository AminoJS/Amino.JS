const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
var fs = require('fs'); // For reading the image file
const { getConfig } = require('../index');

/**
 * Function to send a Image to a Chat.
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the Function getJoinedComs
 * @param {ChatUUID} uid The Chats ID that can be obtained by the function getJoinedChats
 * @param {String} ImagePath The path to the image file who will be sent.
 * @returns {Object} A Custom Object where the Message, the MessageID, and a Boolean 
 */

module.exports = async function sendImage(com, uid, ImagePath) {
    let message = null;
    const sid = getConfig('sid');
    if (typeof sid != 'string' || typeof com !== 'string' || typeof uid !== 'string' || typeof ImagePath !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        var imageRaw = fs.readFileSync(ImagePath);
        var imageBase64 = imageRaw.toString('base64');
        const body = await fetch(endpoints.sendChat(com, uid), {
            method: 'POST',
            headers: {
                'NDCAUTH': `sid=${sid}`
            },
            body: JSON.stringify({
                'content': null,
                'type': 0,
                'clientRefId': 43196704,
                'timestamp': new Date().getUTCMilliseconds(),
                'mediaType': 100,
                'mediaUploadValue': imageBase64,
                'attachedObject': null
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
        throw 'Error while calling sendImage: ' + err;
    }
    return message;
};