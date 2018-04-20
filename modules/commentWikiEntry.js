//Libary import
const request = require('request-promise'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module

const {
    getConfig
} = require('../index');

module.exports = async function createWikiEntry(com, uid, content) {
    let sid = getConfig('sid');
    let completed = false;

    request.post(endpoints.commentWiki(com, uid), {
        headers: {
            NDCAUTH: `sid=${sid}`
        },
        json: {
            'content': content,
            'mediaList': [],
            'eventSource': 'PostDetailView',
            'timestamp': new Date().getUTCMilliseconds
        }
    }, (err, res, body) => {
        if(err) throw new Error('Oops. this should not have happend', err);

        if(body.comment == undefined) throw new Error('Something failed while Creating your Post');
        else completed = true;
    });
    return completed;
};