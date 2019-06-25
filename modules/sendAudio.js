const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
var fs = require('fs'); // For reading the audio file
const { getConfig } = require('../index');

/**
 * Function to send a Audio to a Chat.
 * In order to work properly, the audio must be a m4a format, and use the Apple Lossless Audio Codec(alac codec)
 * The audio can't have more than 120 seconds(2 minutes) of duration.
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the Function getJoinedComs
 * @param {ChatUUID} uid The Chats ID that can be obtained by the function getJoinedChats
 * @param {String} audioPath The path to the audio file who will be sent.
 * @returns {Object} A Custom Object where the Message, the MessageID, and a Boolean 
 */

module.exports = async function sendAudio(com, uid, audioPath) {
    const sid = getConfig('sid');
    if (typeof sid != 'string' || typeof com !== 'string' || typeof uid !== 'string' || typeof audioPath !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    var audioRaw = fs.readFileSync(audioPath);
    var audioBase64 = audioRaw.toString('base64');
    const body = await fetch(endpoints.sendChat(com, uid), {
        method: 'POST',
        headers: {
            'NDCAUTH': `sid=${sid}`
        },
        body: JSON.stringify({
            'content': null,
            'type': 2,
            'clientRefId': 43196704,
            'timestamp': new Date().getUTCMilliseconds(),
            'mediaType': 110,
            'mediaUploadValue': audioBase64,
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
    return body;
};