//Libary import
const request = require('request-promise'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const sorter = require('../helpers/sorter.js'); //For easier Sorting of various Responses.
const {
    getConfig
} = require('../index');
const upload = require('../helpers/upload');

/**
 * Creating a Wiki Entry.
 * @param {CommunityID} com A ID that can be obtained by the function getJoinedComs
 * @param {String} title The Title of the Wiki.
 * @param {String} content The Content of the Wiki Entry.
 * @param {Image} front_picture_path The Path to an Image File **REQUIRED**
 */
module.exports = async function createWikiEntry(com, title, content, front_picture_path) {
    let sid = getConfig('sid');
    let id = getConfig('profileId');
    if (typeof sid != 'string') throw new Error('SID is not Defined - Please Login first');
    if (typeof id != 'string') throw new Error('The ProfileID is not defined. But since SID is there needs to be a major Error. Please Submit an Issue!');
    if (typeof com != 'string' || typeof title != 'string' || typeof content != 'string' || typeof front_picture_path != 'string') throw new Error('Not all Arguments are given');
    let check = false;
    let item = objs.wiki;
    await request.get(endpoints.checkIfWikiCanPost(com, id), {
        headers: {
            NDCAUTH: `sid=${sid}`
        },
    },
    (err, res) => {
        if (err) throw Error('Error while Checking if System can Create Posts!', err);
        if (res.statusCode === 200) {
            check = true;
        } else check = false;
    }
    );
    if (!check) throw new Error('Client can\'t create Wikis!');
    let front_pic = await upload(front_picture_path);
    if (front_pic.error != null) {
        throw new Error('This should not have happend! font_pic has error atrubitute in upload()');
    }
    await request.post(endpoints.createWiki(com), {
        headers: {
            NDCAUTH: `sid=${sid}`
        },
        json: {
            'extentions': {
                'props': []
            },
            'content': content,
            'icon': front_pic.value,
            'keywords': '',
            'label': title,
            'latitude': 0,
            'longitude': 0,
            'mediaList': [
                [
                    '100',
                    front_pic.value,
                    null
                ]
            ],
            'eventSource': 'GlobalComposeMenu',
            'timestamp': new Date().getUTCMilliseconds()
        }
    }, (err, res, body) => {
        if (err) {
            item.error = err;
            throw new Error('Something veery wrong did happen!' + err);
        }
        item = sorter.sortWiki(item, body.item);
        item.error = null;
    });
    return item;
};