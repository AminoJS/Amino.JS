/**
 * @name Kikai Framework
 * @author RobStyling
 * @version 0.0.0
 * @copyright RobStyling 2018
 */

const request = require('request-promise');
const endpoints = require('./endpoints.js');

console.log(endpoints.loadChat("comid", "dfd", 3))

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
        }, async function(err, res, body) {
            if (err) throw 'Request Error: ' + err;
            if (!body.sid) throw 'Login Error: SID is not defined.' + res;
            sid = body.sid;
        }).catch((err) => {
            throw 'Error while calling Login: ' + err;
        });
        return sid;
    },

    getChat: async function(sid, com, uid, count) {
        let thread;
        await request.get(endpoints.loadChat(com, uid, count), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        }, function(err, res, body) {
        	body = JSON.parse(body);
            if (err) throw 'Request Error: ' + err;
            	console.log(body);
            thread = body;
        })
    }
}

process.on('unhandledRejection', function(err) {
    throw 'A Undhandeld unhandledRejection was Found: ' + err;
})