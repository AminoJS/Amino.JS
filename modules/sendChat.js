const request = require('request-promise'); //The Request Module for sending the different Modules
const endpoints = require('../endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../objects.js'); //For Storing the Objects that the Framework returns. 
const { getConfig } = require('../index');

/*
 * Function to send a Mesage into a Chat.
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the Function getJoinedComs
 * @param {ChatUUID} uid The Chats ID that can be obtained by the function getJoinedChats
 * @param {String} msg The Message to be sent.
 * @returns {Object} A Custom Object where the Message, the MessageID, and a Boolean 
 */

module.exports = async function sendChat(com, uid, msg) {
    let message = objs.sendingMessage;
    const sid = getConfig('sid');
    if (typeof sid != 'string' || typeof com !== 'string' || typeof uid !== 'string' || typeof msg !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    message.message.message = msg;
    message.message.threadId = uid;
    try {
        const response = await request.post(endpoints.sendChat(com, uid), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            },
            json: {
                'content': msg,
                'type': 0,
                'clientRefId': 43196704,
                'timestamp': new Date().getUTCMilliseconds()
            }
        });
        if (response.message) {
            message.message.sent = true;
            message.status = 'ok';
            message.error = null;
        }
    } catch (err) {
        message.error = err;
        throw 'Error while calling sendChat: ' + err;
    }
    return message;
};