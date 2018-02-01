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
                    /**
                     * @todo Make a Handle for Images.
                     */
                    body = JSON.parse(body);
                    body.threadList.forEach((element) => {
                        /**
                         * A Sorting for various Symboles for 
                         * @param  {Integer} element.type For Various Status Symboles
                         * @return {[type]}               For setting the JSON Objects 
                         */
                         public = sorter.publicChat(element.type);
                         group = sorter.groupChat(element.type);
                        if (element.membershipStatus == 1) {
                            joined = true;
                        } else {
                            joined = false;
                        }
                        if (element.alertOption == 1) {
                            muted = true;
                        } else {
                            muted = false;
                        }
                        if(element.condition == 1) {
                            unread = true;
                        }
                        else {
                            unread = false;
                        }
                        console.log(element.type);
                        threadList.threads.push(sorter.threadSort(element, ));
                    })
                    threadList.status = "ok";
                    threadList.error = null;
                    console.log(threadList);
                }
            catch (err) {
                threadList.status = "not ok";
                threadList.error = err;
                throw new Error("The Loading of the Chat did not work." + threadList);
            }
        })},

        getChat: async function(sid, com, uid, count) {
            let thread;
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
        }
}