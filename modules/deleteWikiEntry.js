const request = require('request-promise');
const endpoints = require('../helpers/endpoints');
const {
    getConfig
} = require('../index');

module.exports = async function deleteWikiEntry(com, uid) {
    let sid = getConfig('sid');
    let complete = false;
    request.delete(endpoints.deleteWiki(com, uid), {
        headers: {
            NDCAUTH: `sid=${sid}`
        }
    }, (err, res) => {
        if (err) throw new Error('An Error occured!', err);
        if(res.statusCode === 200) {
            complete = true;
            return;
        }
        else complete = false;
    });
    return complete;
};