//Libary Imports
const request = require('request-promise');
const endpoints = require('./endpoints.js');
const sorter = require('./sorter.js');
const objs = require('./objects.js');

/**
 * Loginfunction for the Framework for Handeling API Reqeusts.
 * @param  {String} email    Email-Adresse für den Login
 * @param  {String} password Passwort für den Login
 * @param  {UUID} deviceID Siehe mehr unter ('howto/deviceid_dump.md')
 * @returns {SecurityString} sid Der Security String um mit der API zu komunizieren.
 */
async function login(email, password, deviceID) {
    let sid;
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
 * 
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @returns {JSON} JSON Object containing all Joined Coms with the Logged in Account.
 */
async function getJoinedComs(sid) {
    let communityList = objs.communityList;
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
 * 
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com 
 */
async function getJoinedChats(sid, com) {
    let threadList = objs.threadList;
    await request.get(endpoints.getJoinedChats(com), {
        headers: {
            'NDCAUTH': `sid=${sid}`
        }
    }, (err, res, body) => {
        try {
            body = JSON.parse(body);
            body.threadList.forEach((element) => {
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

module.exports = {
    login,
    getJoinedComs,
    getJoinedChats,
    getChat: async function (sid, com, uid, count) {
        let msgList = objs.recivedMessages;
        try {
            await request.get(endpoints.loadChat(com, uid, count), {
                headers: {
                    'NDCAUTH': `sid=${sid}`
                }
            }, (err, res, body) => {
                body = JSON.parse(body);
                body.messageList.forEach((element) => {
                    //TODO: Do a Sorting for this System.
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
    },

    sendChat: async function (sid, com, uid, msg) {
        let message = objs.sendingMessage;
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
};