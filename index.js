/**
 * @name Kikai Framework
 * @author RobStyling
 * @version 0.0.0
 * @copyright RobStyling 2018
 * @beta
 */

const request = require('request-promise');
const endpoints = require('./endpoints.js');
const sorter = require('./sorter.js');

module.exports = {
    /**
     * Loginfunction for the Framework for Handeling API Reqeusts.
     * @param  {String} email    Email-Adresse für den Login
     * @param  {String} password Passwort für den Login
     * @param  {UUID} deviceID Siehe mehr unter ('howto/deviceid_dump.md')
     * @return {SecurityString} sid      Der Security String um mit der API zu komunizieren.
     */
    login: async function(email, password, deviceID) {
        let sid;
        await request.post(endpoints.login, {
            json: {
                "email": email,
                "secret": "0 " + password,
                "deviceID": deviceID,
                "clientType": 100,
                "action": "normal",
                "timestamp": new Date().getUTCMilliseconds()
            }
        }, (err, res, body) => {
            if (err) throw 'Request Error: ' + err;
            if (!body.sid) throw 'Login Error: SID is not defined.' + res;
            sid = body.sid;
        }).catch((err) => {
            throw 'Error while calling Login: ' + err;
        });
        return sid;
    },

    getJoinedComs: async function(sid) {
        let communityList = {
            coms: [],
            status: "not ok",
            error: "not everything defined"
        };
        await request.get(endpoints.getComs, {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        }, (err, res, body) => {
            try {
                if (err) throw 'Request Error: ' + err;
                body = JSON.parse(body);
                body.communityList.forEach((element) => {
                    communityList.coms.push({
                        'id': 'x' + element.ndcId,
                        'name': element.name,
                        'link': element.link
                    })
                })
                communityList.status = "ok";
                communityList.error = null;
            } catch (err) {
                communityList.status = "not ok";
                communityList.error = err;
            }
        })
        return communityList;
    },


    getJoinedChats: async function(sid, com) {
        let threadList = {
            threads: [],
            status: "not ok",
            error: "not everything defined"
        };
        await request.get(endpoints.getJoinedChats(com), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        }, (err, res, body) => {
            try {
                body = JSON.parse(body);
                body.threadList.forEach((element) => {

                    /**
                     * A Sorting for various Symboles for 
                     * @param  {Integer} element.type For Various Status Symboles
                     * @return {[type]}               For setting the JSON Objects 
                     */
                    public = sorter.publicChat(element.type);
                    group = sorter.groupChat(element.type);
                    joined = sorter.didJoin(element.membershipStatus);
                    muted = sorter.didMute(element.alertOption);
                    unread = sorter.didUnread(element.condition);
                    threadList.threads.push(sorter.threadSort(element, joined, public, group, muted, unread));
                })
                threadList.status = "ok";
                threadList.error = null;
            } catch (err) {
                threadList.status = "not ok";
                threadList.error = err;
                console.log(threadList);
            }
        })
        return threadList;
    },

    getChat: async function(sid, com, uid, count) {
        let thread = {
            messages: [],
            status: 'not ok',
            error: 'nothing happend'
        };
        await request.get(endpoints.loadChat(com, uid, count), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        }, (err, res, body) => {
            body = JSON.parse(body);
            if (err) throw 'Request Error: ' + err;
            console.log(body);
            thread = body;
        });
        return thread;
    },

    sendChat: async function(sid, com, uid, msg) {
        let message = {
            message: {
                sent: false,
                message: msg,
                threadId: uid
            },
            status: 'not ok',
            error: 'Nothing has been done.'
        }
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
            })
        } catch (err) {
            message.error = err;
        }
        return message;
    }
}