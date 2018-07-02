const fetch = require('isomorphic-fetch'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const {
    getConfig
} = require('../index');

module.exports = async function checkIn(com) {
    let sid = getConfig('sid');
    try {
        const response = await fetch(endpoints.checkIn(com), {
            method: 'POST',
            headers: {
                'NDCAUTH': `sid=${sid}`
            },
            body: JSON.stringify({
                'timezone': new Date().getTimezoneOffset(),
                'timestamp': Date.now()
            })
        });
        const body = await response.json();
        console.log(body['api:statuscode']);
        if(body['api:statuscode'] == '2601') {
            return {
                "checkIn": {
                    "status": false,
                    "message": "already CheckedIn!"
                },
                "status": "fail",
                "error": null
            }
        }
        else return {
            "checkIn": {
                "status": true,
                "canPlayLottery": body.canPlayLottery,
                "streaks": body.consecutiveCheckInDays,
                "epEarn": body.earnedReputationPoint
            },
            "status": "ok",
            "error": null
        }
    } catch (err) {
        return {
            "checkIn": {
                "status": false,
                "canPlayLottery": null,
                "streaks": null,
                "epEarn": null
            },
            "status": "fail",
            "error": err
        }
    }
};