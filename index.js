/**
 * @name Kikai Framework
 * @author RobStyling
 * @version 0.0.0
 * @copyright RobStyling 2018
 */

const request = require('request-promise');
const endpoints = require('./endpoints.js');

module.exports = {
	login: async function(email, password, deviceID) {
		let sid = await request.post(endpoints.login, {
			json: {
				'email': email,
				'password': '0 ' + password,
				'deviceID': deviceID,
				'clientType': 100,
				'action': 'normal',
				'timestamp': new Date().getUTCMilliseconds()
			}, function(err, res, body) {
				if(err) throw 'Framework Error: ' + err;
				return body.sid;
			}
		});
		return sid;
	}
}