const request = require('request-promise');
const endpoints = require('./endpoints');
const fs = require('fs');
const {
    getConfig
} = require('../index');

/**
 * Uploads an Image / GIF to the Amino Servers.
 * @param {Image} path A Path for uploading a File
 * @returns {String} A AminoURL for posting into Blogs, Wikis, Chats, etc.
 */
module.exports = async function upload(path) {
    let sid = getConfig('sid');
    if(typeof sid != 'string') throw new Error('SID is not defined - Please Login first');
    if(typeof path != 'string') throw new Error('Not all Arguments given.');
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
