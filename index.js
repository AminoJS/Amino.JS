/**
 * @module index_KiFrame
 * @author RobStyling
 * @version v.0.1
 * @beta
 */

/** 
 * TODO:
 * Create Throw Error Cases if @param's are Missing. (comming in v.0.1)
 * Get User Infos (comming in v.0.2)
 * Comment on a User Profile (comming in v.0.2)
 * Create a Wiki Entry / Blog Post (comming in v.0.2)
 * Comment a Wiki Entry / Blog Post (comming in v.0.2)
 * Delete a Wiki Entry / Blog Post (comming in v.0.2)
 */


//Libary Imports
const request = require('request-promise'); //The Request Module for sending the different Modules
const endpoints = require('./endpoints.js'); //For Creating shorter URL's in this Module
const sorter = require('./sorter.js'); //For easier Sorting of various Responses.
const objs = require('./objects.js'); //For Storing the Objects that the Framework returns. 

/**
 * Loginfunction for the Framework for Handeling API Reqeusts.
 * @param  {String} email Email-Adress for logging in.
 * @param  {String} password Password for logging in.
 * @param  {UUID} deviceID Siehe mehr unter ('Wiki/Device ID Dump').
 * @returns {SecurityString} The Securitystring for authenticating with Amino. (required by all other functions).
 */
async function login(email, password, deviceID) {
    let sid;
    if(typeof email != 'string' || typeof password !== 'string' || typeof deviceID !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    await request.post(endpoints.login, {
        json: {
            'email': email,
            'secret': '0 ' + password,
            'deviceID': deviceID,
            'clientType': 100,
            'action': 'normal',
            'timestamp': new Date().getUTCMilliseconds()
        }
    }, (err, res, body) => {
        if (err) throw 'Request Error: ' + err;
        if (!body.sid) throw 'Login Error: SID is not defined.' + res;
        sid = body.sid;
    }).catch((err) => {
        throw 'Error while calling Login: ' + err;
    });
    return sid;
}

/**
 * Gets a JSON-Object were all Community ID's, Name's and URL's for the current Logged-In Account are obainted in. 
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @returns {Object} Object containing all Joined Coms with the Logged in Account.
 */
async function getJoinedComs(sid) {
    let communityList = objs.communityList;
    if(typeof sid != 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    await request.get(endpoints.getComs, {
        headers: {
            'NDCAUTH': `sid=${sid}`
        }
    }, (err, res, body) => {
        try {
            if (err) throw 'Request Error: ' + err;
            body = JSON.parse(body);
            body.communityList.forEach((element) => {
                communityList.coms.push(sorter.comSort(element));
            });
            communityList.status = 'ok';
            communityList.error = null;
        } catch (err) {
            communityList.error = err;
        }
    });
    return communityList;
}

/**
 * Loads all Kind of Chat Infomations that the Person itself joined.
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com A ID that can be obtained by the function getJoinedComs
 * @returns {Object} Object where all the Chats that the Logged-in User has joined are contained in an Array.
 */
async function getJoinedChats(sid, com) {
    let threadList = objs.threadList;
    if(typeof sid != 'string' || typeof com !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    await request.get(endpoints.getJoinedChats(com), {
        headers: {
            'NDCAUTH': `sid=${sid}`
        }
    }, (err, res, body) => {
        try {
            body = JSON.parse(body);
            body.threadList.forEach((element) => {
                //TODO: Move all of that into the Sorter Function (planed for v.0.1)
                let publicChat = sorter.publicChat(element.type);
                let group = sorter.groupChat(element.type);
                let joined = sorter.didJoin(element.membershipStatus);
                let muted = sorter.didMute(element.alertOption);
                let unread = sorter.didUnread(element.condition);
                threadList.threads.push(sorter.threadSort(element, joined, publicChat, group, muted, unread));
            });
            threadList.status = 'ok';
            threadList.error = null;
        } catch (err) {
            threadList.error = err;
        }
    });
    return threadList;
}

/**
 * Loads Messages in a specific Chat.
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the function getJoinedComs
 * @param {ChatUUID} uid The Chats ID that can be obtained by the function getJoinedChats
 * @param {Number} count The ammount of Messages to Load (defaults to 1);
 * @returns {Object} Object where all the Messages in the requested Chat are contained in an Array.
 */
async function getChat(sid, com, uid, count) {
    let msgList = objs.recivedMessages;
    if(typeof sid != 'string' || typeof com !== 'string' || typeof uid !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    if(count == undefined || count == null) {
        count = 1;
    }
    try {
        await request.get(endpoints.loadChat(com, uid, count), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        }, (err, res, body) => {
            body = JSON.parse(body);
            body.messageList.forEach((element) => {
                //TODO: Do a Sorting for this System. (planed for v.0.1)
                msgList.messages.push({
                    'threadId': uid,
                    'messageId': element.messageId,
                    'msg': element.content,
                    'type': element.type,
                    'author': {
                        'uid': element.author.uid,
                        'name': element.author.name,
                        'level': element.author.level,
                        'role': element.author.role
                    }
                });
            });
        });
        msgList.status = 'ok';
        msgList.error = null;
    } catch (err) {
        msgList.error = err;
    }
    return msgList;
}

/**
 * Function to send a Mesage into a Chat.
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the Function getJoinedComs
 * @param {ChatUUID} uid The Chats ID that can be obtained by the function getJoinedChats
 * @param {String} msg The Message to be sent.
 * @returns {Object} A Custom Object where the Message, the MessageID, and a Boolean 
 */
async function sendChat(sid, com, uid, msg) {
    let message = objs.sendingMessage;
    if(typeof sid != 'string' || typeof com !== 'string' || typeof uid !== 'string' || typeof msg !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    };
    message.message.message = msg;
    message.message.threadId = uid;
    try {
        await request.post(endpoints.sendChat(com, uid), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            },
            json: {
                'content': msg,
                'type': 0,
                'clientRefId': 43196704,
                'timestamp': new Date().getUTCMilliseconds()
            }
        }, (err, res, body) => {
            if (body.message) {
                message.message.sent = true;
                message.status = 'ok';
                message.error = null;
            }
        });
    } catch (err) {
        message.error = err;
    }
    return message;
}

/**
 * For Exporting Suff
 */
module.exports = {
    login,
    getJoinedComs,
    getJoinedChats,
    getChat,
    sendChat
};