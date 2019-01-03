//Libary Imports
const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const sorter = require('../helpers/sorter.js'); //For easier Sorting of various Responses.
const { getConfig } = require('../index');

/**
 * Loads Messages in a specific Chat.
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the function getJoinedComs
 * @param {ChatUUID} uid The Chats ID that can be obtained by the function getJoinedChats
 * @param {Number} count The ammount of Messages to Load (defaults to 1);
 * @returns {Object} Object where all the Messages in the requested Chat are contained in an Array.
 */

module.exports = async function getChat(com, uid, count) {
    let msgList = objs.recivedMessages;
    msgList.messages = [];
    const sid = getConfig('sid');
    if (typeof sid != 'string' || typeof com !== 'string' || typeof uid !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    //Silent fallback if a Count is not present.
    if (count == undefined || count == null) {
        count = 1;
    }
    try {
        const response = await fetch(endpoints.loadChat(com, uid, count), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        const body = await response.json();
        body.messageList.forEach((element) => {
            msgList.messages.push(sorter.sendMessageSorter(uid, element));
        });
        msgList.status = 'ok';
        msgList.error = null;
    } catch (err) {
        msgList.error = err;
        throw 'Error while calling getChat: ' + err;
    }
    return msgList;
};