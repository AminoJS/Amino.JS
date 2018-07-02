const fetch = require('isomorphic-fetch'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const {
    getConfig
} = require('../index');

module.exports = async function checkIn(com) {
    let sid = getConfig('sid');
    console.log(new Date().getUTCMilliseconds());
    const response = await fetch(endpoints.checkIn(com), {
        method: 'POST',
        headers: {
            'NDCAUTH': `sid=${sid}`
        },
        body: {
            'timezone': '60',
            'timestamp': new Date().getUTCMilliseconds()
        }
    });
    const body = await response.json();
    console.log(body);
};