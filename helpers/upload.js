const request = require('request-promise');
const endpoints = require('./endpoints');
const fs = require('fs');
const {
    getConfig
} = require('../index');

module.exports = async function upload(path) {
    let sid = getConfig('sid');
    let mediaValue = {value: null, error: null};
    await fs.createReadStream(path).pipe(request.post(endpoints.upload, {
        headers: {
            'NDCAUTH': `sid=${sid}`
        }
    }, (err, res, body) => {
        if(err) {
            mediaValue.error = err;
            throw new Error('Failed to Upload media', err);
        }
        else {
            body = JSON.parse(body);
            mediaValue.value = body.mediaValue;
        } 
    }));
    return mediaValue;
};