//Libary Imports
const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const { setConfig } = require('../index');

/**
* Login function for the Framework for Handeling API Reqeusts.
* @param  {String} email Email-Adress for logging in.
* @param  {String} password Password for logging in.
* @param  {UUID} deviceID Siehe mehr unter ('Wiki/Device ID Dump').
* @returns {SecurityString} The Securitystring for authenticating with Amino. (required by all other functions).
*/

module.exports = async function login(email, password, deviceID) {
    let sid;
    let profileid;
    if (typeof email != 'string' || typeof password !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }

    if (!deviceID) {
        deviceID = '015051B67B8D59D0A86E0F4A78F47367B749357048DD5F23DF275F05016B74605AAB0D7A6127287D9C';
    }

    const body = await fetch(endpoints.login, {
        method: 'POST',
        body: JSON.stringify({
            'email': email,
            'secret': '0 ' + password,
            'deviceID': deviceID,
            'clientType': 100,
            'action': 'normal',
            'timestamp': new Date().getUTCMilliseconds()
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
    if (!body.sid) throw 'Login Error: SID is not defined.' + body;
    if(!body.account.uid) throw 'Login Error: ProfileID is not defined.' + body;
    sid = body.sid;
    profileid = body.account.uid;
    setConfig('sid', sid);
    setConfig('profileId', profileid);
    return sid;
};