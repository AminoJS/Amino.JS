/**
 * @module Amino.JS
 * @author RobStyling
 * @version v.0.1
 * @beta
 */

/** 
 * TODO:
 * Get Userinfos from other Users (comming in v.0.2)
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

const config = {};

const errorMessages = {
    missingSid: 'SID is not specified, please use the login() method to authenticate',
}

/**
 * Loginfunction for the Framework for Handeling API Reqeusts.
 * @param  {String} email Email-Adress for logging in.
 * @param  {String} password Password for logging in.
 * @param  {UUID} deviceID Siehe mehr unter ('Wiki/Device ID Dump').
 * @returns {SecurityString} The Securitystring for authenticating with Amino. (required by all other functions).
 */
async function login(email, password, deviceID) {
    let sid;
    if (typeof email != 'string' || typeof password !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }

    if(!deviceID){
        deviceID = '015051B67B8D59D0A86E0F4A78F47367B749357048DD5F23DF275F05016B74605AAB0D7A6127287D9C';
    }

    try{
        const response = await request.post(endpoints.login, {
            json: {
                'email': email,
                'secret': '0 ' + password,
                'deviceID': deviceID,
                'clientType': 100,
                'action': 'normal',
                'timestamp': new Date().getUTCMilliseconds()
            }
        });
        if (!response.sid) throw 'Login Error: SID is not defined.' + res;
        sid = response.sid;
    }
    catch(err){
        throw 'Error while calling Login: ' + err;
    }
    config.sid = sid;
    return sid;
}
/**
 * Load your own User Data.
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @returns {Profile} A Profile containing the Userdata.
 */
async function getMyProfile() {
    let profile = objs.profile;
    let sid;
    if (typeof config.sid != 'string') {
        throw new Error(errorMessages.missingSid);
    }else{
        sid = config.sid;
    }
    try {
        const response = await request.get(endpoints.getMe, {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        const body = JSON.parse(response);
        profile.account.username = body.account.nickname;
        profile.account.icon = body.account.icon;
        profile.account.mediaList = body.account.mediaList;
        profile.account.uid = body.account.uid;
        profile.status = 'ok';
        profile.error = null;
    } catch (ex) {
        throw 'Error while calling getMyProfile: ' + err;
        profile.error = ex;
    }
    return profile;
}

/**
 * Gets a JSON-Object were all Community ID's, Name's and URL's for the current Logged-In Account are obainted in. 
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @returns {Object} Object containing all Joined Coms with the Logged in Account.
 */
async function getJoinedComs() {
    let communityList = objs.communityList;
    let sid;
    if (typeof config.sid != 'string') {
        throw new Error(errorMessages.missingSid);
    }else{
        sid = config.sid;
    }
    try{
        const response = await request.get(endpoints.getComs, {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        const body = JSON.parse(response);
        body.communityList.forEach((element) => {
            communityList.coms.push(sorter.comSort(element));
        });
        communityList.status = 'ok';
        communityList.error = null;
    }
    catch(err){
        throw 'Error while calling getJoinedComs: ' + err;
        communityList.error = err;
    }
    return communityList;
}

/**
 * Loads all Kind of Chat Infomations that the Person itself joined.
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com A ID that can be obtained by the function getJoinedComs
 * @returns {Object} Object where all the Chats that the Logged-in User has joined are contained in an Array.
 */
async function getJoinedChats(com) {
    let threadList = objs.threadList;
    let sid;
    if (typeof config.sid != 'string' || typeof com !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }else{
        sid = config.sid;
    }
    try{
        const response = await request.get(endpoints.getJoinedChats(com), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        //Parsing the Response.
        const body = JSON.parse(response);
        body.threadList.forEach((element) => {
            //Sorting the Elements and pushing them into the Array.
            threadList.threads.push(sorter.threadSort(element));
        });
        threadList.status = 'ok';
        threadList.error = null;
    }
    catch(err){
        throw 'Error while calling getJoinedChats: ' + err;
        threadList.error = err;
    }
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
async function getChat(com, uid, count) {
    let msgList = objs.recivedMessages;
    if (typeof config.sid != 'string' || typeof com !== 'string' || typeof uid !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    //Silent fallback if a Count is not present.
    if (count == undefined || count == null) {
        count = 1;
    }
    try {
        const response = await request.get(endpoints.loadChat(com, uid, count), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        const body = JSON.parse(response);
        body.messageList.forEach((element) => {
            msgList.messages.push(sorter.sendMessageSorter(uid, element));
        });
        msgList.status = 'ok';
        msgList.error = null;
    } catch (err) {
        throw 'Error while calling getChat: ' + err;
        msgList.error = err;
    }
    return msgList;
}

/*
 * Function to send a Mesage into a Chat.
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com The Community ID that can be Obtained by the Function getJoinedComs
 * @param {ChatUUID} uid The Chats ID that can be obtained by the function getJoinedChats
 * @param {String} msg The Message to be sent.
 * @returns {Object} A Custom Object where the Message, the MessageID, and a Boolean 
 */
async function sendChat(com, uid, msg) {
    let message = objs.sendingMessage;
    let sid;
    if (typeof config.sid != 'string' || typeof com !== 'string' || typeof uid !== 'string' || typeof msg !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }else{
        sid = config.sid;
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
        throw 'Error while calling sendChat: ' + err;
        message.error = err;
    }
    return message;
}

/**
 * For exporting the Functions for Usage in the Client.
 */
module.exports = {
    login,
    getMyProfile,
    getJoinedComs,
    getJoinedChats,
    getChat,
    sendChat
};