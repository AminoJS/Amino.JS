const fetch = require('isomorphic-fetch'); //The Request Module for sending the different Modules
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const { getConfig } = require('../index');

/**
 * @typedef logsResponse
 * @property {Object[]} logs
 * @property {number} logs[].logId The ID of the log
 * @property {string} logs[].objectUrl The Object URL for this log
 * @property {string} logs[].operationName The operation name(Operation code)
 * @property {number} logs[].operation
 * @property {any} logs[].moderationLevel
 * @property {string} logs[].operationLevel
 * @property {string} logs[].objectId
 * 
 * @property {object} logs[].author
 * @property {number} logs[].author.status
 * @property {number} logs[].author.role
 * @property {string} logs[].author.nickname The author's nickname
 * @property {string} logs[].author.uid The author's UID
 * @property {string} logs[].author.icon The author's profile picture
 * 
 * @property {object} logs[].extData
 * @property {object} logs[].extData.value
 * @property {string} logs[].extData.value.path
 * @property {boolean} logs[].extData.value.value
 * @property {number} logs[].extData.value.timestamp
 * 
 * @property {any} logs[].operationDetail
 * @property {number} logs[].ndcId
 * @property {Date} logs[].createdTime
 * @property {number} logs[].objectType
 */
 
/**
 * Loads a list of previous actions done by the admins
 * @param {string} com A ID that can be obtained by the function getJoinedComs
 * @param {number} [start=0] start A starting number of the log
 * @param {number} [size=10] size The size of the actual logs array
 * @returns {logsResponse} Array of all the actions performed by the admins
 */ 
 
async function getAdminLogs(com, start = 0, size = 10) {
    let adminLogs = objs.adminLogs;
    adminLogs.logs = [];
    const sid = getConfig('sid');
    if (typeof sid != 'string' || typeof com !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try {
        const response = await fetch(endpoints.adminLogList(com, start, size), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        //Parsing the Response.
        const body = await response.json();
        if (body.adminLogList.length === 0) adminLogs.logs = null;
        adminLogs.logs = body.adminLogList;
        adminLogs.status = 'ok';
        adminLogs.error = null;
    }
    catch (err) {
        adminLogs.error = err;
        throw 'Error while calling getAdminLogs: ' + err;
    }
    return adminLogs;
}

module.exports = getAdminLogs;