const fetch = require('isomorphic-fetch');
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
    const res = await fetch(endpoints.deleteWiki(com, uid), {
        method: 'DELETE',
        headers: {
            NDCAUTH: `sid=${sid}`
        }
    }).then(function(response) {
        if(response.status >= 400) {
            throw new Error(`Amino appears to be offline. Response status = ${response.status}`);
        } else {
            return true;
        }
    }).catch(function(ex) {
        throw new Error(`An error ocurred: ${ex}`);
    });
    return res;
};