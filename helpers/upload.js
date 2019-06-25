const fetch = require('isomorphic-fetch');
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
    
    const body = await fetch(endpoints.upload, {
        method: 'POST',
        headers: {
            NDCAUTH: `sid=${sid}`
        },
        body: fs.readFileSync(path)
    }).then(function(response) {
        if(response.status >= 400) {
            throw new Error(`Amino appears to be offline. Response status = ${response.status}`);
        } else {
            return response.json();
        }
    }).catch(function(ex) {
        throw new Error(`An error ocurred: ${ex}`);
    });
    mediaValue.value = body.mediaValue;
    return mediaValue;
};
