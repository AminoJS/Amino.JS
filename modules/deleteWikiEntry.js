const request = require('request-promise');
const endpoints = require('../helpers/endpoints');
const {
    getConfig
} = require('../index');

/**
 * A Function that deletes Wiki Entries
 * @param {CommunityID} com A ID that can be obtained by the function getJoinedComs
 * @param {WikiID} uid An ID for a Wiki Entry
 * @returns {Boolean} If the Wiki Entry was successfully deleted.
 */
module.exports = async function deleteWikiEntry(com, uid) {
    let sid = getConfig('sid');
    if(typeof sid != 'string') {
        throw new Error('SID is not Defined. Please Login first!');
    }
    if(typeof com != 'string' || typeof uid != 'string') {
        throw new Error('Not all Arguments are given.');
    }
    let complete = false;
    request.delete(endpoints.deleteWiki(com, uid), {
        headers: {
            NDCAUTH: `sid=${sid}`
        }
    }, (err, res) => {
        if (err) throw new Error('An Error occured!', err);
        if (res.statusCode === 200) {
            complete = true;
        } else complete = false;
    });
    return complete;
};