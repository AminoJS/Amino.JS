//Libary import
const request = require('request-promise'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const upload = require('../helpers/upload');

const {
    getConfig
} = require('../index');

/**
 * The Ability to Post a Comment!
 * @param {CommunityID} com The Community were the Comment should be placed in
 * @param {WikiID} uid The Wiki Entry to comment on
 * @param {String} content The Comment
 * @param {Image} img_path OPTIONAL: if no img_path is given, it doesnt send an Image
 * @returns {boolean} if the Comment was Posted.
 */
module.exports = async function commentWikiEntry(com, uid, content, img_path) {
    let sid = getConfig('sid');
    let completed = false;

    if(img_path == undefined) {
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
    }

    else {
        let url = await upload(img_path);
        request.post(endpoints.commentWiki(com, uid), {
            headers: {
                NDCAUTH: `sid=${sid}`
            },
            json: {
                'content': content,
                'mediaList': [
                    [
                        100,
                        url.value,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        'amino.jsrocks.png',
                        0
                    ]
                ],
                'eventSource': 'PostDetailView',
                'timestamp': new Date().getUTCMilliseconds
            }
        }, (err, res, body) => {
            if(err) throw new Error('Oops. this should not have happend', err);
            if(body.comment == undefined) throw new Error('Something failed while Creating your Post. API Response:', body);
            else completed = true;
        });
    }

    return completed;
};