//Libary import
const request = require('request-promise'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
/*
TODO: Create Objects for sent Wiki Entries.
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const sorter = require('../helpers/sorter.js'); //For easier Sorting of various Responses.
*/
const {
    getConfig
} = require('../index');
const getMyProfile = require('./getMyProfile.js');
const upload = require('../helpers/upload');

module.exports = async function createWikiEntry(com, title, content, front_picture_path) {
    let sid = getConfig('sid');
    let profile = await getMyProfile();
    let check = false;
    await request.get(endpoints.checkIfWikiCanPost(com, profile.account.uid), {
        headers: {
            NDCAUTH: `sid=${sid}`
        },
    },
    (err, res) => {
        if(err) throw Error('Error while Checking if System can Create Posts!', err);
        if (res.statusCode === 200) {
            check = true;
        } else check = false;
    }
    );
    if(!check) throw new Error('Client can\'t create Wikis!');
    let front_pic = await upload(front_picture_path);
    if(front_pic.error != null) {
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
    }, (err) => {
        if(err) throw err;
        return;
    });
};